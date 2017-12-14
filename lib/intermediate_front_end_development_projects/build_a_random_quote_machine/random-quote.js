'use strict';

var xhr;
var response;
var body = document.body;
var personalizeInput = document.querySelector('#personalizeInput');
var validateInput = document.querySelector('#validateInput');
var queryStr = '';

document.querySelector('#newQuoteButton').addEventListener('click', makeRequest);

function makeRequest() {
  if (personalizeInput.value) {
    queryStr = 'https://api.whatdoestrumpthink.com/api/v1/quotes/personalized?q=' + personalizeInput.value;
    personalizeInput.remove();
  } else {
    queryStr = 'https://api.whatdoestrumpthink.com/api/v1/quotes/random';
    personalizeInput.placeholder = 'Personalize Quote...';
  }

  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = textContent;
  xhr.open('GET', queryStr);
  xhr.send(null);
}

function textContent() {
  try {
    // wait for finish to finish
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // handle data
        response = JSON.parse(xhr.responseText);
        document.getElementById('output').innerHTML = response.message;
        // add color to background and quote box
        addColor('coloredText', 'coloredButton');
      } else {
        console.log('There was a problem with the request.');
      }
    }
  } catch (e) {
    console.log('Caught Exception: ' + e);
  }
}

function randomColor() {
  var chars = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += chars[Math.floor(Math.random() * chars.length)];
  }
  return color;
}

function addColor(textClass, buttonClass) {
  var getColor = randomColor();
  // background
  body.style.backgroundColor = getColor;
  // input border
  personalizeInput.style.borderColor = getColor;
  var texts = document.getElementsByClassName(textClass);
  var buttons = document.getElementsByClassName(buttonClass);
  // text
  for (var i = 0; i < texts.length; i++) {
    texts[i].style.color = getColor;
  }
  // buttons
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].style.backgroundColor = getColor;
  }
}

makeRequest();