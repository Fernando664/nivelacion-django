document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form-materia');
    const nombre = document.getElementById('id_nombre');
    const comentario = document.getElementById('id_comentario');
    const semestre = document.getElementById('id_semestre');
    const erroresDiv = document.getElementById('errores-form');

    form.addEventListener('submit', function (e) {
        const errores = [];

        if (!nombre.value.trim()) {
            errores.push('El nombre de la materia es obligatorio.');
        } else if (nombre.value.trim().length < 3) {
            errores.push('El nombre de la materia debe tener al menos 3 caracteres.');
        }

        if (!comentario.value.trim()) {
            errores.push('El comentario del semestre es obligatorio.');
        }

        if (!semestre.value.trim()) {
            errores.push('El semestre es obligatorio. Ejemplo: 2025-1 o 8vo.');
        }

        if (errores.length > 0) {
            e.preventDefault(); // NO enviar el formulario
            erroresDiv.style.display = 'block';
            erroresDiv.innerHTML = '<ul>' + errores.map(msg => `<li>${msg}</li>`).join('') + '</ul>';
        } else {
            erroresDiv.style.display = 'none';
            erroresDiv.innerHTML = '';
        }
    });
});
