"use strict";

function getCoords(elem) {
  var box = elem.getBoundingClientRect();
  return {
    top: box.top + window.pageYOffset,
    right: box.right + window.pageXOffset,
    bottom: box.bottom + window.pageYOffset,
    left: box.left + window.pageXOffset
  };
}

var billInput = document.getElementById('bill');
var peopleInput = document.getElementById('peopleNumber');
var customPercent = document.getElementById('customPercent');
var resetButton = document.getElementById('reset');
var message = document.createElement("span");
message.className = "error";
message.innerHTML = "Can't be 0";
customPercent.addEventListener('click', function () {
  document.querySelector("input[type='radio']:checked").checked = false;
});
var form = document.querySelector("form");
form.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    var data = new Promise(function (resolve, reject) {
      var bill = +billInput.value;
      var percent = +customPercent.value || +document.querySelector("input[type='radio']:checked").value;
      var people = +peopleInput.value;

      if (people === 0) {
        reject(new Error("People can't be 0"));
      } else {
        peopleInput.classList.remove("invalid-input");
        message.remove();
        resolve([bill, percent, people]);
      }
    });
    data.then(function (values) {
      var tip = document.getElementById('tipAmount');
      var total = document.getElementById('total');
      tip.innerHTML = "$".concat((values[0] * values[1] / (values[2] * 100)).toFixed(2));
      total.innerHTML = "$".concat((values[0] * (values[1] / 100 + 1) / values[2]).toFixed(2));
      var reset = document.getElementById('reset');
      reset.disabled = false;
    }, function () {
      var label = document.querySelector("label[for='peopleNumber']");
      var coords = getCoords(label);
      message.style.top = coords.top + "px";
      message.style.right = coords.right + 20 + "px";
      form.appendChild(message);
      peopleInput.classList.add("invalid-input");
      peopleInput.value = "";
    });
  }
});
resetButton.addEventListener("click", function () {
  billInput.value = "";
  peopleInput.value = "";
  customPercent.value = "";
  resetButton.disabled = true;
  var tip = document.getElementById('tipAmount').innerHTML = "$0.00";
  var total = document.getElementById('total').innerHTML = "$0.00";
  document.querySelector("input[type='radio']:checked").checked = false;
});