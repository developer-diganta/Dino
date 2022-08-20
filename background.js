const fontBtns = document.getElementsByClassName('fontSize');
for (let i = 0; i < fontBtns.length; i++) {
    fontBtns[i].addEventListener('click', function (e) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "fontSize", fontSize: e.target.innerText});
        });
    }
    )
}
const fontStyleBtns = document.getElementsByClassName('fontStyle');
for (let i = 0; i < fontStyleBtns.length; i++) {
    fontStyleBtns[i].addEventListener('click', function (e) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "fontStyle", fontStyle: e.target.innerText});
        }
        )
    }
    )
}

const images = document.getElementsByClassName('img-remmover');
for(let i = 0; i < images.length; i++) {
    images[i].addEventListener('click', function (e) {
        console.log("clicked")
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "image"});
        }
        )
    }
    )
}

const textToSpeech = document.getElementsByClassName('text-to-speech');
for (let i = 0; i < textToSpeech.length; i++) {
    textToSpeech[i].addEventListener('click', function (e) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "text-to-speech"});
        }
        )
    }
    )
}

const links = document.getElementsByClassName('link');
for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function (e) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "link-highlight"});
        }
        )
    })
};

const imageReader = document.getElementsByClassName('img-read');
for (let i = 0; i < imageReader.length; i++) {
    imageReader[i].addEventListener('click', function (e) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "image-reader"});
        }
        )
    }
    )
}

const backgroundColorChanger = document.getElementById('backgroundColorChanger');
backgroundColorChanger.addEventListener('submit', function (e) {
    e.preventDefault();
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "backgroundColor", backgroundColor: e.target.color.value});
    });
});

document.getElementsByClassName("revert-background-color")[0].addEventListener('click', function (e) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "revert-background-color" });
    })
});

// backgroundColorChanger.addEventListener('submit', function (e) {
//     e.preventDefault();
//     console.log("1242121");
//     // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     //     chrome.tabs.sendMessage(tabs[0].id, { action: "backgroundColor", backgroundColor: backgroundColorChanger.color.value });
//     // }
//     // )
// });
