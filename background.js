const btns = document.getElementsByTagName('button');
for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function (e) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "fontSize", fontSize: e.target.innerText});
        });
    }
)}

console.log("hi")