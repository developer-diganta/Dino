// Images
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

const imageReader = document.getElementsByClassName('img-read');
for (let i = 0; i < imageReader.length; i++) {
    imageReader[i].addEventListener("click", function (e) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "image-reader" });
        });
    });
}

// Links
const links = document.getElementsByClassName("link");
for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function (e) {
        Preference.linkHighlight = true;
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "link-highlight" });
        });
    });
}

const removeLinkHighlight = document.getElementsByClassName("remove-link-hg");
for (let i = 0; i < links.length; i++) {
    removeLinkHighlight[i].addEventListener('click', function (e) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "link-highlight-remove" });
        }
        )
    })
};

// Borders
const show_borders = document.getElementsByClassName("border");
for (let i = 0; i < show_borders.length; i++) {
    show_borders[i].addEventListener("click", function (e) {
        Preference.borderHighlight = true;
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "link-border-highlight" });
        });
    });
}

// Paragraph Highlighting
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

// Magnifier / Zoom
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

// Remove Emphasis (Italics/Underline)
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

// Case Converter
document.getElementById("upper-case-btn").addEventListener("click", function () {
    convertCase("uppercase");
});
document.getElementById("lower-case-btn").addEventListener("click", function () {
    convertCase("lowercase");
});

function convertCase(caseType) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "convertCase", payload: caseType });
    });
}
