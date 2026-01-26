
function getNewRandomQuote() {
    fetch('https://api.quotable.io/random')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ');
        }
        return response.json();
    })
    .then(data => {
        const quoteText = data.content;
        const quoteAuthor = data.author;
        document.getElementById('random-quote-text').innerText = quoteText;
        document.getElementById('random-quote-author').innerText = quoteAuthor;
    })
    .catch(error => {
        // Handle errors here
        alert('There was problem getting a new quote!');
    });
}