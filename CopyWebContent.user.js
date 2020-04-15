// ==UserScript==
// @name         CopyWebContent
// @namespace    https://github.com/sowrov/CopyWebContent
// @version      0.1
// @description  A Script to copy the content section of a webpage
// @author       Sowrov
// @copyright    2020+, Sowrov
// @license      GPL-3.0-or-later; http://www.gnu.org/licenses/gpl-3.0.txt
// @homepage     https://github.com/sowrov/CopyWebContent
// @supportURL   https://github.com/sowrov/CopyWebContent/issues
// @icon         https://raw.githubusercontent.com/sowrov/CopyWebContent/master/icon/copy.png
// @include      *
// @require      https://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

function executeCopy (text) {
    let input = document.createElement('textarea')
    document.body.appendChild(input)
    input.value = text
    input.select()
    document.execCommand('copy')
    input.remove()
  }
  
  
  function process() {
      console.log("process: Ctrl+Shift+c");
      $( "[class*='content']" ).each(function(i,ele) {
          var text = ele.innerHTML;
          executeCopy(text);
      });
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
  