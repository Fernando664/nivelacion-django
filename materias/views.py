from django.shortcuts import render, redirect
from .forms import MateriaForm
from .models import Materia

def registrar_materia(request):
    if request.method == "POST":
        form = MateriaForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('registrar_materia')
    else:
        form = MateriaForm()

    materias = Materia.objects.all().order_by('-fecha_registro')

    contexto = {
        'form': form,
        'materias': materias,
    }
    return render(request, 'materias/registrar_materia.html', contexto)
