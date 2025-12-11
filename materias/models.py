from django.db import models

from django.db import models

class Materia(models.Model):
    nombre = models.CharField("Nombre de la materia", max_length=100)
    comentario = models.TextField("Comentario del semestre")
    semestre = models.CharField("Semestre", max_length=20)  # "2025-2" o "12vo"
    fecha_registro = models.DateTimeField("Fecha de registro", auto_now_add=True)

    def __str__(self):
        return f"{self.nombre} - {self.semestre}"


# Create your models here.
