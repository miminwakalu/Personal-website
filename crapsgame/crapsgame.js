// HTML Element IDs
const crapsUsernameInput = "craps-username-input"
const crapsRegistrationPane = "craps-registration-pane"
const crapsMainSection = "craps-main-section"

function registerCrapsPlayer() {
  let crapsUsername = document.getElementById("craps-username-input"). value
alert("Got: " + crapsUsername)
removeRegistrationPane()
showMainGameSection()
}

function removeRegistrationPane () {
document.gotElementById(crapsRegistrationPane).style.display = "none"
}

function showMainGameSection () {
document.gotElementById(crapsMainSection).style.display = "block"
}