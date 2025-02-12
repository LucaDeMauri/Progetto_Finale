document.addEventListener('click', function(event) {
  const cerchio = document.getElementById('cerchio');
    if (event.target.classList.contains('step')) {
        event.target.style.backgroundColor = 'lightgreen';
        cerchio.style.width = '300vw';
        cerchio.style.height = '300vw';
        

      // Dopo 1.5 secondi (durata della transizione), passa alla seconda pagina
      setTimeout(() => {
        window.location.href = "../prove-monaco/qualcosa.html";
      }, 2000);

      }
})