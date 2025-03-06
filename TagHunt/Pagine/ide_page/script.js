require.config({
  paths: {
    vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.37.0/min/vs",
  },
});

let dati;
let userData;
let numerrori = 0;
let userid;
let id;
let editor; 
let startTime = performance.now(); 
let elapsedTime = 0;
let tagName;
let tagClose;
let startCode;

let xp = 0;
let minXp = 0;
let maxXp = 1000;
const xpBar = document.getElementById("xp-bar");
const xpText = document.getElementById("xp-text");
const xpMin = document.getElementById("xp-min");
minXp = parseInt(xpMin.textContent, 10);
const xpMax = document.getElementById("xp-max");
maxXp = parseInt(xpMax.textContent, 10);
let liv1 = document.getElementById("liv-attuale");
let livAttuale = parseInt(liv1.textContent, 10);
let liv2 = document.getElementById("liv-successivo");
let livSuccessivo = parseInt(liv2.textContent, 10);
const submit = document.getElementById("invio-codice");
const reset = document.getElementById("invio-reset");

document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  id = params.get("id");
  userid = params.get("userid");
  id = id - 1; 
  userid = userid - 1; 
  console.log(id);
  console.log(userid);

  dati = localStorage.getItem("tappe");
  dati = JSON.parse(dati);
  console.log("Dati nel localStorage:", dati);

  userData = localStorage.getItem("usersProgress");
  userData = JSON.parse(userData);

  xp = userData[userid].xp;
  showXP();

  tagName = userData[userid].steps[id].tag;
  console.log(tagName);
  tagQuery = tagName.replace(/<\/?([^>]+)>/, "$1");
  tagClose = "</" + tagName.replace(/<\/?([^>]+)>/, "$1") + ">";
  console.log(tagClose);

  if (window.prettier) {
    startCode = prettier.format(dati.tappe[id].codice, {
      parser: "html",
      plugins: [prettierPlugins.html],
      tabWidth: 4, 
    });
  } else {
    startCode = dati.tappe[id].codice; 
  }

  document.getElementsByClassName("title")[0].textContent =
    dati.tappe[id].titolo;
  document.getElementById("descrizione").textContent =
    dati.tappe[id].descrizione;
  document.getElementById("instructions-rows").textContent =
    dati.tappe[id].consegna;

  console.log(dati.tappe[id].titolo);
});

window.addEventListener("load", () => {
  
  const cerchio = document.getElementById("cerchio");
  setTimeout(() => {
    cerchio.style.width = "100px";
    cerchio.style.height = "100px";
    cerchio.style.left = "-2000px";
    cerchio.style.top = "-1000px";
  }, 200);

  document.getElementById("back-button").addEventListener("click", function () {
    cerchio.style.width = "300vw";
    cerchio.style.height = "300vw";
    setTimeout(() => {
      let tempuserid = userid + 1;

      window.location.href = "../path_page/index.html?userid=" + tempuserid;
    }, 3000);
  });
});

require(["vs/editor/editor.main"], function () {
  editor = monaco.editor.create(document.getElementById("editor"), {
    value: startCode,
    language: "html",
    theme: "vs-dark",
  });

  
  editor.onDidChangeModelContent(function () {
    const code = editor.getValue();
    updateResult(code);
  });

    updateResult(editor.getValue());
});



function updateResult(code) {
  const resultDiv = document.getElementById("result");
  let shadowRoot = resultDiv.shadowRoot;

  
  if (!shadowRoot) {
    shadowRoot = resultDiv.attachShadow({ mode: "open" });
  }

  
  const styleMatches = code.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || [];
  const styles = styleMatches
    .map((styleTag) => styleTag.replace(/<\/?style[^>]*>/gi, ""))
    .join("\n");

  const htmlWithoutStyles = code.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");

  
  shadowRoot.innerHTML = `
        <style>
            body {
                font-family: 'sans-serif';
                padding: 10px;
            }
            ${styles}          </style>
        ${htmlWithoutStyles}
    `;
}



function errorsCalculator() {
  numerrori++;
  userData[userid].steps[id].errors = numerrori;
  localStorage.setItem("usersProgress", JSON.stringify(userData));
  console.log(`Num errori: ${numerrori}`);
}

function validateCode(code) {
  const message = document.getElementById("message");

  if (!code) {
    throw new Error(
      "Il codice è vuoto! Inserisci del codice prima di inviare."
    );
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(code, "text/html");
  const docSolution = parser.parseFromString(
    dati.tappe[id].soluzione,
    "text/html"
  );

  const body = doc.body;
  const bodySolution = docSolution.body;
  const solutionContent = bodySolution.querySelector(tagQuery).textContent;
  const solutionAttributes = bodySolution.querySelector(tagQuery).attributes;
  console.log(body);
  console.log(bodySolution);
  console.log(solutionContent);
  console.log(solutionAttributes);

  if (body.querySelector(tagQuery)) {
    console.log("Il tag " + tagName + " esiste nel codice.");

    if (
      code.includes(tagClose) ||
      !bodySolution.querySelector(tagQuery).innerHTML.includes(tagClose)
    ) {
      if (
        body.querySelector(tagQuery).textContent ===
        bodySolution.querySelector(tagQuery).textContent
      ) {
        let attributes = Array.from(body.querySelector(tagQuery).attributes);
        let attributesSolution = Array.from(
          bodySolution.querySelector(tagQuery).attributes
        );
        console.log(attributes);
        console.log(attributesSolution);

        if (compareAttributes(attributes, attributesSolution)) {
          let endTime = performance.now(); 
          elapsedTime = ((endTime - startTime) / 6000).toFixed(2); 
          userData[userid].steps[id].time = elapsedTime;
          userData[userid].steps[id].completed = true;
          console.log(userData[userid]);
          localStorage.setItem("usersProgress", JSON.stringify(userData));
          console.log(`Tempo trascorso: ${elapsedTime} secondi`);
          amount = 5000 - elapsedTime * 100;
          if (!numerrori == 0) {
            amount = amount - elapsedTime * numerrori * 100;
          }
          console.log(amount);
          message.style.color = "green";
          message.textContent = "Complimenti Hai superato la sfida! ✅";
          updateXP(amount);
        } else {
          errorsCalculator();
          let attributesString = "";
          for (let i = 0; i < solutionAttributes.length; i++) {
            const attribute = solutionAttributes[i];
            attributesString += `${attribute.name}="${attribute.value}"`;
            if (i < solutionAttributes.length - 1) {
              attributesString += " ";
            }
          }
          message.textContent =
            "assicurati di inserire " +
            attributesString +
            " all'interno di " +
            tagName;
        }
      } else {
        message.textContent = `assicurati di scrivere '${solutionContent}' nel tag ${tagName}`;
        errorsCalculator();
      }
    } else {
      message.textContent = `assicurati di chiudere il tag ${tagName} con il tag ${tagClose}`;
      errorsCalculator();
    }
  } else {
    message.textContent =
      "assicurati che il tag " + tagName + " si trovi nel body";
    errorsCalculator();
  }
}

function compareAttributes(attributes, solutionAttributes) {
  if (attributes.length !== solutionAttributes.length) return false; 

  for (let i = 0; i < attributes.length; i++) {
    if (attributes[i].name !== solutionAttributes[i].name) {
      return false; 
    } else {
      if (attributes[i].value !== solutionAttributes[i].value) {
        return false;
      }
    }
  }

  return true;
}

reset.addEventListener("click", function () {
  editor.setValue(startCode);
});

submit.addEventListener("click", function () {
  const code = editor.getValue();
  validateCode(code);
});


function updateEditorLayout() {
  if (editor) {
    editor.layout(); 
  }
}


function makeResizable(resizer, leftPanel, rightPanel) {
  interact(resizer).draggable({
    listeners: {
      move(event) {
        const container = document.querySelector(".container");
        const containerWidth = container.offsetWidth;

        let newLeftWidth = leftPanel.offsetWidth + event.dx;
        let newRightWidth = rightPanel.offsetWidth - event.dx;

        if (newLeftWidth < 150) newLeftWidth = 150;
        if (newRightWidth < 150) newRightWidth = 150;

        if (
          newLeftWidth + newRightWidth + resizer.offsetWidth >
          containerWidth
        ) {
          return;
        }

        leftPanel.style.width = `${newLeftWidth}px`;
        rightPanel.style.width = `${newRightWidth}px`;

        updateEditorLayout();
      },
    },
  });
}


makeResizable(
  document.getElementById("splitter-1"),
  document.getElementById("left-panel"),
  document.getElementById("center-panel")
);

makeResizable(
  document.getElementById("splitter-2"),
  document.getElementById("center-panel"),
  document.getElementById("right-panel")
);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function updateXP(amount) {
  xp += amount;
  userData[userid].xp = xp;
  userData[userid].steps[id].xp = amount;

  localStorage.setItem("usersProgress", JSON.stringify(userData));

  do {
    if (xp > maxXp) {
      xpPercentage = (xp - minXp) / 10;
      
      xpBar.style.width = `${xpPercentage}%`;
      xpText.textContent = `${xp}xp`;
      await sleep(2000);
      xpPercentage = 0;
      xpBar.style.background = "#e0e0e0";
      xpBar.style.width = `0`;
      await sleep(500);
      minXp = maxXp;
      xpMin.textContent = `${minXp}xp`;
      maxXp += 1000;
      xpMax.textContent = `${maxXp}xp`;
      livAttuale += 1;
      livSuccessivo = livAttuale + 1;
      liv1.textContent = `${livAttuale}`;
      liv2.textContent = `${livSuccessivo}`;
      xpPercentage = (xp - minXp) / 10;
      xpBar.style.background = "#49e426";
      xpBar.style.width = `${xpPercentage}%`;
      xpText.textContent = `${xp}xp`;
    } else {
      xpPercentage = (xp - minXp) / 10;
      
      xpBar.style.width = `${xpPercentage}%`;
      xpText.textContent = `${xp}xp`;
    }
  } while (xp > maxXp);
}

async function showXP() {
  while (true) {
    if (xp > maxXp) {
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
    } else {
      xpPercentage = (xp - minXp) / 10;
      xpMin.textContent = `${minXp}xp`;
      xpMax.textContent = `${maxXp}xp`;
      liv1.textContent = `${livAttuale}`;
      liv2.textContent = `${livSuccessivo}`;
      xpBar.style.background = "#49e426";
      xpBar.style.width = `${xpPercentage}%`;
      xpText.textContent = `${xp}xp`;
      break;
    }
  }
}
