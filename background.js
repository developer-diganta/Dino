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