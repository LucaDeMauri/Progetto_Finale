require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.37.0/min/vs' } });


let editorInstance;  // Variabile per l'istanza del Monaco Editor

require(['vs/editor/editor.main'], function () {
    editorInstance = monaco.editor.create(document.getElementById('editor'), {
        value: "",
        language: 'html',
        theme: 'vs-dark'
    });

    // Monitora ogni cambiamento nel Monaco Editor
    editorInstance.onDidChangeModelContent(function () {
        const code = editorInstance.getValue();
        updateResult(code);
        validateHTML(code);
    });

    // Inizializza il contenuto del risultato con il codice iniziale
    updateResult(editorInstance.getValue());
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
                font-family: 'Courier New', Courier, monospace;
                padding: 10px;
            }
            ${styles}  /* Applichiamo gli stili dinamici */
        </style>
        ${htmlWithoutStyles}
    `;
}

// Funzione per convalidare il codice HTML
function validateHTML(code) {
    const result = HTMLHint.verify(code);
    if (result.length > 0) {
        console.log('Errori di validazione:');
        result.forEach(function (error) {
            console.log('Linea ' + error.line + ': ' + error.message);
        });
    } else {
        console.log('Il codice HTML è valido.');
    }
}

// Funzione per aggiornare il layout del Monaco Editor
function updateEditorLayout() {
    if (editorInstance) {
        editorInstance.layout();  // Forza l'aggiornamento del layout
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


