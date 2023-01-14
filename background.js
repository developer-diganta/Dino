const fontBtns = document.getElementsByClassName("fontSize");
for (let i = 0; i < fontBtns.length; i++) {
  fontBtns[i].addEventListener("click", function (e) {
    console.log("Hi");
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "fontSize",
        fontSize: e.target.innerText,
      });
    });
  });
}
const fontStyleBtns = document.getElementsByClassName("fontStyle");
for (let i = 0; i < fontStyleBtns.length; i++) {
  fontStyleBtns[i].addEventListener("click", function (e) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "fontStyle",
        fontStyle: e.target.innerText,
      });
    });
  });
}

const images = document.getElementsByClassName("img-remmover");
for (let i = 0; i < images.length; i++) {
  images[i].addEventListener("click", function (e) {
    console.log("clicked");
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "image" });
    });
  });
}

const imageAdd = document.getElementsByClassName("img-add");
for (let i = 0; i < imageAdd.length; i++) {
  imageAdd[i].addEventListener("click", function (e) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "imageAdd" });
    });
  });
}

const textToSpeechHelper = document.getElementsByClassName("text-to-speech");
const rate = document.querySelector("#rate");
console.log(rate.value);
for (let i = 0; i < textToSpeechHelper.length; i++) {
  textToSpeechHelper[i].addEventListener("click", function (e) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "text-to-speech",
        rate: rate.value,
      });
    });
  });
}

const textToSpeachSelected = document.getElementsByClassName("text-to-speech-selected");
for (let i = 0; i < textToSpeachSelected.length; i++) {
  textToSpeachSelected[i].addEventListener("click", function (e) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "text-to-speech-selected",
        rate: rate.value,
      });
    });
  });
}

const textToSpeechStop = document.getElementsByClassName("stop-speech");
for (let i = 0; i < textToSpeechStop.length; i++) {
  textToSpeechStop[i].addEventListener("click", function (e) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "stop-speech" });
    });
  });
}

const links = document.getElementsByClassName("link");
for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function (e) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "link-highlight" });
    });
  });
}



const removeLinkHighlight = document.getElementsByClassName("remove-link-hg");
for (let i = 0; i < links.length; i++) {
  removeLinkHighlight[i].addEventListener("click", function (e) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "link-highlight-remove" });
    });
  });
}

const imageReader = document.getElementsByClassName("img-read");
for (let i = 0; i < imageReader.length; i++) {
  imageReader[i].addEventListener("click", function (e) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "image-reader" });
    });
  });
}

const backgroundColorChanger = document.getElementById(
  "backgroundColorChanger"
);
backgroundColorChanger.addEventListener("submit", function (e) {
  e.preventDefault();
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "backgroundColor",
      backgroundColor: e.target.color.value,
    });
  });
});

document
  .getElementsByClassName("revert-background-color")[0]
  .addEventListener("click", function (e) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "revert-background-color",
      });
    });
  });

const fontColorChanger = document.getElementById("fontColorChanger");
fontColorChanger.addEventListener("submit", function (e) {
  e.preventDefault();
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "fontColor",
      fontColor: e.target.color.value,
    });
  });
});

const highlightPara = document.getElementsByClassName("para-highlighter");
for (let i = 0; i < highlightPara.length; i++) {
  highlightPara[i].addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "para-highlighter" });
    });
  });
}



const removeHighlightPara = document.getElementsByClassName(
  "para-highlighter-remove"
);
for (let i = 0; i < removeHighlightPara.length; i++) {
  removeHighlightPara[i].addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
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
selectedText[0].addEventListener("click", function () {
  const updateDefinition = document.getElementsByClassName(
    "select-text-definition"
  )[0];
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "select-text" },
      async function (response) {
        const loadingAnimation = ['|', '/', '-', '\\'];
        let i = 0;
        // Display the loading animation
        const interval = setInterval(() => {
          updateDefinition.innerHTML = ("\r" + "Loading data from API... " + loadingAnimation[i++ % loadingAnimation.length]);
        }, 100);
        const word = response.data;
        if (word) {
          await fetchMeaning(word).then(
            (definition) => {
              clearInterval(interval);
              if (definition)
            updateDefinition.innerHTML = word + " :- " + definition;
              else 
            updateDefinition.innerHTML = "Word not found!";
          }
          );
        } else {
          clearInterval(interval);
          updateDefinition.innerHTML =
            "Please select word without space initially to get definition!";
        }
      }
    );
  });
});




document.getElementById('checkbox').addEventListener('click',()=>{
  var element = document.body;
  element.classList.toggle("dark-mode");
})

function wordToSpeechStop(){
  speechSynthesis.cancel();
}

function wordToSpeech(text){
  let utter = new SpeechSynthesisUtterance();
  utter.lang = 'en-US';
  utter.text = text;
  utter.volume = 0.5;
  window.speechSynthesis.speak(utter);
}

const extensionDescription = "Dino is an extension developed to make the web more accessible to people with dyslexia and color blindness. Dino allows you to change colors, add and remove images, read out pages etc.";

const wordArray = [extensionDescription,"FONT SIZE","FONT STYLE","IMAGES","LISTEN TO WEB PAGE","LINKS","COLORS","DICTIONARY","PARAGRAPHS"];
const speakerHelper = document.getElementsByClassName("speaker");
for (let i = 0; i < speakerHelper.length; i++) {
  speakerHelper[i].addEventListener("click", function (e) {
    wordToSpeechStop();
   wordToSpeech(wordArray[i]);
  });
}


function handleZoom(zoomVal) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "zoomPage",
      zoomValue: zoomVal,
    });
  });
}
const zoomIn = document.getElementById("magni-inc");
const zoomOut = document.getElementById("magni-dec");
const zoomValue = document.getElementById("magni");
const showZoomValue = document.getElementsByClassName("show-zoom-value");
const resetZoom = document.getElementById("resetZoom");
zoomIn.addEventListener("click", () => {
  zoomValue.value = parseInt(zoomValue.value) + 10;
  showZoomValue[0].innerText = zoomValue.value + "%";
  handleZoom(zoomValue.value + "%");
});
zoomValue.addEventListener("input", () => {
  showZoomValue[0].innerText = zoomValue.value + "%";
  handleZoom(zoomValue.value + "%");
});
zoomOut.addEventListener("click", () => {
  zoomValue.value = parseInt(zoomValue.value) - 10;
  showZoomValue[0].innerText = zoomValue.value + "%";
  handleZoom(zoomValue.value + "%");
});

resetZoom.addEventListener("click", () => {
  const zoom = "100%";
  zoomValue.value = zoom;
  showZoomValue[0].innerText = zoom;
  handleZoom(zoom);
});


const remove_italics = document.getElementsByClassName("remove-italics");
for (let i = 0; i < remove_italics.length; i++) {
  remove_italics[i].addEventListener("click", function (e) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "italics-remove" });
    });
  });
}

const remove_underscore = document.getElementsByClassName("remove-underscore");
for (let i = 0; i < remove_underscore.length; i++) {
  remove_underscore[i].addEventListener("click", function (e) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "underscore-remove" });
    });
  });
}

const italics_underscore_reset = document.getElementsByClassName("reset-italics-and-underscore");
for (let i = 0; i < italics_underscore_reset.length; i++) {
  italics_underscore_reset[i].addEventListener("click", function (e) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "reset_italics_underscore" });
    });
  });
}
