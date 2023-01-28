let Preference = {};
const fontBtns = document.getElementsByClassName("fontSize");
for (let i = 0; i < fontBtns.length; i++) {
  fontBtns[i].addEventListener("click", function (e) {
    Preference.fontSize = e.target.innerText;
    console.log("Hi");
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "fontSize",
        fontSize: e.target.innerText,
      });
    });
  });
}
const fontChange = document.querySelector("#fontChange")
fontChange.addEventListener("change",function(e){

const elements=document.getElementsByTagName("*")
for(let i=0;i<elements.length;i++){
  const element=elements[i];
  const selectedFont=e.target.value
  
 if (selectedFont === "Trebuchet MS") {
   element.style.fontFamily = "Castellar, Trebuchet MS, sans-serif";
 } else if (selectedFont === "Arial") {
   element.style.fontFamily = "Arial, sans-serif";
 } else if (selectedFont === "Baskerville") {
   element.style.fontFamily = "Baskerville, serif";
 } else if (selectedFont === "Calibri") {
   element.style.fontFamily = "Calibri, sans-serif";
 } else if (selectedFont === "Garamond") {
   element.style.fontFamily = "Garamond, serif";
 } else if (selectedFont === "Verdana") {
   element.style.fontFamily = "Verdana, sans-serif";
 } else if (selectedFont === "Georgia") {
   element.style.fontFamily = "Georgia, serif";
 } else if (selectedFont === "Times New Roman") {
   element.style.fontFamily = "Times New Roman,serif";
 } else if (selectedFont === "Helvetica") {
   element.style.fontFamily = "Helvetica, sans-serif";
 } else if (selectedFont === "Monaco") {
   element.style.fontFamily = "Monaco, Monospace";
 } else if (selectedFont === "OpenSans") {
   element.style.fontFamily = "OpenSans-Regular, sans-serif";
 } else if (selectedFont === "Tahoma") {
   element.style.fontFamily = "Tahoma,sans-serif";
 }
 else if(selectedFont=="Default"){
  element.style.fontFamily = "";
  
 }

 }


})

const fontStyleBtns = document.getElementsByClassName("fontStyle");
for (let i = 0; i < fontStyleBtns.length; i++) {
  fontStyleBtns[i].addEventListener("click", function (e) {
    Preference.fontStyle = e.target.innerText;
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
    Preference.image = false;
    console.log("clicked");
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "image" });
    });
  });
}

const imageAdd = document.getElementsByClassName("img-add");
for (let i = 0; i < imageAdd.length; i++) {
  imageAdd[i].addEventListener("click", function (e) {
    Preference.image = true;
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

const textToSpeachSelected = document.getElementsByClassName(
  "text-to-speech-selected"
);
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
    Preference.linkHighlight = true;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "link-highlight" });
    });
  });
}

const show_borders = document.getElementsByClassName("border");
for (let i = 0; i < show_borders.length; i++) {
  show_borders[i].addEventListener("click", function (e) {
    Preference.borderHighlight = true;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "link-border-highlight" });
    });
  });
}

const removeLinkHighlight = document.getElementsByClassName("remove-link-hg");
for (let i = 0; i < links.length; i++) {
    removeLinkHighlight[i].addEventListener('click', function (e) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "link-highlight-remove"});
        }
        )
    })
};


////////////////////////AUTO SCROLLING FEATURE JS CODE///////////////////////////
const autoScrollFeature = document.getElementById('autoscroll');
let scrollerID;
let paused = true;
let speed = 2; // 1 - Fast | 2 - Medium | 3 - Slow //default speed is medium.
let interval = speed * 5;
const slow_speed = document.getElementById('slow_btn');
const medium_speed = document.getElementById('medium_btn');
const high_speed = document.getElementById('fast_btn');
if(slow_speed.addEventListener('click',function(event){
    speed = 3;
    interval = speed * 5;
    scroling(event);
}));
if(medium_speed.addEventListener('click',function(event){
    speed = 2;
    interval = speed * 5;
    scroling(event);
}));
if(high_speed.addEventListener('click',function(event){
    speed = 1;
    interval = speed * 5;
    scroling(event);
}));



function startScroll(){
    let id = setInterval(function(event) {
        window.scrollBy(0, 2); //scrollBy function of JS
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            // Reached end of page
            stopScroll();
        }
    }, interval);
    return id;
}

function stopScroll() {
    clearInterval(scrollerID);
}

function scroling(event){
    if (event.which == 13 || event.keyCode == 13) {
        // It's the 'Enter' key
        if(paused == true) {
            scrollerID = startScroll();
            paused = false;
        }
        else {
            stopScroll();
            paused = true;
        }
    }
}

document.body.addEventListener('keypress', function (event)
// autoScrollFeature.addEventListener('click', function()
{
    scroling(event);
}
, true);


/////////////////////////////////////////////////////////////////
const imageReader = document.getElementsByClassName('img-read');
// const imageReader = document.getElementsByClassName("img-read");
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
  Preference.backgroundColor = e.target.color.value;
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
    Preference.backgroundColor = false;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "revert-background-color",
      });
    });
  });

  
  document
  .getElementsByClassName("revert-Font-color")[0]
  .addEventListener("click", function (e) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "revert-Font-color",
      });
    });
  });


const fontColorChanger = document.getElementById("fontColorChanger");
fontColorChanger.addEventListener("submit", function (e) {
  e.preventDefault();
  Preference.fontColor = e.target.color.value;
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
    Preference.paraHighlight = true;
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
    Preference.paraHighlight = false;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "para-highlighter-remove",
      });
    });
  });
}

const highlightParaBackground = document.getElementsByClassName(
  "para-highlighter-background"
);
for (let i = 0; i < highlightParaBackground.length; i++) {
  highlightParaBackground[i].addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "para-highlighter-background",
      });
    });
  });
}

const removeHighlightParaBackground = document.getElementsByClassName(
  "para-highlighter-background-remove"
);
for (let i = 0; i < removeHighlightParaBackground.length; i++) {
  removeHighlightParaBackground[i].addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "para-highlighter-background-remove",
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
        const loadingAnimation = ["|", "/", "-", "\\"];
        let i = 0;
        // Display the loading animation
        const interval = setInterval(() => {
          updateDefinition.innerHTML =
            "\r" +
            "Loading data from API... " +
            loadingAnimation[i++ % loadingAnimation.length];
        }, 100);
        const word = response.data;
        if (word) {
          await fetchMeaning(word).then((definition) => {
            clearInterval(interval);
            if (definition)
              updateDefinition.innerHTML = word + " :- " + definition;
            else updateDefinition.innerHTML = "Word not found!";
          });
        } else {
          clearInterval(interval);
          updateDefinition.innerHTML =
            "Please select word without space initially to get definition!";
        }
      }
    );
  });
});

document.getElementById("checkbox").addEventListener("click", () => {
  var element = document.body;
  element.classList.toggle("dark-mode");
});

function wordToSpeechStop() {
  speechSynthesis.cancel();
}

function wordToSpeech(text) {
  let utter = new SpeechSynthesisUtterance();
  utter.lang = "en-US";
  utter.text = text;
  utter.volume = 0.5;
  window.speechSynthesis.speak(utter);
}

const extensionDescription =
  "Dino is an extension developed to make the web more accessible to people with dyslexia and color blindness. Dino allows you to change colors, add and remove images, read out pages etc.";

const wordArray = [
  extensionDescription,
  "YOUR PREFERENCES",
  "FONT SIZE",
  "FONT STYLE",
  "IMAGES",
  "LISTEN TO WEB PAGE",
  "PARAGRAPHS",
  "LINKS",
  "COLORS",
  "DICTIONARY",
  "TRANSLATION",
  "REMOVE ITALIC AND UNDERSCORE"
];
const speakerHelper = document.getElementsByClassName("speaker");
for (let i = 0; i < speakerHelper.length; i++) {
  speakerHelper[i].addEventListener("click", function (e) {
    wordToSpeechStop(e);
    wordToSpeech(wordArray[i]);
  });
}

function handleZoom(zoomVal) {
  Preference.zoomVal = zoomVal;
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

const italics_underscore_reset = document.getElementsByClassName(
  "reset-italics-and-underscore"
);
for (let i = 0; i < italics_underscore_reset.length; i++) {
  italics_underscore_reset[i].addEventListener("click", function (e) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "reset_italics_underscore",
      });
    });
  });
}
// Usage
// Add click event listeners to buttons
document.getElementById("upper-case-btn").addEventListener("click", function() {
  convertCase("uppercase");
});
document.getElementById("lower-case-btn").addEventListener("click", function() {
  convertCase("lowercase");
});

// Background script
function convertCase(caseType) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action:"convertCase",payload: caseType});
  });
}


const savePreferenceBtn = document
  .getElementById("savePreferenceBtn")
  .addEventListener("click", savePreference);
function savePreference(e) {
  //will save Preferences
  e.preventDefault();

  localStorage.setItem("dinoPreferences", JSON.stringify(Preference));
}
document.getElementById("clearPreferenceBtn").addEventListener("click", (e) => {
  e.preventDefault();
  Preference = {};
  localStorage.setItem("dinoPreferences", JSON.stringify(Preference));
}); // will clear all your Preference

document
  .getElementById("localStorageToggler")
  .addEventListener("click", (e) => {
    let localPreference = JSON.parse(localStorage.getItem("dinoPreferences"));

    if (localPreference) {
      if (localPreference.fontSize) {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
              action: "fontSize",
              fontSize: localPreference.fontSize,
            });
          }
        );
      }
      if (localPreference.fontStyle) {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
              action: "fontStyle",
              fontStyle: localPreference.fontStyle,
            });
          }
        );
      }
      if (localPreference.image === false) {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
              action: "image",
            });
          }
        );
      }
      if (localPreference.image === true) {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
              action: "imageAdd",
            });
          }
        );
      }
      if (localPreference.backgroundColor) {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
              action: "backgroundColor",
              backgroundColor: localPreference.backgroundColor,
            });
          }
        );
      }
      if (localPreference.backgroundColor === false) {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
              action: "revert-background-color",
            });
          }
        );
      }
      if (localPreference.zoomVal) {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
              action: "zoomPage",
              zoomValue: localPreference.zoomVal,
            });
          }
        );
      }
      if (localPreference.paraHighlight === true) {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
              action: "para-highlighter",
            });
          }
        );
      }
      if (localPreference.paraHighlight === false) {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
              action: "para-highlighter-remove",
            });
          }
        );
      }
      if (localPreference.linkHighlight === true) {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
              action: "link-highlight",
            });
          }
        );
      }
      if (localPreference.borderHighlight === true) {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
              action: "link-border-highlight",
            });
          }
        );
      }
      if (localPreference.linkHighlight === false) {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
              action: "link-highlight-remove",
            });
          }
        );
      }
    }
  });
