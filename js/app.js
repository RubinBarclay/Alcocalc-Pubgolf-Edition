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
    // chug_percent: document.querySelector("#chug-percentage").value, # NOT USED
    alcGr:
      (8 *
        document.querySelector("#chug-size").value *
        document.querySelector("#chug-percentage").value) /
      1000,
    equalizer: document.querySelector("#min-equalizer").value,
    eq_percent: document.querySelector("#eq-percentage").value,
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
    var totalSpirit = settings.alcGr / ((8 * 1 * settings.eq_percent) / 1000); // total spirit in ml found in chug drink
    var customShot =
      (totalSpirit + Number(settings.equalizer)) * percInc - totalSpirit; // 40 is ml worth of

    cell3.innerHTML = customShot.toString().slice(0, 4) + "ml";
  }

  old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
}

document.querySelector("#calculate").addEventListener("click", calculate);

// TOGGLE MODAL
function showModal() {
  let modal = document.querySelector(".modal-wrapper");
  modal.style.display = "block";

  let main = document.querySelector("main");
  main.classList.add("blur");
}

function hideModal() {
  let modal = document.querySelector(".modal-wrapper");
  modal.style.display = "none";

  let main = document.querySelector("main");
  main.classList.remove("blur");
}

// MODAL FUNCTION
function calculatePercent() {
  let liquorPercent = document.querySelector("#liquor-percentage").value / 100;
  let liquorVolume = document.querySelector("#liquor-volume").value;
  let totalDrinkVolume = document.querySelector("#total-volume").value;

  // (liqPerc(0.x) * liqVol(ml)) / totalVol(ml) * 100
  let drinkPercentage =
    ((liquorPercent * liquorVolume) / totalDrinkVolume) * 100;

  document.querySelector("#result-percent").innerHTML =
    drinkPercentage.toFixed(1) + "%";
}

document
  .querySelector("#calculate-percent")
  .addEventListener("click", calculatePercent);
