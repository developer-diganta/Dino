let Preference = {};
function saveSettings(settings) {
  chrome.storage.sync.set({ accessibilitySettings: settings });
}

function loadSettings(callback) {
  chrome.storage.sync.get(["accessibilitySettings"], function (result) {
    const defaultSettings = {
      fontSize: "16px",
      highContrast: false,
      highlightLinks: false
    };

    callback(result.accessibilitySettings || defaultSettings);
  });
}
