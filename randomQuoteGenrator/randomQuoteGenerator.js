document.addEventListener("DOMContentLoaded", () => {
  const randomQuoteGeneratorElement = document.getElementById('random-quote-generator');

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

  function getNewRandomQuote() {
    fetch('https://api.quotable.io/random')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const colorCombo = getRandomColorCombo();

        randomQuoteGeneratorElement.style.background =
          `linear-gradient(135deg, ${colorCombo[0]}, ${colorCombo[1]})`;

        // ✅ Quotable API fields
        document.getElementById('random-quote-text').innerText = data.content;
        document.getElementById('random-quote-author').innerText = `— ${data.author}`;
      })
      .catch(error => {
        console.error(error);
        alert('There was a problem getting a new quote!');
      });
  }

  // ✅ Load first quote automatically
  getNewRandomQuote();

  // ✅ Attach click event safely
  document
    .getElementById("new-random-quote")
    .addEventListener("click", getNewRandomQuote);
});
