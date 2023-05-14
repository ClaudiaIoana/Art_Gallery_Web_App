from django.db.models import Avg, F, Count
from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema
from rest_framework import generics, status, views
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Art, Author, Location, Gallery, GalleryAuthor
from .serializers import ArtSerializerList, ArtSerializer, AuthorSerializer, LocationSerializer, GallerySerializer, \
    AuthorSerializerList, GallerySerializerList, LocationSerializerList
from .serializers import GalleryAuthorSerializer, GalleryAuthorSerializerList, AuthorGalleryPeriodReport, \
    GalleryNbAuthors, GalleryForAuthorSerializerList
from .serializers import ArtForAuthorSerializer
from django.db.models import Q
from django.core.paginator import Paginator




class GalleryAuthorList(generics.ListCreateAPIView):
    serializer_class = GalleryAuthorSerializer

    def get_queryset(self):
        queryset = GalleryAuthor.objects.all()

        page_number = self.request.query_params.get('page')

        if page_number:
            paginator = Paginator(queryset, 100)
            page_obj = paginator.get_page(page_number)
            queryset = page_obj.object_list

        return queryset


class GalleryAuthorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = GalleryAuthor.objects.all()
    serializer_class = GalleryAuthorSerializerList


class ArtList(generics.ListCreateAPIView):
    serializer_class = ArtSerializerList

    def get_queryset(self):
        queryset = Art.objects.all()

        page_number = self.request.query_params.get('page')

        title = self.request.query_params.get('title')

        if title:
            queryset = Location.objects.filter(title__icontains=title)

        if page_number:
            paginator = Paginator(queryset, 100)
            page_obj = paginator.get_page(page_number)
            queryset = page_obj.object_list

        return queryset


class ArtDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Art.objects.all()
    serializer_class = ArtSerializer


class AuthorList(generics.ListCreateAPIView):
    serializer_class = AuthorSerializerList

    def get_queryset(self):
        queryset = Author.objects.all()

        page_number = self.request.query_params.get('page')

        name = self.request.query_params.get('name')

        if name:
            queryset = Location.objects.filter(name__icontains=name)

        if page_number:
            paginator = Paginator(queryset, 100)
            page_obj = paginator.get_page(page_number)
            queryset = page_obj.object_list

        return queryset


class ArtForAuthor(views.APIView):
    def post(self, request, pk):
        serializer = ArtForAuthorSerializer(data=request.data, many=True)
        author = get_object_or_404(Author, id=pk)
        serializer.context['author'] = author
        if serializer.is_valid():
            serializer.save(author=author, using='')
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_204_NO_CONTENT)


class AuthorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer


class GalleryList(generics.ListCreateAPIView):
    serializer_class = GallerySerializerList

    def get_queryset(self):
        queryset = Gallery.objects.all()

        page_number = self.request.query_params.get('page')

        name = self.request.query_params.get('name')

        if name:
            queryset = Location.objects.filter(name__icontains=name)

        if page_number:
            paginator = Paginator(queryset, 100)
            page_obj = paginator.get_page(page_number)
            queryset = page_obj.object_list

        return queryset


class GalleryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer


class LocationList(generics.ListCreateAPIView):
    serializer_class = LocationSerializerList

    def get_queryset(self):
        queryset = Location.objects.all()

        page_number = self.request.query_params.get('page')

        country = self.request.query_params.get('country')

        if country:
            queryset = Location.objects.filter(country__icontains=country)

        if page_number:
            paginator = Paginator(queryset, 100)
            page_obj = paginator.get_page(page_number)
            queryset = page_obj.object_list

        return queryset


class LocationDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


class AuthorWithPeriod(generics.ListAPIView):
    serializer_class = AuthorGalleryPeriodReport

    def get_queryset(self):
        queryset = Author.objects \
            .annotate(showing=Avg('authors__nb_participants')) \
            .order_by(F('showing').desc(nulls_last=True))
        return queryset


class GalleryByAuthor(generics.ListAPIView):
    serializer_class = GalleryNbAuthors

    def get_queryset(self):
        queryset = Gallery.objects \
            .annotate(nb_authors=Count('galleries__author')) \
            .order_by(F('nb_authors').desc(nulls_last=True))
        return queryset


class AuthorFromGalleryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = GalleryAuthor.objects.all()
    serializer_class = GalleryForAuthorSerializerList


class LocationViewForAutocomplete(APIView):
    @extend_schema(request=None, responses=LocationSerializer)
    def get(self, request):
        query = request.query_params.get('query', None)
        if query:
            locations = Location.objects.filter(Q(city__icontains=query) | Q(country__icontains=query) | Q(
                city__icontains=query.split()[0], country__icontains=query.split()[-1]) | Q(
                city__icontains=query.split()[-1], country__icontains=query.split()[0]))[:10]
        else:
            locations = Location.objects.all()[:10]

        serialized_locations = LocationSerializer(locations, many=True)
        return Response(serialized_locations.data)


class GalleryViewForAutocomplete(APIView):
    @extend_schema(request=None, responses=GallerySerializer)
    def get(self, request):
        query = request.query_params.get('query', None)
        if query:
            locations = Gallery.objects.filter(Q(name__icontains=query) | Q(theme__icontains=query) | Q(
                name__icontains=query.split()[0], theme__icontains=query.split()[-1]) | Q(
                name__icontains=query.split()[-1], theme__icontains=query.split()[0]))[:10]
        else:
            locations = Gallery.objects.all()[:10]

        serialized_locations = GallerySerializer(locations, many=True)
        return Response(serialized_locations.data)


class AuthorViewForAutocomplete(APIView):
    @extend_schema(request=None, responses=AuthorSerializer)
    def get(self, request):
        query = request.query_params.get('query', None)
        if query:
            locations = Author.objects.filter(Q(name__icontains=query) | Q(date_birth__icontains=query) | Q(
                name__icontains=query.split()[0], date_birth__icontains=query.split()[-1]) | Q(
                name__icontains=query.split()[-1], date_birth__icontains=query.split()[0]))[:10]
        else:
            locations = Author.objects.all()[:10]

        serialized_locations = AuthorSerializer(locations, many=True)
        return Response(serialized_locations.data)