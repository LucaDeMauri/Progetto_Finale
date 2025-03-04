let userData = localStorage.getItem('usersProgress');
  userData = JSON.parse(userData);

const params = new URLSearchParams(window.location.search);
    userid = params.get('userid');
    userid = userid-1;

let xp = 0;
let minXp = 0;
let maxXp = 1000;
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


document.addEventListener('DOMContentLoaded', function(){
  fetch('../../tutto.json')
  .then(response => response.json())
  .then(data => {
    if (!localStorage.getItem('tappe')) {
      localStorage.setItem('tappe', JSON.stringify(data));
      console.log("JSON caricato in localStorage:", data);
    }
    else{
      console.log("JSON gia' caricato in localStorage:", json.parse(localStorage.getItem('tappe')));
    }
  })
  .catch(error => console.error("Errore nel caricamento del JSON:", error));

  const cerchio = document.getElementById('cerchio');
    setTimeout(() => {
      cerchio.style.width = '100px';
      cerchio.style.height = '100px';
      cerchio.style.left = '-2000px';
      cerchio.style.top = '-1000px';
    }, 100);

    // Recupera XP dell'utente
    if (userData[userid] && userData[userid].xp !== undefined) {
        xp = userData[userid].xp;
        console.log("XP iniziale:", xp);
        showXP();
    } else {
        xp = 0;  // Imposta un valore predefinito
    }


    document.querySelectorAll('.step').forEach(step => {
      id = step.textContent;
      stepContainer = step.parentElement;
      console.log(stepContainer)
      if(userData[userid].steps[id-1].completed == true){
        step.style.backgroundColor = '#5de040';
        step.style.boxShadow = '5px 7px 0px rgb(38, 38, 38)';
        stepContainer.querySelector('.step-tag').style.fontFamily = 'apercu pro';
        stepContainer.querySelector('.step-tag').style.fontStyle = 'italic';
        stepContainer.querySelector('.step-tag').textContent = userData[userid].steps[id-1].tag;
      }
    })
  })


  let tempuserid = userid + 1
  document.getElementById("back-button").addEventListener("click", function() {
      cerchio.style.width = '300vw';
      cerchio.style.height = '300vw';
      setTimeout(() => {
    window.location.href = "../home-page/index.html?userid=" + tempuserid;
      },3000)
});

const xpbar = document.getElementById('progress-container');
xpbar.addEventListener('click', function(event) {
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

  setTimeout(() => {
    let params = new URLSearchParams(window.location.search);
    
    // Reindirizza alla nuova pagina mantenendo tutti i parametri
    window.location.href = `../account-page/index.html?${params.toString()}`;
  }, 2000);
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
        let params = new URLSearchParams(window.location.search);

        // Aggiungi il nuovo parametro (sovrascrive se esiste già)
        params.set('id', targetText);
        
        // Reindirizza alla nuova pagina mantenendo tutti i parametri
        window.location.href = `../ide_page/index.html?${params.toString()}`;
      }, 2000);

      }
})

document.querySelectorAll(".step").forEach(step => {
  step.addEventListener("mouseenter", function () {
    let description = this.nextElementSibling; 
    if (description && description.classList.contains("step-description")) {
      description.classList.remove("animate__fadeOutDown");
      description.style.display = "block"; 
      description.classList.add("animate__animated", "animate__fadeInUp"); 
    }
    let triangle = this.previousElementSibling;
    if (triangle && triangle.classList.contains("triangle")) {
      triangle.style.display = "block";
      triangle.style.animation = "bouncePersonal 1s infinite alternate ease-in-out";
    }
    let tag = this.parentElement.firstElementChild;
    if (tag && tag.classList.contains("step-tag")) {
      tag.classList.remove("animate__fadeOutUp");
      tag.style.display = "block";
      tag.classList.add("animate__animated", "animate__fadeInDown");
    }
  });

  step.addEventListener("mouseleave", function () {
    let description = this.nextElementSibling; 
    if (description && description.classList.contains("step-description")) {
      description.classList.remove("animate__fadeInUp"); 
      description.classList.add("animate__fadeOutDown"); 
    }
    let triangle = this.previousElementSibling;
    if (triangle && triangle.classList.contains("triangle")) {
      triangle.style.animation = "none";
      triangle.style.display = "none";
    }
    let tag = this.parentElement.firstElementChild;
    if (tag && tag.classList.contains("step-tag")) {
      tag.classList.remove("animate__fadeInDown");
      tag.classList.add("animate__fadeOutUp");
    } 
  });
});




async function showXP() {
  while(true){
    if (xp > maxXp) {
      xpPercentage = (xp - minXp) / 10;
      minXp = maxXp;
      maxXp += 1000;
      livAttuale += 1;
      livSuccessivo = livAttuale + 1;  
      xpPercentage = (xp - minXp) / 10;
    }
    else{
      console.log(xp);
      xpPercentage = (xp - minXp)/10;
      xpMin.textContent =  `${minXp}xp`
      xpMax.textContent =  `${maxXp}xp`
      liv1.textContent = `${livAttuale}`;
      liv2.textContent = `${livSuccessivo}`;  
      xpBar.style.background = "#49e426" ;
      xpBar.style.width = `${xpPercentage}%`;
      xpText.textContent = `${xp}xp`;
      break;
    }}
   
}