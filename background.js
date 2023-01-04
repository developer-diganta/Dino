const fontBtns = document.getElementsByClassName("fontSize");
const fontStyleBtns = document.getElementsByClassName("fontStyle");
const images = document.getElementsByClassName("img-remmover");
const imageAdd = document.getElementsByClassName("img-add");
const links = document.getElementsByClassName("link");
const removeLinkHighlight = document.getElementsByClassName("remove-link-hg");
const readOutImages = document.getElementsByClassName("img-read");
const color = document.getElementsByClassName("pick-color")
const bgcolor = document.getElementsByClassName("bgcolor");

function attachEventListener(className, action, data) {
    const elements = document.getElementsByClassName(className);
    Array.from(elements).forEach(element => {
        element.addEventListener("click", () => {
            chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
                const message = { action };
                if (data) {
                    message[data] = element.innerText;
                }
                chrome.tabs.sendMessage(tabs[0].id, message);
            });
        });
    });
}

attachEventListener("fontSize", "fontSize", "fontSize");
attachEventListener("fontStyle", "fontStyle", "fontStyle");
attachEventListener("img-remmover", "image");
attachEventListener("img-add", "imageAdd");
attachEventListener("link", "link-highlight");
attachEventListener("remove-link-hg", "link-highlight-remove");


// Text- to Speech
const textToSpeech = document.getElementsByClassName("text-to-speech");
const rate = document.querySelector("#rate");
console.log(rate.value);
for (let i = 0; i < textToSpeech.length; i++) {
    textToSpeech[i].addEventListener("click", function(e) {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "text-to-speech",
                rate: rate.value,
            });
        });
    });
}

const imageReader = document.getElementsByClassName("img-read");
for (let i = 0; i < imageReader.length; i++) {
    imageReader[i].addEventListener("click", function(e) {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "image-reader" });
        });
    });
}

const backgroundColorChanger = document.getElementById(
    "backgroundColorChanger"
);
backgroundColorChanger.addEventListener("submit", function(e) {
    e.preventDefault();
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: "backgroundColor",
            backgroundColor: e.target.color.value,
        });
    });
});

document
    .getElementsByClassName("revert-background-color")[0]
    .addEventListener("click", function(e) {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "revert-background-color",
            });
        });
    });

const fontColorChanger = document.getElementById("fontColorChanger");
fontColorChanger.addEventListener("submit", function(e) {
    e.preventDefault();
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: "fontColor",
            fontColor: e.target.color.value,
        });
    });
});



const highlightPara = document.getElementsByClassName("para-highlighter");
for (let i = 0; i < highlightPara.length; i++) {
    highlightPara[i].addEventListener("click", function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "para-highlighter" });
        });
    });
}

const removeHighlightPara = document.getElementsByClassName(
    "para-highlighter-remove"
);
for (let i = 0; i < removeHighlightPara.length; i++) {
    removeHighlightPara[i].addEventListener("click", function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "para-highlighter-remove",
            });
        });
    });
}

const api = "https://api.dictionaryapi.dev/api/v2/entries/en/";
async function fetchMeaning(word) {
    return await fetch(api + word)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            return json[0].meanings[0].definitions[0].definition;
        })
        .catch((error) => false);
}

const selectedText = document.getElementsByClassName("select-text");
selectedText[0].addEventListener("click", function() {
    const updateDefinition = document.getElementsByClassName(
        "select-text-definition"
    )[0];
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id, { action: "select-text" },
            async function(response) {
                const word = response.data;
                if (word) {
                    const definition = await fetchMeaning(word);
                    if (definition)
                        updateDefinition.innerHTML = word + " :- " + definition;
                    else {
                        updateDefinition.innerHTML = "Word not found!";
                    }
                } else {
                    updateDefinition.innerHTML =
                        "Please select word without space initially to get definition!";
                }
            }
        );
    });
});