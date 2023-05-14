from django.urls import path
from .views import ArtList, ArtDetail, ArtForAuthor, LocationViewForAutocomplete, AuthorViewForAutocomplete, \
    GalleryViewForAutocomplete, AuthorFromGalleryDetail, GalleryByAuthor, AuthorDetail, AuthorList, AuthorWithPeriod,\
    LocationList, LocationDetail, GalleryList, GalleryDetail, GalleryAuthorList, GalleryAuthorDetail
from .controller import ArtbyYear, LocationFilter
from api import views


urlpatterns = [
    path('art/', ArtList.as_view()),
    path('art/<int:pk>/', ArtDetail.as_view()),
    path('author/', AuthorList.as_view()),
    path('author/<int:pk>/', AuthorDetail.as_view()),
    path('author/<int:pk>/art/', ArtForAuthor.as_view()),
    path('author_report/', AuthorWithPeriod.as_view()),
    path('locations/', LocationList.as_view()),
    path('locations/<int:pk>/', LocationDetail.as_view()),
    path('gallery/', GalleryList.as_view()),
    path('gallery/<int:pk>/', GalleryDetail.as_view()),
    path('author/<int:pk>/gallery/', AuthorFromGalleryDetail.as_view()),
    path('gallery/report/', GalleryByAuthor.as_view()),
    path('galleryauthor/', GalleryAuthorList.as_view()),
    path('galleryauthor/<int:pk>/', GalleryAuthorDetail.as_view()),
    path('art-filter/', ArtbyYear.as_view()),
    path('location-filter/', LocationFilter.as_view()),
    path("locations/autocomplete/", LocationViewForAutocomplete.as_view()),
    path("gallery/autocomplete/", GalleryViewForAutocomplete.as_view()),
    path("author/autocomplete/", AuthorViewForAutocomplete.as_view()),
]