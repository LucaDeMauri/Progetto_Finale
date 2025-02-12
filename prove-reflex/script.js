// Inizializzazione di Interact.js
interact('#splitter')
  .resizable({
    edges: { left: true, right: true }, // Permette il ridimensionamento da entrambi i lati
    restrict: {
      restriction: 'parent', // Limita il ridimensionamento all'interno del genitore
      endOnly: true           // Il ridimensionamento si ferma quando il mouse non è più in movimento
    },
    inertia: true, // Aggiunge un effetto di inerzia quando smetti di ridimensionare
    onmove(event) {
      const leftPanel = document.getElementById('left-panel');
      const rightPanel = document.getElementById('right-panel');

      // Calcoliamo la nuova larghezza del pannello sinistro
      const newWidth = leftPanel.offsetWidth + event.dx;

      // Impostiamo la larghezza del pannello sinistro
      leftPanel.style.width = `${newWidth}px`;

      // Impostiamo la larghezza del pannello destro (per mantenere il layout responsivo)
      rightPanel.style.width = `calc(100% - ${newWidth}px - 10px)`; // 10px per il separatore
    }
  });
