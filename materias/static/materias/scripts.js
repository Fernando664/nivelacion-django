document.addEventListener('DOMContentLoaded', function () {

  const form = document.getElementById('form-materia');
  const nombreInput = document.getElementById('id_nombre');
  const comentarioInput = document.getElementById('id_comentario');
  const semestreInput = document.getElementById('id_semestre');
  const erroresDiv = document.getElementById('errores-form');

  // ==========================
  // 1) VALIDACIÓN + GUARDAR "ÚLTIMO REGISTRO" (ANTES DE RECARGAR)
  // ==========================
  if (form) {
    form.addEventListener('submit', function (e) {
      const errores = [];

      const nombre = (nombreInput?.value || '').trim();
      const comentario = (comentarioInput?.value || '').trim();
      const semestre = (semestreInput?.value || '').trim();

      if (!nombre) errores.push('El nombre de la materia es obligatorio.');
      else if (nombre.length < 3) errores.push('El nombre de la materia debe tener al menos 3 caracteres.');
      if (!comentario) errores.push('El comentario del semestre es obligatorio.');
      if (!semestre) errores.push('El semestre es obligatorio. Ejemplo: 2025-1 o 8vo.');

      if (errores.length > 0) {
        e.preventDefault();
        if (erroresDiv) {
          erroresDiv.style.display = 'block';
          erroresDiv.innerHTML = '<ul>' + errores.map(m => `<li>${m}</li>`).join('') + '</ul>';
        }
        return;
      }

      // Guardar lo que se acaba de enviar (para identificarlo tras recarga)
      localStorage.setItem('ultimo_registro_materia', JSON.stringify({
        nombre,
        comentario,
        semestre
      }));
    });
  }

  // ==========================
  // 2) PINTAR VERDE LOS QUE YA TIENEN "SEMESTRE"
  // ==========================
  const tbody = document.querySelector('table tbody');
  if (!tbody) return;

  const filas = Array.from(tbody.querySelectorAll('tr'));

  filas.forEach(fila => {
    const semestreCelda = (fila.children[2]?.innerText || '').trim(); // 3ra columna
    fila.classList.remove('registro-existente', 'registro-nuevo');

    if (semestreCelda) {
      fila.classList.add('registro-existente'); // verde por defecto
    }
  });

  // ==========================
  // 3) MARCAR COMO NEGRO SOLO EL "ÚLTIMO REGISTRO" (EL NUEVO)
  // ==========================
  const raw = localStorage.getItem('ultimo_registro_materia');
  if (!raw) return;

  let ultimo;
  try { ultimo = JSON.parse(raw); } catch { return; }

  const objetivoNombre = (ultimo.nombre || '').trim().toLowerCase();
  const objetivoComentario = (ultimo.comentario || '').trim().toLowerCase();
  const objetivoSemestre = (ultimo.semestre || '').trim().toLowerCase();

  // Busca la fila que coincida con lo que se envió
  const filaNueva = filas.find(fila => {
    const nombreTabla = (fila.children[0]?.innerText || '').trim().toLowerCase();
    const comentarioTabla = (fila.children[1]?.innerText || '').trim().toLowerCase();
    const semestreTabla = (fila.children[2]?.innerText || '').trim().toLowerCase();

    return (
      nombreTabla === objetivoNombre &&
      comentarioTabla === objetivoComentario &&
      semestreTabla === objetivoSemestre
    );
  });

  if (filaNueva) {
    // Forzar NEGRO al nuevo registro
    filaNueva.classList.remove('registro-existente');
    filaNueva.classList.add('registro-nuevo');
  }

  // Limpiar para que solo afecte una vez
  localStorage.removeItem('ultimo_registro_materia');

});


