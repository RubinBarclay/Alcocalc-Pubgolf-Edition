/*
NOTES

BAC = (Alco in g / (weight in g * gender)) * 100

Alco grams = (8 * ml * ABV) / 1000

Equalizer = total alco * percentage increase
*/

var settings = {};
var variables = {};
var users = [];

// GAME SETTINGS
function getSettings() {
  settings = {
    size: document.querySelector("#chug-size").value,
    percent: document.querySelector("#percentage").value,
    alcGr:
      (8 *
        document.querySelector("#chug-size").value *
        document.querySelector("#percentage").value) /
      1000,
    equalizer: document.querySelector("#min-equalizer").value,
  };
}

// Set button event listener
document.querySelector("#set").addEventListener("click", getSettings);

// USER INPUT / CALCULATE
function calculate() {
  // Weight in grams (kg * 1000)
  let weight = document.querySelector("#weight").value * 1000;

  // male 0.68, female 0.55
  function gender() {
    var elem = document.getElementsByName("gender");

    for (i = 0; i < elem.length; i++) {
      if (elem[i].checked) {
        return elem[i].value;
      }
    }
  }

  variables = {
    name: document.querySelector("#user").value,
    bac: (settings.alcGr / (weight * gender())) * 100,
  };

  // Sorting users (heaviest to lightest)
  users.push(variables);
  users.sort((a, b) => {
    return a.bac - b.bac;
  });

  // Reseting and calculating ranking
  var old_tbody = document.querySelector("tbody");
  var new_tbody = document.createElement("tbody");
  for (let i = 0; i < users.length; i++) {
    var row = new_tbody.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = i + 1;
    cell2.innerHTML = users[i].name;

    // Calculating Custom Equalizer Shot
    /*
    var percInc = users[users.length - 1].bac / users[i].bac;
    var totalSpirit = settings.alcGr / ((8 * 1 * 40) / 1000); // total spirit in ml found in chug drink
    var customShot = (totalSpirit + settings.equalizer) * percInc - totalSpirit; // 40 is ml worth of
*/
    var percInc = users[users.length - 1].bac / users[i].bac;
    var totalSpirit = settings.alcGr / ((8 * 1 * 40) / 1000); // total spirit in ml found in chug drink
    var customShot =
      (totalSpirit + Number(settings.equalizer)) * percInc - totalSpirit; // 40 is ml worth of

    cell3.innerHTML = customShot.toString().slice(0, 4) + "ml";
  }

  old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
}

document.querySelector("#calculate").addEventListener("click", calculate);
