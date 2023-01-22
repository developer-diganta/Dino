const synth = window.speechSynthesis;

window.addEventListener(
  "load",
  function load(event) {
    window.removeEventListener("load", load, false);
    chrome.runtime.onMessage.addListener(function (
      request,
      sender,
      sendResponse
    ) {
      let backColor = "";
      let fontColor = "";
      let originalLineHeight = 1;

      const action = request.action;
      if (action === "fontSize") {
        const fontSize = request.fontSize;
        const html = document.querySelector("html");
        html.style.fontSize = fontSize;
      } else if (action === "fontStyle") {
        console.log(request.fontStyle);
        document.getElementsByTagName("body")[0].setAttribute("id", "fonter");
        const html = document.querySelector("#fonter");

        if (request.fontStyle === "Trebuchet MS") {
          html.style.setProperty(
            "font-family",
            "Castellar, Trebuchet MS, sans-serif"
          );
        } else if (request.fontStyle === "Arial") {
          html.style.setProperty("font-family", "Arial, sans-serif");
        } else if (request.fontStyle === "Baskerville") {
          html.style.setProperty("font-family", "Baskerville, serif");
        } else if (request.fontStyle === "Calibri") {
          html.style.setProperty("font-family", "Calibri, sans-serif");
        } else if (request.fontStyle === "Garamond") {
          html.style.setProperty("font-family", "Garamond, serif");
        } else if (request.fontStyle === "Verdana") {
          html.style.setProperty("font-family", "Verdana, sans-serif");
        } else if (request.fontStyle === "Georgia") {
          html.style.setProperty("font-family", "Georgia", "serif");
        } else if (request.fontStyle === "Times New Roman") {
          html.style.setProperty("font-family", "Times New Roman", "serif");
        } else if (request.fontStyle === "Helvetica") {
          html.style.setProperty("font-family", "Helvetica", "sans-serif");
        } else if (request.fontStyle === "Monaco") {
          html.style.setProperty("font-family", "Monaco", "Monospace");
        }
      } else if (action === "image") {
        const immgs = document.getElementsByTagName("img");
        for (let i = 0; i < immgs.length; i++) {
          immgs[i].style.setProperty("display", "none");
        }
      } else if (action === "imageAdd") {
        const immgs = document.getElementsByTagName("img");
        for (let i = 0; i < immgs.length; i++) {
          immgs[i].style.setProperty("display", "block");
        }
      } else if (action === "text-to-speech") {
        if (synth.speaking) {
          synth.cancel();
        }
        const text = document.getElementsByTagName("body")[0].innerText;
        const msg = new SpeechSynthesisUtterance(text);
        msg.rate = request.rate;
        synth.speak(msg);
      } else if (action === "text-to-speech-selected") {
        if (synth.speaking) {
          synth.cancel();
        }
        let txt = "";
        if (window.getSelection) {
          txt = window.getSelection();
        } else if (window.document.getSelection) {
          txt = window.document.getSelection();
        } else if (window.document.selection) {
          txt = window.document.selection.createRange().text;
        }
        const msg = new SpeechSynthesisUtterance(txt.toString());
        msg.rate = request.rate;
        synth.speak(msg);
      } else if (action === "stop-speech") {
        if (synth.speaking) {
          synth.cancel();
        }
      } else if (action === "link-highlight") {
        const links = document.getElementsByTagName("a");
        for (let i = 0; i < links.length; i++) {
          links[i].style.setProperty("background-color", "blue");
          links[i].style.setProperty("fontSize", "24px");
        }
      } else if (action === "link-border-highlight") {
        const b_links = document.getElementsByTagName("a");
        for (let i = 0; i < b_links.length; i++) {
          b_links[i].style.setProperty("border", "2px solid red");
        }
      } else if (action === "link-highlight-remove") {
        const links = document.getElementsByTagName("a");
        for (let i = 0; i < links.length; i++) {
          links[i].style.setProperty("background-color", "transparent");
          links[i].style.setProperty("fontSize", "default");
          links[i].style.setProperty("border", "none");
        }
      } else if (action === "image-reader") {
        const images = document.getElementsByTagName("img");
        console.log(images);
        for (let i = 0; i < images.length; i++) {
          images[i].addEventListener("mouseover", function (e) {
            console.log("here");
            console.log(images[i].alt);
            const msg = new SpeechSynthesisUtterance(images[i].alt);
            window.speechSynthesis.speak(msg);
          });

          images[i].addEventListener("mouseleave", function (e) {
            window.speechSynthesis.cancel();
          });
        }
      } else if (action === "backgroundColor") {
        backColor === ""
          ? (backColor =
              document.getElementsByTagName("body")[0].style.backgroundColor)
          : null;
        document
          .getElementsByTagName("body")[0]
          .style.setProperty("background-color", request.backgroundColor);
      } else if (action === "revert-background-color") {
        document
          .getElementsByTagName("body")[0]
          .style.setProperty("background-color", backColor);
      } else if (action === "fontColor") {
        console.log(request.fontColor);
        fontColor === ""
          ? (fontColor = document.getElementsByTagName("*")[0].style.fontColor)
          : null;
        const all = document.getElementsByTagName("*");
        for (let i = 0; i < all.length; i++) {
          all[i].style.setProperty("color", request.fontColor);
        } }
        else if (action === "revert-Font-color") {
          const all = document.getElementsByTagName("*")[0];
          all.style.setProperty("color", fontColor);
            
      }
       else if (action === "para-highlighter") {

        const paras1 = document.getElementsByTagName("p");
        const paras2 = document.getElementsByTagName("div");
        const paras = [...paras1, ...paras2];
        for (let i = 0; i < paras.length; i++) {
          paras[i].style.setProperty("border", "2px solid orange");
        }
      } else if (action === "para-highlighter-remove") {
        const paras1 = document.getElementsByTagName("p");
        const paras2 = document.getElementsByTagName("div");
        const paras = [...paras1, ...paras2];
        for (let i = 0; i < paras.length; i++) {
          paras[i].style.setProperty("border", "none");
        }
      } else if (action === "para-highlighter-background") {
        var instance = new Mark(document.querySelector("body"));
        var RegExp = /./;
        instance.markRegExp(RegExp, {});
      } else if (action === "para-highlighter-background-remove") {
        var context = document.querySelector("body");
        var instance = new Mark(context);
        instance.unmark();
      } else if (action === "select-text") {
        const word = window.getSelection().toString();
        if (word !== "") {
          sendResponse({ data: word.replace(/ .*/, "") });
        } else {
          sendResponse({});
        }
      } else if (action === "zoomPage") {
        document.body.style.zoom = request.zoomValue;
      } else if (action === "italics-remove") {
        const italics = document.getElementsByTagName("i");
        for (let i = 0; i < italics.length; i++) {
          italics[i].style.setProperty("font-style", "normal");
          italics[i].style.setProperty("font-weight", "bold");
        }
      } else if (action === "underscore-remove") {
        const underscore = document.getElementsByTagName("u");
        const links = document.getElementsByTagName("a");
        for (let i = 0; i < underscore.length; i++) {
          underscore[i].style.setProperty("font-style", "normal");
          underscore[i].style.setProperty("font-weight", "bold");
          underscore[i].style.setProperty("text-decoration", "none");
        }
        for (let i = 0; i < links.length; i++) {
          links[i].style.setProperty("text-decoration", "none");
        }
      } else if (action === "reset_italics_underscore") {
        const italics = document.getElementsByTagName("i");
        const underscore = document.getElementsByTagName("u");
        const links = document.getElementsByTagName("a");
        for (let i = 0; i < italics.length; i++) {
          italics[i].style.removeProperty("font-style", "normal");
          italics[i].style.removeProperty("font-weight", "bold");
        }
        for (let i = 0; i < underscore.length; i++) {
          underscore[i].style.removeProperty("font-style", "normal");
          underscore[i].style.removeProperty("font-weight", "bold");
          underscore[i].style.removeProperty("text-decoration", "none");
        }
        for (let i = 0; i < links.length; i++) {
          links[i].style.removeProperty("text-decoration", "none");
        }
      }
      else if(action=="convertCase"){
        document.getElementsByTagName("body")[0].style.setProperty("text-transform",request.payload);
        console.log(request.payload)
      }
    });
  },
  false
);
