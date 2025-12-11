from django.urls import path
from . import views

urlpatterns = [
    path('', views.registrar_materia, name='registrar_materia'),
]
