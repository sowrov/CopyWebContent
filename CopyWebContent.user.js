// ==UserScript==
// @name         CopyWebContent
// @namespace    https://github.com/sowrov/CopyWebContent
// @version      0.2
// @description  A Script to copy all the content sections of a webpage, press Ctrl+shift+c to copy
// @author       Sowrov
// @copyright    2020+, Sowrov
// @license      GPL-3.0-or-later; http://www.gnu.org/licenses/gpl-3.0.txt
// @homepage     https://github.com/sowrov/CopyWebContent
// @supportURL   https://github.com/sowrov/CopyWebContent/issues
// @icon         https://raw.githubusercontent.com/sowrov/CopyWebContent/master/icon/copy32x32.png
// @include      *
// @require      https://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

    function executeCopyRich (text) {
        function listener(e) {
            e.clipboardData.setData("text/html", text);
            e.clipboardData.setData("text/plain", text);
            e.preventDefault();
        }
        document.addEventListener("copy", listener);
        document.execCommand("copy");
        document.removeEventListener("copy", listener);
    }
  
  
    function process() {
        console.log("process: Ctrl+Shift+c");
        var str = "";
        $( "[class*='content']" ).each(function(i,ele) {
            console.log(ele.className);
            var text = ele.innerHTML;
            str += text;
        });
        executeCopyRich(str);
    }
  
  (function() {
      'use strict';
      let keysPressed = {};
      document.addEventListener('keydown', (event) => {
          switch(event.key) {
              case "Control":
              case "Shift":
                  console.log("down "+event.key);
                  keysPressed[event.key] = true;
              break;
          }
      });
  
      document.addEventListener('keyup', (event) => {
          switch(event.key) {
              case "Control":
              case "Shift":
                  console.log("up "+event.key);
                  keysPressed[event.key]=false;
              break;
          }
  
          switch(event.code) {
              case "KeyC":
                  if(keysPressed["Control"] && keysPressed["Shift"]) {
                      process();
                  }
              break;
          }
      });
  
  
  })();
  