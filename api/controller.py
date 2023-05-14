#TODO: create a controller
from rest_framework import generics
from .models import Art, Location
from .serializers import ArtSerializer, LocationSerializer



class ArtbyYear(generics.ListCreateAPIView):
    serializer_class = ArtSerializer

    def get_queryset(self):
        queryset = Art.objects.all()
        var = self.request.GET.get('var', 1885)
        if var is not None:
            queryset = queryset.filter(year__gt=var)
        return queryset


class LocationFilter(generics.ListCreateAPIView):
    serializer_class = LocationSerializer

    def get_queryset(self):
        queryset = Location.objects.all()
        var = self.request.GET.get('var', 'Italy')
        if var is not None:
            queryset = queryset.filter(country=var)
        return queryset

