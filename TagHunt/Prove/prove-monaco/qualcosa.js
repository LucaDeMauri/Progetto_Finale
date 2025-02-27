require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.37.0/min/vs' } });


let editor;  // Variabile per il Monaco Editor
const submit = document.getElementById("invio-codice");

window.addEventListener('load', () => {
    // Dopo il caricamento della pagina, il cerchio si rimpicciolisce
    const cerchio = document.getElementById('cerchio');
    setTimeout(() => {
      cerchio.style.width = '100px';
      cerchio.style.height = '100px';
      cerchio.style.left = '-2000px';
      cerchio.style.top = '-1000px';
    }, 200);
  });

require(['vs/editor/editor.main'], function () {
    editor = monaco.editor.create(document.getElementById('editor'), {
        value: "",
        language: 'html',
        theme: 'vs-dark'
    });

    // Monitora ogni cambiamento nel' Editor
    editor.onDidChangeModelContent(function () {
        const code = editor.getValue();
        updateResult(code);
        
    });

    /* Inizializza il contenuto del risultato con il codice iniziale, utile per i livelli successivi al primo
       in quanto le sfide in quel caso non chiederanno di riscrivere tutto da capo. */
    updateResult(editor.getValue());
});

// Funzione per aggiornare il contenuto del div #result usando Shadow DOM

function updateResult(code) {
    const resultDiv = document.getElementById('result');
    let shadowRoot = resultDiv.shadowRoot;

    // Se il Shadow DOM non esiste, crealo
    if (!shadowRoot) {
        shadowRoot = resultDiv.attachShadow({ mode: 'open' });
    }

    // Estrai gli stili dal codice utente
    const styleMatches = code.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || [];
    const styles = styleMatches.map(styleTag => styleTag.replace(/<\/?style[^>]*>/gi, '')).join('\n');
    
    const htmlWithoutStyles = code.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

    // Inserisci HTML e CSS nel Shadow DOM
    shadowRoot.innerHTML = `
        <style>
            body {
                font-family: 'sans-serif';
                padding: 10px;
            }
            ${styles}  /* Applichiamo gli stili dinamici */
        </style>
        ${htmlWithoutStyles}
    `;
}

// Funzione per convalidare il codice HTML

function validateCode(code) {
    try {
        if (!code) {
            throw new Error("Il codice è vuoto! Inserisci del codice prima di inviare.");
        }

        if (code.includes('<!DOCTYPE html>')) {
            alert("Hai superato la sfida! ✅");
        } else {
            throw new Error("Il codice non contiene <!DOCTYPE html>. Riprova!");
        }
    } catch (error) {
        alert(`Errore di validazione: ${error.message}`);
    }
}

submit.addEventListener('click', function(){
    const code = editor.getValue();
    validateCode(code);
})




// Funzione per aggiornare il layout del Monaco Editor
function updateEditorLayout() {
    if (editor) {
        editor.layout();  // Forza l'aggiornamento del layout
    }
}

// Funzione per rendere i pannelli ridimensionabili usando Interact.js
function makeResizable(resizer, leftPanel, rightPanel) {
    interact(resizer).draggable({
        listeners: {
            move(event) {
                const container = document.querySelector('.container');
                const containerWidth = container.offsetWidth;

                let newLeftWidth = leftPanel.offsetWidth + event.dx;
                let newRightWidth = rightPanel.offsetWidth - event.dx;

                if (newLeftWidth < 150) newLeftWidth = 150;
                if (newRightWidth < 150) newRightWidth = 150;

                if (newLeftWidth + newRightWidth + resizer.offsetWidth > containerWidth) {
                    return;
                }

                leftPanel.style.width = `${newLeftWidth}px`;
                rightPanel.style.width = `${newRightWidth}px`;

                updateEditorLayout();
            }
        }
    });
}

// Configuriamo i due splitter per il ridimensionamento
makeResizable(
    document.getElementById('splitter-1'),
    document.getElementById('left-panel'),
    document.getElementById('center-panel')
);

makeResizable(
    document.getElementById('splitter-2'),
    document.getElementById('center-panel'),
    document.getElementById('right-panel')
);













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

    