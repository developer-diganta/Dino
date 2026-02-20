// SAVE PREFERENCES USING chrome.storage.sync
document
  .getElementById("savePreferenceBtn")
  .addEventListener("click", savePreference);

function savePreference(e) {
  e.preventDefault();

  chrome.storage.sync.set(
    { dinoPreferences: Preference },
    function () {
      console.log("Preferences saved successfully.");
    }
  );
}

// CLEAR PREFERENCES
document
  .getElementById("clearPreferenceBtn")
  .addEventListener("click", function (e) {
    e.preventDefault();

    Preference = {};

    chrome.storage.sync.remove("dinoPreferences", function () {
      console.log("Preferences cleared.");
    });
  });

// APPLY SAVED PREFERENCES
document
  .getElementById("localStorageToggler")
  .addEventListener("click", function () {
    chrome.storage.sync.get("dinoPreferences", function (result) {
      let localPreference = result.dinoPreferences;

      if (!localPreference) return;

      chrome.tabs.query(
        { active: true, currentWindow: true },
        function (tabs) {
          const tabId = tabs[0].id;

          if (localPreference.fontSize) {
            chrome.tabs.sendMessage(tabId, {
              action: "fontSize",
              fontSize: localPreference.fontSize,
            });
          }

          if (localPreference.fontStyle) {
            chrome.tabs.sendMessage(tabId, {
              action: "fontStyle",
              fontStyle: localPreference.fontStyle,
            });
          }

          if (localPreference.image === false) {
            chrome.tabs.sendMessage(tabId, {
              action: "image",
            });
          }

          if (localPreference.image === true) {
            chrome.tabs.sendMessage(tabId, {
              action: "imageAdd",
            });
          }

          if (localPreference.backgroundColor) {
            chrome.tabs.sendMessage(tabId, {
              action: "backgroundColor",
              backgroundColor: localPreference.backgroundColor,
            });
          }

          if (localPreference.backgroundColor === false) {
            chrome.tabs.sendMessage(tabId, {
              action: "revert-background-color",
            });
          }

          if (localPreference.zoomVal) {
            chrome.tabs.sendMessage(tabId, {
              action: "zoomPage",
              zoomValue: localPreference.zoomVal,
            });
          }

          if (localPreference.paraHighlight === true) {
            chrome.tabs.sendMessage(tabId, {
              action: "para-highlighter",
            });
          }

          if (localPreference.paraHighlight === false) {
            chrome.tabs.sendMessage(tabId, {
              action: "para-highlighter-remove",
            });
          }

          if (localPreference.linkHighlight === true) {
            chrome.tabs.sendMessage(tabId, {
              action: "link-highlight",
            });
          }

          if (localPreference.linkHighlight === false) {
            chrome.tabs.sendMessage(tabId, {
              action: "link-highlight-remove",
            });
          }

          if (localPreference.borderHighlight === true) {
            chrome.tabs.sendMessage(tabId, {
              action: "link-border-highlight",
            });
          }
        }
      );
    });
  });
