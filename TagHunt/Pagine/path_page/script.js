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
      event.target.style.transform = 'translateY(5px)';
      event.target.style.boxShadow = '2px 3px 0px rgb(38, 38, 38)';
      event.target.style.transition = 'transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out';

      // Dopo 100ms torna alla posizione originale
      setTimeout(() => {
          event.target.style.transform = 'translateY(0)';
          event.target.style.boxShadow = '5px 7px 0px rgb(38, 38, 38)';
      }, 200);
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

document.querySelectorAll(".step-container").forEach(step => {
  step.addEventListener("mouseenter", function () {
    let description = this.querySelector(".step-description"); 
    if (description && description.classList.contains("step-description")) {
      description.classList.remove("animate__fadeOutDown");
      description.style.display = "block"; 
      description.classList.add("animate__animated", "animate__fadeInUp"); 
    }
    let triangle = this.querySelector(".triangle");
    if (triangle && triangle.classList.contains("triangle")) {
      triangle.style.display = "block";
      triangle.style.animation = "bouncePersonal 1s infinite alternate ease-in-out";
    }
    let tag = this.querySelector(".step-tag");
    if (tag && tag.classList.contains("step-tag")) {
      tag.classList.remove("animate__fadeOutUp");
      tag.style.display = "block";
      tag.classList.add("animate__animated", "animate__fadeInDown");
    }
  });

  step.addEventListener("mouseleave", function () {
    let description = this.querySelector(".step-description");
    if (description && description.classList.contains("step-description")) {
      description.classList.remove("animate__fadeInUp"); 
      description.classList.add("animate__fadeOutDown"); 
    }
    let triangle = this.querySelector(".triangle");
    if (triangle && triangle.classList.contains("triangle")) {
      triangle.style.animation = "none";
      triangle.style.display = "none";
    }
    let tag = this.querySelector(".step-tag");
    if (tag && tag.classList.contains("step-tag")) {
      tag.classList.remove("animate__fadeInDown");
      tag.classList.add("animate__fadeOutUp");
    } 
  });
});



var xp = 0;
let minXp = 0;
let maxXp = 5000;
const xpBar = document.getElementById('xp-bar');
const xpText = document.getElementById('xp-text');
const xpMin = document.getElementById('xp-min');
minXp = parseInt(xpMin.textContent, 10);
const xpMax = document.getElementById('xp-max');
maxXp = parseInt(xpMax.textContent, 10);
let liv1 = document.getElementById('liv-attuale');
let livAttuale = parseInt(liv1.textContent, 10);
let liv2 = document.getElementById('liv-successivo');
let livSuccessivo = parseInt(liv2.textContent, 10);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


async function updateXP(amount) {
  xp += amount;

  if (xp > maxXp) {
    xpPercentage = (xp / maxXp) * 100;
    // Aggiorna la barra di progresso e il testo
        xpBar.style.width = `${xpPercentage}%`;
        xpText.textContent = `${xp}xp`;
    await sleep(2000)
        xpPercentage = 0;
        xpBar.style.background = "#e0e0e0" ;
        xpBar.style.width = `0`;
    await sleep(500)
    minXp = maxXp;
    xpMin.textContent =  `${minXp}xp`
    maxXp += 5000;
    xpMax.textContent =  `${maxXp}xp`
    livAttuale += 1;
    livSuccessivo = livAttuale + 1;  
    liv1.textContent = `${livAttuale}`;
    liv2.textContent = `${livSuccessivo}`;  
    xpPercentage = (xp / maxXp) * 100;
        xpBar.style.background = "#49e426" ;
        xpBar.style.width = `${xpPercentage}%`;
        xpText.textContent = `${xp}xp`;
  }
  else{
    xpPercentage = (xp / maxXp) * 100;
    // Aggiorna la barra di progresso e il testo
    xpBar.style.width = `${xpPercentage}%`;
    xpText.textContent = `${xp}xp`;
  }
  

  

}

// Esempio di utilizzo: incrementa l'XP
updateXP(2000);  // Incrementa di 20 punti
setTimeout(function() {
  updateXP(5000);
}, 3000);
setTimeout(function() {
    updateXP(5000);
  }, 3000);

  setTimeout(function() {
    updateXP(5000);
  }, 6000);

  setTimeout(function() {
    updateXP(5000);
  }, 7000);

    