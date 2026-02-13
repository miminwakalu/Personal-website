export async function analyzeStock() {
    const stockSymbolToAnalyze = document.getElementById(stockAnalysisDashboardInput).value
    if (stockSymbolToAnalyze.length === 0) {
        alert('You must put in a ticker symbol before running the analysis!')
        return
    }
    const url = `https://127.0.0.1:5000/analyze-stock/${stockSymbolToAnalyze}`

    const response = await fetch(url)
    if (!response.ok) {
        alert('There was a problem getting the analysis for your stock!');
    }
    const data = await response.json()
    return data
}