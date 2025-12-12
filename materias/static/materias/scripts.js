document.addEventListener('DOMContentLoaded', function () {

    /* ===============================
       VALIDACIÓN DEL FORMULARIO
       =============================== */

    const form = document.getElementById('form-materia');
    const nombre = document.getElementById('id_nombre');
    const comentario = document.getElementById('id_comentario');
    const semestreInput = document.getElementById('id_semestre');
    const erroresDiv = document.getElementById('errores-form');

    if (form) {
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

            if (!semestreInput.value.trim()) {
                errores.push('El semestre es obligatorio. Ejemplo: 2025-1 o 8vo.');
            }

            if (errores.length > 0) {
                e.preventDefault(); // Evita el envío del formulario
                erroresDiv.style.display = 'block';
                erroresDiv.innerHTML =
                    '<ul>' +
                    errores.map(error => `<li>${error}</li>`).join('') +
                    '</ul>';
            } else {
                erroresDiv.style.display = 'none';
                erroresDiv.innerHTML = '';
            }
        });
    }

    /* ===============================
       PINTAR REGISTROS EXISTENTES
       (campo semestre → 3ra columna)
       =============================== */

    const filas = document.querySelectorAll('table tbody tr');

    filas.forEach(fila => {

        // Tercera columna (índice 2)
        const semestre = fila.children[2].innerText.trim();

        // Si el campo semestre tiene valor, se pinta de verde
        if (semestre !== '') {
            fila.classList.add('registro-existente');
        }

    });

});
