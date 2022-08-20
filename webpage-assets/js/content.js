window.addEventListener("load", function load(event){
    window.removeEventListener("load", load, false);
  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      const action = request.action;
      if (action === 'fontSize') {
        const fontSize = request.fontSize;
        const html = document.querySelector('html');
        html.style.fontSize = fontSize;
        console.log(html.innerText);
      }
    }
  );
},false);



