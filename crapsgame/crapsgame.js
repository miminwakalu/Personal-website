// Craps Main Data
let crapsUsername = ""

// Craps Game Settings
const crapsStartingMoney = 1000
const startingRounds = 0
const Bets = {
  even: "EVEN",
  odd: "ODD"
}


// HTML Element IDs
const crapsUsernameInput = "craps-username-input"
const crapsRegistrationPane = "craps-registration-pane"
const crapsMainSection = "craps-main-section"
const crapsStatsUsername = "craps-stats-username"
const crapsStatsMoney = "craps-stats-money"
const crapsStatsRounds = "craps-stats-rounds"

// In-game variables
let currentMoney = StartingMoney
let currentRounds = startingRounds
let currentBet = Bets.even

function registerCrapsPlayer() {
  crapsUsername = document.getElementById(crapsUsernameInput).value

  // Username validation
  let usernameRegex = /^(?![0-9])[A-Za-z0-9_]{5,}$/

  if (!usernameRegex.test(crapsUsername)) {
    alert("Username must be at least 5 characters long, alphanumeric and underscore only, no spaces, and cannot start with a number.")
    return
  }

  removeRegistrationPane()
  showMainGameSection()
  setupFirstRound()
}

function removeRegistrationPane() {
  document.getElementById(crapsRegistrationPane).style.display = "none"
}

function showMainGameSection() {
  document.getElementById(crapsMainSection).style.display = "block"
}

function setupFirstRound() {
  document.getElementById(crapsStatsUsername).innerHTML = crapsUsername
  currentMoney = startingMoney
  currentRounds = startingRounds
  setMoney(currentMoney)
  setRounds(currentRounds)
  betEven()
}

function setMoney(money) {
  document.getElementById(crapsStatsMoney).innerHTML = money
}

function setRounds(rounds) {
  document.getElementById(crapsStatsRounds).innerHTML = rounds
}

function betEven() {
  chooseBet(Bets.even)
}

function betOdd() {
  chooseBet(Bets.odd)
}

function chooseBet(bet) {
  currentBet = bet
  document.getElementById(bet).style.backgroundColor = "red"
  const deselectBet = bet == bets.even ? bets.odd : bets.even
  document.getElementById(deselectBet).style.backgroundColor = "transparent"
}