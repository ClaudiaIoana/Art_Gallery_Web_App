from django.urls import path
from api import views

urlpatterns = [
    path('art/', views.art_list),
    path('art/<int:pk>/', views.art_detail),
]