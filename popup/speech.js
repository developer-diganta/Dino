// Text to Speech
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

// Dictionary
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

// Word to Speech (About Section)
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
    "TOGGLE THEME",
    extensionDescription,
    "PREFERENCES",
    "FONT SIZE",
    "FONT STYLE",
    "IMAGES",
    "LISTEN TO WEB PAGE",
    "PARAGRAPHS",
    "LINKS",
    "COLORS",
    "DICTIONARY",
    "TRANSLATE",
    "MAGNIFIER",
    "REMOVE EMPHASIS",
    "CASE CONVERTER"
];
const speakerHelper = document.getElementsByClassName("speaker");
for (let i = 0; i < speakerHelper.length; i++) {
    speakerHelper[i].addEventListener("click", function (e) {
        wordToSpeechStop(e);
        wordToSpeech(wordArray[i]);
    });
}
