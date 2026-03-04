import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import About from "./pages/About/About";
import CrapsGame from "./pages/CrapsGame/CrapsGame";
import Quotes from "./pages/Quotes/Quotes";
import StockAnalysisDashboard from "./pages/StockAnalysisDashboard/StockAnalysisDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/craps" element={<CrapsGame />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/stocks" element={<StockAnalysisDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;