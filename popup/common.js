let Preference = {};
// SINGLE SOURCE OF TRUTH
const defaultSettings = {
  fontSize: "16px",
  fontStyle: "normal",
  image: true,
  backgroundColor: false,
  zoomVal: 100,
  paraHighlight: false,
  linkHighlight: false,
  borderHighlight: false
};

// SAVE SETTINGS (safe version)
async function saveSettings(settings) {
  try {
    await chrome.storage.sync.set({
      dinoPreferences: settings || defaultSettings
    });
  } catch (err) {
    console.error("saveSettings failed:", err);
  }
}

// LOAD SETTINGS (safe + merged defaults)
function loadSettings(callback) {
  if (typeof callback !== "function") {
    console.error("loadSettings requires a callback function");
    return;
  }

  chrome.storage.sync.get("dinoPreferences", function (result) {
    if (chrome.runtime.lastError) {
      console.error(
        "loadSettings error:",
        chrome.runtime.lastError.message
      );
      callback(defaultSettings);
      return;
    }

    const stored = result.dinoPreferences || {};

    // Merge stored values into defaults
    const mergedSettings = {
      ...defaultSettings,
      ...stored
    };

    callback(mergedSettings);
  });
}
