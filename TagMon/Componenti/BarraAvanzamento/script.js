let xp = 0;
const maxXp = 100; // Definisci il punteggio massimo per il livello
const xpBar = document.getElementById('xp-bar');
const xpText = document.getElementById('xp-text');

function updateXP(amount) {
  xp += amount;
  if (xp > maxXp) xp = maxXp;  // Limita l'XP al massimo
  const xpPercentage = (xp / maxXp) * 100;
  
  // Aggiorna la barra di progresso e il testo
  xpBar.style.width = `${xpPercentage}%`;
  xpText.textContent = `XP: ${xp} / ${maxXp}`;
}

// Esempio di utilizzo: incrementa l'XP
updateXP(20);  // Incrementa di 20 punti
setTimeout(function() {
  updateXP(50);
}, 3000);
    