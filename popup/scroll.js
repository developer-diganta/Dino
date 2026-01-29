const autoScrollFeature = document.getElementById('autoscroll');
let scrollerID;
let speed = 2; // 1 - Fast | 2 - Medium | 3 - Slow //default speed is medium.
let interval = speed * 5;
const slow_speed = document.getElementById('slow_btn');
const medium_speed = document.getElementById('medium_btn');
const high_speed = document.getElementById('fast_btn');

slow_speed.addEventListener("click", function (e) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "slowautoscroll", interval: 15 });
    });
})

medium_speed.addEventListener("click", function (e) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "mediumautoscroll", interval: 10 });
    });
})

high_speed.addEventListener("click", function (e) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "fastautoscroll", interval: 5 });
    });
});
