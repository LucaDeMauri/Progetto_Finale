let xp = 0;
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
        xpBar.style.background = "#4caf50" ;
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

    