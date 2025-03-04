const tagsContainers = document.querySelectorAll(".tagsContent");
const tagsContainersBefore = document.querySelectorAll(".tagsContentBefore");
//#5432de;
//#fff0e6
// Lista completa dei 110 tag HTML
const tags = [
    "&lt;!DOCTYPE html&gt;", "&lt;a&gt;", "&lt;abbr&gt;", "&lt;address&gt;", "&lt;area&gt;", "&lt;article&gt;", "&lt;aside&gt;", "&lt;audio&gt;", "&lt;b&gt;", "&lt;base&gt;",
    "&lt;bdi&gt;", "&lt;bdo&gt;", "&lt;blockquote&gt;", "&lt;body&gt;", "&lt;br&gt;", "&lt;button&gt;", "&lt;canvas&gt;", "&lt;caption&gt;", "&lt;cite&gt;", "&lt;code&gt;",
    "&lt;col&gt;", "&lt;colgroup&gt;", "&lt;data&gt;", "&lt;datalist&gt;", "&lt;dd&gt;", "&lt;del&gt;", "&lt;details&gt;", "&lt;dfn&gt;", "&lt;dialog&gt;", "&lt;div&gt;",
    "&lt;dl&gt;", "&lt;dt&gt;", "&lt;em&gt;", "&lt;embed&gt;", "&lt;fieldset&gt;", "&lt;figcaption&gt;", "&lt;figure&gt;", "&lt;footer&gt;", "&lt;form&gt;", "&lt;h1&gt;",
    "&lt;h2&gt;", "&lt;h3&gt;", "&lt;h4&gt;", "&lt;h5&gt;", "&lt;h6&gt;", "&lt;head&gt;", "&lt;header&gt;", "&lt;hgroup&gt;", "&lt;hr&gt;", "&lt;html&gt;",
    "&lt;i&gt;", "&lt;iframe&gt;", "&lt;img&gt;", "&lt;input&gt;", "&lt;ins&gt;", "&lt;kbd&gt;", "&lt;label&gt;", "&lt;legend&gt;", "&lt;li&gt;", "&lt;link&gt;",
    "&lt;main&gt;", "&lt;map&gt;", "&lt;mark&gt;", "&lt;meta&gt;", "&lt;meter&gt;", "&lt;nav&gt;", "&lt;noscript&gt;", "&lt;object&gt;", "&lt;ol&gt;", "&lt;optgroup&gt;",
    "&lt;option&gt;", "&lt;output&gt;", "&lt;p&gt;", "&lt;param&gt;", "&lt;picture&gt;", "&lt;pre&gt;", "&lt;progress&gt;", "&lt;q&gt;", "&lt;rp&gt;", "&lt;rt&gt;",
    "&lt;ruby&gt;", "&lt;s&gt;", "&lt;samp&gt;", "&lt;script&gt;", "&lt;section&gt;", "&lt;select&gt;", "&lt;small&gt;", "&lt;source&gt;", "&lt;span&gt;", "&lt;strong&gt;",
    "&lt;style&gt;", "&lt;sub&gt;", "&lt;summary&gt;", "&lt;sup&gt;", "&lt;svg&gt;", "&lt;table&gt;", "&lt;tbody&gt;", "&lt;td&gt;", "&lt;template&gt;", "&lt;textarea&gt;",
    "&lt;tfoot&gt;", "&lt;th&gt;", "&lt;thead&gt;", "&lt;time&gt;", "&lt;title&gt;", "&lt;tr&gt;", "&lt;track&gt;", "&lt;u&gt;", "&lt;ul&gt;", "&lt;var&gt;",
    "&lt;video&gt;", "&lt;wbr&gt;"
];

// Calcola quanti tag per ogni riga (equilibrato per evitare ripetizioni)
const totalRows = tagsContainers.length + tagsContainersBefore.length;
const tagsPerRow = Math.ceil(tags.length / totalRows);

function generateTags() {
    let shuffledTags = [...tags]; // Cloniamo l'array per mescolare
    let index = 0;

    // Popoliamo i container AFTER (scorrono a sinistra)
    tagsContainers.forEach((container) => {
        let tagString = "";
        for (let i = 0; i < tagsPerRow; i++) {
            if (index < shuffledTags.length) {
                tagString += `<span>${shuffledTags[index]}</span>`;
                index++;
            }
        }
        container.innerHTML = tagString + tagString; // Duplichiamo per l'animazione fluida
    });

    // Popoliamo i container BEFORE (scorrono a destra)
    tagsContainersBefore.forEach((container) => {
        let tagString = "";
        for (let i = 0; i < tagsPerRow; i++) {
            if (index < shuffledTags.length) {
                tagString += `<span>${shuffledTags[index]}</span>`;
                index++;
            }
        }
        container.innerHTML = tagString + tagString; // Duplichiamo per l'animazione fluida
    });
}

generateTags();
