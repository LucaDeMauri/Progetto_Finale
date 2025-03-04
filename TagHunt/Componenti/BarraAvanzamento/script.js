var xp = 4500;
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

async function showXP() {
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

updateXP(100);
//showXP();
    