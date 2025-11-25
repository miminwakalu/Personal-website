// Craps Main Data
let crapsUsername = ""

// Craps Game Settings
const crapsStartingMoney = 1000
const startingRounds = 0

// HTML Element IDs
const crapsUsernameInput = "craps-username-input"
const crapsRegistrationPane = "craps-registration-pane"
const crapsMainSection = "craps-main-section"
const crapsStatsUsername = "craps-stats-username"
const crapsStatsMoney = "craps-stats-money"
const crapsStatsRounds = "craps-stats-rounds"

function registerCrapsPlayer() {
  crapsUsername = document.getElementById("craps-username-input"). value

// Username validation check
  let firstCharIsDigitRegex = /^[0-9]/g | /[^a-zA-Z0-9_]/g
  if (crapsUsername.length < 5 || firstCharIsDigitRegex.test(crapsUsername)) {
  alert("Username must be at least 5 characters long, alphanumeric and underscore only, no spaces,and cannot start with a number.")
  } else {
  removeRegistrationPane()
  showMainGameSection()
  setupFirstRound()
  }
}

function removeRegistrationPane () {
document.gotElementById(crapsRegistrationPane).style.display = "none"
}

function showMainGameSection () {
document.gotElementById(crapsMainSection).style.display = "block"
}

function setupFirstRound() {
document.getElementById(crapsStatsUsername).innerText = crapsUsername
setMoney(startingMoney)
setRounds(startingRounds)
}

function setMoney (money) {
document.getElementById(crapsStatsMoney).innerText = money
}

function setRounds (rounds) {
document.getElementById(crapsStatsRounds).innerText = rounds
}