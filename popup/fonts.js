// Font Size
const fontBtns = document.getElementsByClassName("fontSize");
for (let i = 0; i < fontBtns.length; i++) {
    fontBtns[i].addEventListener("click", function (e) {
        Preference.fontSize = e.target.innerText;
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "fontSize",
                fontSize: e.target.innerText,
            });
        });
    });
}

// Font Family Change
const fontChange = document.querySelector("#fontChange")
fontChange.addEventListener("change", function (e) {

    const elements = document.getElementsByTagName("*")
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const selectedFont = e.target.value

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
        else if (selectedFont == "Default") {
            element.style.fontFamily = "";

        }

    }
})

// Font Style
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

// Font Color
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

document
    .getElementsByClassName("revert-Font-color")[0]
    .addEventListener("click", function (e) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "revert-Font-color",
            });
        });
    });
