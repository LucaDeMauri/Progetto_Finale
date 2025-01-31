document.addEventListener('click', function(event) {
    if (event.target.classList.contains('step')) {
        alert('Hai cliccato su ' + event.target.textContent);
        event.target.style.backgroundColor = 'lightgreen';
      }
})