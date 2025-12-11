from django import forms
from .models import Materia

class MateriaForm(forms.ModelForm):
    class Meta:
        model = Materia
        fields = ['nombre', 'comentario', 'semestre']
        widgets = {
            'nombre': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Ej. Lenguajes de Interfaz'
            }),
            'comentario': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 4,
                'placeholder': 'Comentario sobre la materia este semestre'
            }),
            'semestre': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': ' 2025-2'
            }),
        }
