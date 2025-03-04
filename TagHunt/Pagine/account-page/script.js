userData = localStorage.getItem('usersProgress');
userData = JSON.parse(userData);

users = localStorage.getItem('users');
users = JSON.parse(users);

const params = new URLSearchParams(window.location.search);
userid = params.get('userid');
userid = userid-1;



let xp = userData[userid].xp;

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

showXP()

username = document.getElementById("username");
username.innerText = users[userid].username

window.addEventListener('load', () => {
    // Dopo il caricamento della pagina, il cerchio si rimpicciolisce
    const cerchio = document.getElementById('cerchio');
    setTimeout(() => {
      cerchio.style.width = '100px';
      cerchio.style.height = '100px';
      cerchio.style.left = '-2000px';
      cerchio.style.top = '-1000px';
    }, 100);
  });

  let tempuserid = userid + 1
  document.getElementById("back-button").addEventListener("click", function() {
      cerchio.style.width = '300vw';
      cerchio.style.height = '300vw';
      setTimeout(() => {
    window.location.href = "../path_page/index.html?userid=" + tempuserid;
      },3000)
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


async function updateXP(amount) {
  xp += amount;

  do{
  if (xp > maxXp) {
    xpPercentage = (xp - minXp) / 10;
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
    maxXp += 1000;
    xpMax.textContent =  `${maxXp}xp`
    livAttuale += 1;
    livSuccessivo = livAttuale + 1;  
    liv1.textContent = `${livAttuale}`;
    liv2.textContent = `${livSuccessivo}`;  
    xpPercentage = (xp - minXp) / 10;
        xpBar.style.background = "#49e426" ;
        xpBar.style.width = `${xpPercentage}%`;
        xpText.textContent = `${xp}xp`;}
        else{
          xpPercentage = (xp - minXp)/10;
          // Aggiorna la barra di progresso e il testo
          xpBar.style.width = `${xpPercentage}%`;
          xpText.textContent = `${xp}xp`;
        }}
  while(xp > maxXp)
  
}

function showXP() {
  while(true){
    if (xp > maxXp) {
      console.log(xp);
      console.log(minXp);
      console.log(maxXp);
      console.log(livAttuale);
      console.log(livSuccessivo);
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

function BestScoreCalculator() {
  let bestScores = [];

  // Ciclo su tutti gli step (supponiamo che tutti abbiano lo stesso numero di step)
  for (let j = 0; j < userData[0].steps.length; j++) {
    let bestScore = {
      username: "",
      xp: 0,
      time: 100000,  // Valore iniziale grande per trovare il tempo minore
      errors: 10000 // Valore iniziale grande per trovare il minimo errore
    };

    // Ciclo su tutti gli utenti per confrontare gli step
    for (let i = 0; i < userData.length; i++) {
      let step = userData[i].steps[j]; // Step corrente dell'utente

      // Confrontiamo XP: prendiamo il valore più alto
      if (step.xp > bestScore.xp) {
        bestScore.xp = step.xp;
        bestScore.username = users[i].username; // Prendi il nome utente corretto
      }

      // Confrontiamo il tempo: prendiamo il valore più basso (se diverso da 0)
      if (step.time > 0 && step.time < bestScore.time) {
        bestScore.time = step.time;
      }

      // Confrontiamo gli errori: prendiamo il valore più basso
      if (step.errors < bestScore.errors) {
        bestScore.errors = step.errors;
      }
    }

    // Se il tempo è rimasto Infinity, significa che nessun utente ha completato lo step
    if (bestScore.time === Infinity) bestScore.time = 0;
    if (bestScore.errors === Infinity) bestScore.errors = 0;

    bestScores.push(bestScore);
  }

  return bestScores;
}


function tableBuilder(){
  let bestScores = BestScoreCalculator();
  let tbody = document.querySelector(".table-container table tbody");

  // Svuota la tabella prima di aggiungere nuovi dati
  tbody.innerHTML = "";

  // Popola la tabella con i dati di bestScores
  bestScores.forEach((score, index) => {
      let row = document.createElement("tr");

      row.innerHTML = `
          <td>${index + 1}</td>
          <td>${score.username}</td>
          <td>${score.xp}</td>
          <td>${score.time}</td>
          <td>${score.errors}</td>
      `;

      tbody.appendChild(row);
  });
}

function galleryBuilder(){
  let tagsSlot = document.getElementsByClassName("tag");
  userData[userid].steps.forEach((step, index) => {
    if(step.completed == true){
      tagsSlot[index].textContent = step.tag;
      tagsSlot[index].style.animation = "none";
    }
    
  });
}

tableBuilder()
galleryBuilder()