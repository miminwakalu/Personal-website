document.addEventListener("DOMContentLoaded", () => {
  const randomQuoteGeneratorElement =
    document.getElementById('random-quote-generator');

  const colors = [
    ["#FF8080", "#FFCF96"],
    ["#FFF3DA", "#D0BFFF"],
    ["#96E6B3", "#FFDD94"],
    ["#84D2FF", "#FFB3C6"],
    ["#B28DFF", "#FF9EEB"],
    ["#B7B7B7", "#EDC6B1"],
    ["#FFABAB", "#FFC3A0"],
    ["#FFD700", "#FFA500"],
    ["#FF69B4", "#FFB6C1"],
    ["#FFB6C1", "#FF69B4"],
    ["#FFD700", "#FFA500"],
    ["#FF69B4", "#FFB6C1"],
  ];

  function getRandomColorCombo() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  async function getNewRandomQuote() {
    try {
      console.log("GETTING DATA");

      const response = await fetch('https://api.quotable.io/random');

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      const colorCombo = getRandomColorCombo();

      randomQuoteGeneratorElement.style.background =
        `linear-gradient(135deg, ${colorCombo[0]}, ${colorCombo[1]})`;

      document.getElementById('random-quote-text').innerText = data.content;
      document.getElementById('random-quote-author').innerText = `— ${data.author}`;

    } catch (error) {
      console.error(error);
      alert('There was a problem getting a new quote!');
    }
  }

  // ✅ Load first quote
  getNewRandomQuote();

  // ✅ Button click
  document
    .getElementById("new-random-quote")
    .addEventListener("click", getNewRandomQuote);
});
