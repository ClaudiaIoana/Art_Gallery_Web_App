from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Art
from .serializers import ArtSerializer


@api_view(['GET', 'POST'])
def art_list(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        art = Art.objects.all()
        serializer = ArtSerializer(art, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ArtSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def art_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        art = Art.objects.get(pk=pk)
    except Art.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ArtSerializer(art)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ArtSerializer(art, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        art.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
