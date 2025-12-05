// Craps Main Data
let crapsUsername = ""

// Craps Game Settings
const crapsStartingMoney = 1000
const startingRounds = 0
const Bets = {
  even: "EVEN",
  odd: "ODD"
}
const minimumBet = 100

// HTML Element IDs
const crapsUsernameInput = "craps-username-input"
const crapsRegistrationPane = "craps-registration-pane"
const crapsMainSection = "craps-main-section"
const crapsStatsUsername = "craps-stats-username"
const crapsStatsMoney = "craps-stats-money"
const crapsStatsRounds = "craps-stats-rounds"
const crapsUserBetAmount = "craps-user-bet-amount"
const crapsRollDiceButton = "craps-roll-dice-button"
const crapsRollDiceAnimationContainer = "craps-roll-dice-animation-container";


// In-game variables
let currentMoney = crapsStartingMoney
let currentRounds = startingRounds
let currentBet = Bets.even
let currentBetAmount = minimumBet

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
  currentMoney = crapsStartingMoney
  currentRounds = startingRounds
  setMoney(currentMoney)
  setRounds(currentRounds)
  chooseBet(Bets.even)
  setBetAmount(minimumBet)
}

function setMoney(money) {
  document.getElementById(crapsStatsMoney).innerHTML = money
}

function setRounds(rounds) {
  document.getElementById(crapsStatsRounds).innerHTML = rounds
}

function chooseBet(bet) {
  currentBet = bet

  // highlight selected
  document.getElementById(bet).style.backgroundColor = "red"

  // remove highlight from the other one
  const deselectBet = bet === Bets.even ? Bets.odd : Bets.even
  document.getElementById(deselectBet).style.backgroundColor = "transparent"
}

function increaseBet() {
  currentBetAmount = Math.min(currentBetAmount + minimumBet, currentMoney)
  setBetAmount(currentBetAmount)
}

function decreaseBet() {
  currentBetAmount = Math.max(currentBetAmount - minimumBet, minimumBet)
  setBetAmount(currentBetAmount)
}

function setBetAmount(betAmount) {
  currentBetAmount = betAmount
  document.getElementById(crapsUserBetAmount).innerHTML = "$" + betAmount
}

function formatDiceScale() {
  // compute scale the same way you did, but set it as a CSS variable so CSS transform picks it up
  const vw = window.innerWidth * 0.8;
  const vh = window.innerHeight * 0.8;
  const widthScale = Math.min(700, vw, vh);
  const heightScale = widthScale * 0.714;
  const scale = heightScale / 494.6592;

  const el = document.getElementById(crapsRollDiceAnimationContainer);
  if (!el) {
    console.error('formatDiceScale: dice container not found: ', crapsRollDiceAnimationContainer);
    return;
  }
  // set CSS var for transform scale
  el.style.setProperty('--dice-scale', scale);
  // also ensure it has explicit width/height while debugging
  el.style.width = '260px';
  el.style.height = '260px';
  // make sure it's visible
  el.style.display = 'block';
  el.style.opacity = '1';
}

// Pip layout positions (3×3 grid)
const dicePips = {
    1: [4],
    2: [0, 8],
    3: [0, 4, 8],
    4: [0, 2, 6, 8],
    5: [0, 2, 4, 6, 8],
    6: [0, 2, 3, 5, 6, 8]
};

function rollDice() {
    const diceContainer = document.getElementById("craps-roll-dice-animation-container");
    diceContainer.innerHTML = ""; // clear previous dice

    const diceResults = [];

    for (let i = 0; i < 2; i++) {

        // Generate random value
        const roll = Math.floor(Math.random() * 6) + 1;
        diceResults.push(roll);

        // Create dice element
        const diceDiv = document.createElement("div");
        diceDiv.classList.add("dice");

        // Build the pip grid
        for (let j = 0; j < 9; j++) {
            const pipSpot = document.createElement("div");

            if (dicePips[roll].includes(j)) {
                pipSpot.classList.add("pip");

                // randomly choose red or black pip
                if (Math.random() < 0.5) {
                    pipSpot.classList.add("red");
                } else {
                    pipSpot.classList.add("black");
                }
            }

            diceDiv.appendChild(pipSpot);
        }

        diceContainer.appendChild(diceDiv);
    }

    processDiceResult(diceResults);
}

function processDiceResult(diceResult) {
    const total = diceResult.reduce((a, b) => a + b, 0);
    console.log("Dice:", diceResult, "Total:", total);
}
