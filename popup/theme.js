// Background Color
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

// Modes (Dark/Light)
const modeChanger = document.getElementsByClassName(
    "modes"
);
for (let i = 0; i < modeChanger.length; i++) {

    modeChanger[i].addEventListener("click", function (e) {
        let modevalue = e.target.value;
        console.log(modevalue);
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "light-on-darkmode",
                modevalue: e.target.value,
            });
        });
    });
}

document.getElementById("checkbox").addEventListener("click", () => {
    var element = document.body;
    element.classList.toggle("dark-mode");
});


// Design Toggle (Modern vs Accessible)
const designToggleBtn = document.getElementById("designToggle");
const bodyElement = document.body;

function updateDesignState() {
    const currentDesign = localStorage.getItem("dinoDesignTheme") || "theme-modern";

    // Remove existing
    bodyElement.classList.remove("theme-modern", "theme-accessible");
    // Add saved
    bodyElement.classList.add(currentDesign);

    // Update button text
    if (currentDesign === "theme-modern") {
        designToggleBtn.innerText = "Switch to Accessible";
    } else {
        designToggleBtn.innerText = "Switch to Modern";
    }
}

// Initialize on start
updateDesignState();

designToggleBtn.addEventListener("click", () => {
    if (bodyElement.classList.contains("theme-modern")) {
        localStorage.setItem("dinoDesignTheme", "theme-accessible");
    } else {
        localStorage.setItem("dinoDesignTheme", "theme-modern");
    }
    updateDesignState();
});

// Ensure defaults if missing
if (!localStorage.getItem("dinoDesignTheme")) {
    bodyElement.classList.add("theme-modern");
}
