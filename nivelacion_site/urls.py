from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('materias.urls')),  # Enruta la raíz del sitio a la app "materias"
]
