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
const crapsRollDiceAnimationContainer = "craps-roll-animation-container";


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

function rollDice() {
    const diceRollElement = document.getElementById(crapsRollDiceAnimationContainer);
    
    // Clear previous dice
    diceRollElement.innerHTML = "";

    // Roll two dice
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;

    // Display dice visually
    diceRollElement.innerHTML = `
        <div style="font-size: 2.5rem; margin-top: 10px;">
            🎲 ${die1} &nbsp; 🎲 ${die2}
        </div>
    `;

    // Process result (update rounds, money, etc.)
    processDiceResult([die1, die2]);
}

function processDiceResult(diceResult) {
    console.log("Dice rolled:", diceResult);

    // Increment rounds
    currentRounds++;
    setRounds(currentRounds);

    // Check if user won based on EVEN/ODD
    const total = diceResult[0] + diceResult[1];
    const isEven = total % 2 === 0;

    if ((isEven && currentBet === Bets.even) || (!isEven && currentBet === Bets.odd)) {
        // Player wins
        currentMoney += currentBetAmount;
        alert(`You rolled ${total} and won $${currentBetAmount}!`);
    } else {
        // Player loses
        currentMoney -= currentBetAmount;
        alert(`You rolled ${total} and lost $${currentBetAmount}!`);
    }

    setMoney(currentMoney);

    // Re-enable dice button (if hidden)
    document.getElementById(crapsRollDiceButton).style.display = "block";
}
