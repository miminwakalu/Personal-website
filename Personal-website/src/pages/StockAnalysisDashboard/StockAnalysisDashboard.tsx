import { useState } from "react"
import { analyzeStock } from "../../stockAnalysisService";

function StockAnalysisDashboard() {

    const [stockData, setStockData] = useState(null)
    const [stockSymbol, setStockSymbol] = useState("")

    async function runStockAnalysis() {
        if (!stockSymbol.trim()) {
            alert("Please enter a stock symbol")
            return
        }

        try {
            const data = await analyzeStock(stockSymbol)
            setStockData(data)
        } catch (error) {
            console.error("Error fetching stock data:", error)
            alert("Something went wrong. Please try again.")
        }
    }

    if (stockData) {
        return (
            <div>
                <button onClick={() => setStockData(null)}>Back</button>
                <pre>{JSON.stringify(stockData, null, 2)}</pre>
            </div>
        )
    }

    return (
        <div>
            <div id="stock-analysis-dashboard-title">
                Stock Analysis Dashboard
            </div>

            <div id="stock-analysis-dashboard-input-subtitle">
                Put in a stock symbol you'd like to analyze (e.g. AAPL, MSFT, GOOGL)
            </div>

            <input
                value={stockSymbol}
                onChange={(e) => setStockSymbol(e.target.value)}
                placeholder="Enter stock symbol"
            />

            <button
                className="stock-analysis-dashboard-button"
                onClick={runStockAnalysis}
            >
                Analyze
            </button>
        </div>
    )
}

export default StockAnalysisDashboard
