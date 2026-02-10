// Craps Main Data
let crapsUsername = ""

// Craps Game Settings
const crapsStartingMoney = 1000
const startingRounds = 0
const Bets = { even: "EVEN", odd: "ODD" }
const minimumBet = 100

// Dice Roll Settings
const numDiceToRoll = 2
const hideDiceDelayMs = 2000
const processDiceResultDelayMs = 1800

// HTML Element IDs
const crapsUsernameInput = "craps-username-input"
const crapsRegistrationPane = "craps-registration-pane"
const crapsMainSection = "craps-main-section"
const crapsStatsUsername = "craps-stats-username"
const crapsStatsMoney = "craps-stats-money"
const crapsStatsRounds = "craps-stats-rounds"
const crapsUserBetAmount = "craps-user-bet-amount"
const crapsRollDiceButton = "craps-roll-dice-button"
const crapsRollDiceAnimationContainer = "craps-roll-dice-animation-container"
const crapsBettingGridContainer = "craps-betting-grid-container"
const crapsRoundFinishGridContainer = "craps-round-finish-grid-container"
const crapsRoundFinishMessage = "craps-round-finish-message"
const crapsNextRoundButton = "craps-next-round-button"
const crapsNextRoundButtonDisabled = "craps-next-round-button-disabled"

// In-game variables
let currentMoney = crapsStartingMoney
let currentRounds = startingRounds
let currentBet = Bets.even
let currentBetAmount = minimumBet
let canChangeBet = true

// Show/Hide Functions
function showElement(id){document.getElementById(id).style.display="block"}
function hideElement(id){document.getElementById(id).style.display="none"}

function showRegistrationPane(){showElement(crapsRegistrationPane)}
function removeRegistrationPane(){hideElement(crapsRegistrationPane)}
function showMainGameSection(){showElement(crapsMainSection)}
function hideMainGameSection(){hideElement(crapsMainSection)}

// Registration
function registerCrapsPlayer(){
  crapsUsername=document.getElementById(crapsUsernameInput).value
  let usernameRegex=/^(?![0-9])[A-Za-z0-9_]{5,}$/
  if(!usernameRegex.test(crapsUsername)){
    alert("Username must be at least 5 characters, alphanumeric/underscore, no spaces, can't start with number.")
    return
  }
  removeRegistrationPane()
  showMainGameSection()
  setupFirstRound()
}

// Setup Rounds
function setupFirstRound(){
  document.getElementById(crapsStatsUsername).innerHTML=crapsUsername
  hideElement(crapsNextRoundButtonDisabled)
  showElement(crapsNextRoundButton)
  setMoney(crapsStartingMoney)
  setRounds(startingRounds)
  chooseBet(Bets.even)
  setBetAmount(minimumBet)
  setupNextRound()
}

function setupNextRound(){
  hideElement(crapsRollDiceAnimationContainer)
  hideElement(crapsRoundFinishGridContainer)
  showElement(crapsRollDiceButton)
  showElement(crapsBettingGridContainer)
  canChangeBet=true
  setBetAmount(minimumBet)
}

// Stats
function setMoney(m){currentMoney=m;document.getElementById(crapsStatsMoney).innerHTML=m}
function setRounds(r){currentRounds=r;document.getElementById(crapsStatsRounds).innerHTML=r}

// Bet selection
function chooseBet(bet){
  if(canChangeBet){
    currentBet=bet
    document.getElementById(bet).style.backgroundColor="red"
    const deselectBet=bet===Bets.even?Bets.odd:Bets.even
    document.getElementById(deselectBet).style.backgroundColor="transparent"
  }
}
function increaseBet(){currentBetAmount=Math.min(currentBetAmount+minimumBet,currentMoney);setBetAmount(currentBetAmount)}
function decreaseBet(){currentBetAmount=Math.max(currentBetAmount-minimumBet,minimumBet);setBetAmount(currentBetAmount)}
function setBetAmount(amount){if(canChangeBet){currentBetAmount=amount;document.getElementById(crapsUserBetAmount).innerHTML="$"+amount}}

// Dice scale on resize
window.addEventListener("resize",formatDiceScale)
function formatDiceScale(){
  const vw=window.innerWidth*0.8,vh=window.innerHeight*0.8
  const widthScale=Math.min(700,vw,vh)
  const heightScale=widthScale*0.714
  const scale=heightScale/494.6592
  const el=document.getElementById(crapsRollDiceAnimationContainer)
  if(!el){console.error("dice container not found");return}
  el.style.setProperty("--dice-scale",scale)
  el.style.width="260px"
  el.style.height="260px"
  el.style.display="block"
  el.style.opacity="1"
}

// Dice Pips
const dicePips={1:[4],2:[0,8],3:[0,4,8],4:[0,2,6,8],5:[0,2,4,6,8],6:[0,2,3,5,6,8]}

// Roll Dice
function rollDice(){
  canChangeBet=false
  showElement(crapsRollDiceAnimationContainer)
  const diceContainer=document.getElementById(crapsRollDiceAnimationContainer)
  diceContainer.innerHTML=""
  const diceResults=[]
  for(let i=0;i<2;i++){
    const roll=Math.floor(Math.random()*6)+1
    diceResults.push(roll)
    const diceDiv=document.createElement("div")
    diceDiv.classList.add("dice")
    for(let j=0;j<9;j++){
      const pipSpot=document.createElement("div")
      if(dicePips[roll].includes(j)){
        pipSpot.classList.add("pip")
        pipSpot.classList.add(Math.random()<0.5?"red":"black")
      }
      diceDiv.appendChild(pipSpot)
    }
    diceContainer.appendChild(diceDiv)
  }
  setTimeout(()=>processDiceResult(diceResults),processDiceResultDelayMs)
}

// Process Results
function processDiceResult(diceResult){
  const sum=diceResult.reduce((a,b)=>a+b,0)
  let diceSumResult=Bets.even
  if(sum%2===1)diceSumResult=Bets.odd
  setRounds(currentRounds+1)
  let message=""
  if(diceSumResult===currentBet){message="YOU WIN!";setMoney(currentMoney+currentBetAmount)}
  else{message="YOU LOSE :(";setMoney(currentMoney-currentBetAmount)}
  if(currentMoney===0){message="YOU'RE OUT!";showElement(crapsNextRoundButtonDisabled);hideElement(crapsNextRoundButton)}
  hideElement(crapsBettingGridContainer)
  showElement(crapsRoundFinishGridContainer)
  document.getElementById(crapsRoundFinishMessage).innerHTML=message
}

// Exit Game
function exitGame(){
  alert("After playing "+currentRounds+" rounds, you leave with "+currentMoney+"$")
  hideMainGameSection()
  showRegistrationPane()
  document.getElementById(crapsUsernameInput).value=""
}
