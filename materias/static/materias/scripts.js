document.addEventListener('DOMContentLoaded', function () {

  // ===== VALIDACIÓN (tu lógica) =====
  const form = document.getElementById('form-materia');
  const nombre = document.getElementById('id_nombre');
  const comentario = document.getElementById('id_comentario');
  const semestreInput = document.getElementById('id_semestre');
  const erroresDiv = document.getElementById('errores-form');

  // ---- helpers ----
  function parseFechaDMY_HM(txt) {
    // Espera: "12/12/2025 10:05"
    const s = (txt || "").trim();
    const m = s.match(/^(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2})$/);
    if (!m) return null;
    const dd = Number(m[1]), mm = Number(m[2]) - 1, yyyy = Number(m[3]);
    const HH = Number(m[4]), Min = Number(m[5]);
    return new Date(yyyy, mm, dd, HH, Min, 0, 0);
  }

  // ===== 1) Guardar "momento de guardado" ANTES de que recargue =====
  if (form) {
    form.addEventListener('submit', function (e) {
      const errores = [];

      if (!nombre.value.trim()) errores.push('El nombre de la materia es obligatorio.');
      else if (nombre.value.trim().length < 3) errores.push('El nombre de la materia debe tener al menos 3 caracteres.');

      if (!comentario.value.trim()) errores.push('El comentario del semestre es obligatorio.');
      if (!semestreInput.value.trim()) errores.push('El semestre es obligatorio. Ejemplo: 2025-1 o 8vo.');

      if (errores.length > 0) {
        e.preventDefault();
        if (erroresDiv) {
          erroresDiv.style.display = 'block';
          erroresDiv.innerHTML = '<ul>' + errores.map(msg => `<li>${msg}</li>`).join('') + '</ul>';
        }
        return;
      }

      // Si pasa validación, marcamos el "momento del guardado"
      localStorage.setItem('ultimo_guardado_materias', String(Date.now()));
    });
  }

  // ===== 2) Pintar tabla: existentes verde, nuevos negro =====
  const tbody = document.querySelector('table tbody');
  if (!tbody) return;

  const tUltimo = Number(localStorage.getItem('ultimo_guardado_materias') || "0");

  const filas = tbody.querySelectorAll('tr');
  filas.forEach(fila => {
    const semestre = fila.children[2]?.innerText.trim(); // 3ra col
    const fechaTxt = fila.children[3]?.innerText.trim(); // 4ta col
    const fecha = parseFechaDMY_HM(fechaTxt);

    fila.classList.remove('registro-existente', 'registro-nuevo');

    // Si tiene semestre y NO es "nuevo", verde. Si es nuevo, negro.
    if (semestre) {
      if (fecha && tUltimo && fecha.getTime() >= tUltimo) {
        fila.classList.add('registro-nuevo');      // nuevo (negro)
      } else {
        fila.classList.add('registro-existente');  // existente (verde)
      }
    }
  });

});
