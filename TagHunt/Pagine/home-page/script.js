require.config({
  paths: {
    vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.37.0/min/vs",
  },
});

const cerchio = document.getElementById("cerchio");

const button = document.getElementById("start-button");

const signUpButton = document.getElementById("Sign-up-button");

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    button.style.visibility = "visible";
    button.className += " animate__animated animate__zoomIn";
  }, 3000);
});

require(["vs/editor/editor.main"], function () {
  editor = monaco.editor.create(document.getElementById("editor"), {
    value: `<DOCTYPE html>
<html lang="en">
    <head>
    </head>
    <body>
        <h1>TagHunter</h1>
    </body>
</html>`,
    language: "html",
    theme: "vs-dark",
  });

  editor.onDidChangeModelContent(function () {
    const code = editor.getValue();
    updateResult(code);
  });

  updateResult(editor.getValue());

  setTimeout(() => {
    cerchio.style.width = "100px";
    cerchio.style.height = "100px";
    cerchio.style.left = "-2000px";
    cerchio.style.top = "-1000px";
  }, 100);
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
                    background-color:rgb(192, 169, 153);
                }
                ${styles}              </style>
            ${htmlWithoutStyles}
        `;
}

button.addEventListener("click", function () {
  cerchio.style.width = "300vw";
  cerchio.style.height = "300vh";

  setTimeout(() => {
    window.location.href = `../Sign-up/index.html?`;
  }, 2000);
});

signUpButton.addEventListener("click", function () {
  cerchio.style.width = "300vw";
  cerchio.style.height = "300vh";

  setTimeout(() => {
    window.location.href = `../Sign-up/index.html?`;
  }, 2000);
});
