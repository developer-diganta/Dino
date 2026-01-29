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
