const synth = window.speechSynthesis;

const html = document.querySelector("html");
const body = document.querySelector("body");
const links = document.querySelectorAll("a");
const images = document.querySelectorAll("img");

// Extract style manipulation into separate functions
function setFontSize(fontSize) {
    console.log("Font Size");
    html.style.fontSize = fontSize;
}

function setFontStyle(fontStyle) {
    body.style.fontFamily = fontStyle;
}

function hideImages() {
    images.forEach(image => image.style.display = "none");
}

function showImages() {
    images.forEach(image => image.style.display = "block");
}

function readOutImages() {
    const images = document.getElementsByTagName("img");

    for (let i = 0; i < images.length; i++) {
        images[i].addEventListener("mouseover", speakAltText);
        images[i].addEventListener('mouseleave', speakAltText);
    }

    const msg = new SpeechSynthesisUtterance();

    function speakAltText(event) {
        if (event.type === 'mouseover') {
            msg.text = event.target.alt;
            window.speechSynthesis.speak(msg);
        } else {
            window.speechSynthesis.cancel();
        }
    }
}

function highlightLinks() {
    links.forEach(link => {
        link.style.backgroundColor = "yellow";
        link.style.fontSize = "24px";
    });
}

function removeLinkHighlights() {
    links.forEach(link => {
        link.style.backgroundColor = "transparent";
        link.style.fontSize = "default";
    });
}

function imageReader() {
    images.forEach(image => {
        image.addEventListener("mouseover", function(e) {
            console.log(image.getAttribute("alt"));
            const alt = image.getAttribute("alt");
            if (synth.speaking) {
                synth.cancel();
            }
            const msg = new SpeechSynthesisUtterance(alt);
            synth.speak(msg);
        });
    });
}


function highlightParagraphs() {
    const paras1 = document.getElementsByTagName("p");
    const paras2 = document.getElementsByTagName("div");
    const paras = [...paras1, ...paras2];
    for (let i = 0; i < paras.length; i++) {
        paras[i].style.setProperty("border", "2px solid yellow");
    }
}

function removeParagraphHighlight() {
    const paras1 = document.getElementsByTagName("p");
    const paras2 = document.getElementsByTagName("div");
    const paras = [...paras1, ...paras2];
    for (let i = 0; i < paras.length; i++) {
        paras[i].style.setProperty("border", "none");
    }
}

// Added a single event listener for different types of events
window.addEventListener("load", () => {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        const action = request.action;
        switch (action) {
            case "fontSize":
                setFontSize(request.fontSize);
                break;
            case "fontStyle":
                setFontStyle(request.fontStyle);
                break;
            case "image":
                hideImages();
                break;
            case "imageAdd":
                showImages();
                break;
            case "text-to-speech":
                const text = body.innerText;
                if (synth.speaking) {
                    synth.cancel();
                }
                const msg = new SpeechSynthesisUtterance(text);
                msg.rate = request.rate;
                synth.speak(msg);
                break;
            case "link-highlight":
                highlightLinks();
                break;
            case "link-highlight-remove":
                removeLinkHighlights();
                break;
            case "image-reader":
                imageReader();
                break;
            case "read-image":
                imageReader();
                break;
            case "para-highlighter":
                highlightParagraphs();
                break;
            case "para-highlighter-remove":
                removeParagraphHighlight();
                break;
            default:
                console.log("Invalid action");
                break;
        }
    });
});