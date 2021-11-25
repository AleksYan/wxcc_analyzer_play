// ==UserScript==
// @name         Play recording from Analyzer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  play recording from analyzer
// @author       Aleksey Yankovskyy ayankovs@cisco.com
// @match        https://analyzer.wxcc-eu1.cisco.com/analyzer/view/visualization?*
// @icon         https://www.google.com/s2/favicons?domain=cisco.com
// @grant        none
// ==/UserScript==

(function() {

    setTimeout(()=>main(), 3000);
   
})();

function main(){
var AudioButtonOn = document.createElement('button');
var AudioButtonOff = document.createElement('button');
AudioButtonOn.innerText = 'Play On';
AudioButtonOn.setAttribute('id','999');
AudioButtonOn.addEventListener('click', enablePlayButton);
AudioButtonOff.innerText = 'Play Off';
AudioButtonOff.setAttribute('id','999');
AudioButtonOff.addEventListener('click', disablePlayButton);
var bar = document.getElementsByClassName('navbar navbar-transparent navbar-absolute theme-bg-color mat-toolbar mat-toolbar-single-row');
bar[0].appendChild(AudioButtonOn);
//bar[0].appendChild(AudioButtonOff);

function enablePlayButton(){
var styles = `
/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
`
var styleSheet = document.createElement("style")
styleSheet.type = "text/css"
styleSheet.innerText = styles
document.head.appendChild(styleSheet)

document.body.innerHTML = document.body.innerHTML.replace(/([0-9a-z]{32})/g, '<button class="play" id=$1>▷</button> <span style="color:green; font-weight: bold">In</span> $1');
document.body.innerHTML = document.body.innerHTML.replace(/([0-9A-Z]{32})/g, '<button class="play" id=$1>▷</button> <span style="color:blue; font-weight: bold">Out</span> $1');
document.body.innerHTML = document.body.innerHTML.replace(/([0-9A-Z-]{36})/g, '<button class="play" id=$1>▷</button> <span style="color:red; font-weight: bold">CB</span> $1');

var buttons = document.getElementsByClassName('play');
for (let b of buttons){b.addEventListener('click',()=>play(b.id))}

function play(sessionId){

	var modalDiv = document.createElement('div');
	modalDiv.classList.add('modal');
	modalDiv.setAttribute('id','123')
	modalDiv.innerHTML = `<div class="modal-content">    <span class="close">&times;</span>    <audio controls> <source src="https://portal.wxcc-eu1.cisco.com/jbui/playCallRecord/${sessionId}/false/Stereo3.mp3" />	</audio>  </div>`


	document.body.appendChild(modalDiv);

	console.log(sessionId);
	var modal = document.getElementById('123');
	modal.style.display = "block";

	var span = document.getElementsByClassName("close")[0];
	span.onclick = function() {modal.style.display = "none";
	modal.remove();
	}

	window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
	modal.remove();
  }
}
}




}
}

function disablePlayButton(){

};
