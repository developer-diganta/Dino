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
      else if (action === 'fontStyle') {
        console.log(request.fontStyle);
        document.getElementsByTagName('body')[0].setAttribute('id', 'fonter');
        const html = document.querySelector('#fonter');

        if(request.fontStyle === 'Trebuchet MS') {
          html.style.setProperty('font-family', 'Castellar, Trebuchet MS, sans-serif');
        }
        else if(request.fontStyle === 'Arial') {
          html.style.setProperty('font-family', 'Arial, sans-serif');
        }
        else if(request.fontStyle === 'Baskerville') {
          html.style.setProperty('font-family', 'Baskerville, serif');
        }
        else if(request.fontStyle === 'Calibri') {
          html.style.setProperty('font-family', 'Calibri, sans-serif');
        }
        else if (request.fontStyle === 'Garamond') {
          html.style.setProperty('font-family', 'Garamond, serif');
        }
        else if(request.fontStyle === 'Verdana') {
          html.style.setProperty('font-family', 'Verdana, sans-serif');
        }
      }
      else if (action === 'image') {
        const immgs = document.getElementsByTagName('img');
        for (let i = 0; i < immgs.length; i++) {
          immgs[i].style.setProperty('display', 'none');
        }
      }
    }
  );
},false);



