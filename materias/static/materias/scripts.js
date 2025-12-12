document.addEventListener('DOMContentLoaded', function () {

  // ======= 1) Pintar SOLO filas que ya existen al cargar =======
  const tbody = document.querySelector('table tbody');
  if (!tbody) return;

  const filasIniciales = Array.from(tbody.querySelectorAll('tr'));

  filasIniciales.forEach(fila => {
    const semestre = fila.children[2]?.innerText.trim(); // 3ra columna
    if (semestre) {
      fila.classList.add('registro-existente');
      fila.dataset.inicial = "1"; // marca que ya existía
    }
  });

  // ======= 2) Si se agregan filas nuevas después, dejarlas negras =======
  const observer = new MutationObserver(mutations => {
    mutations.forEach(m => {
      m.addedNodes.forEach(node => {
        if (node.nodeType === 1 && node.tagName === 'TR') {
          // Es una fila nueva agregada después de cargar
          node.classList.remove('registro-existente');
          node.classList.add('registro-nuevo');
        }
      });
    });
  });

  observer.observe(tbody, { childList: true });

});
