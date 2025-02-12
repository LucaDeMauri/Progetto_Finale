document.addEventListener('DOMContentLoaded', function(){
  fetch('../../tutto.json')
  .then(response => response.json())
  .then(data => {
    localStorage.setItem('tappe', JSON.stringify(data));
    console.log("JSON caricato in localStorage:", data);

  })
  .catch(error => console.error("Errore nel caricamento del JSON:", error));
})


document.addEventListener('click', function(event) {
  const cerchio = document.getElementById('cerchio');
  
  if (event.target.classList.contains('step')) {
      // Cambia colore di sfondo dell'elemento cliccato
      event.target.style.backgroundColor = 'lightgreen';
      
      // Espandi il cerchio
      cerchio.style.width = '300vw';
      cerchio.style.height = '300vw';

      // Ottieni il testo del target cliccato
      const targetText = event.target.textContent.trim();
      console.log("Contenuto del target:", targetText);


      // Dopo 1.5 secondi (durata della transizione), passa alla seconda pagina
      setTimeout(() => {
        window.location.href ='../../Prove/prove-monaco/qualcosa.html?id='+targetText;
      }, 2000);

      }
})