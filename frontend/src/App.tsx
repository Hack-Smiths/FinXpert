import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import the App.tsx of each module
import CreditApp from "./modules/credit/App";
import EdtechApp from "./modules/edtech/App";
import GoalApp from "./modules/goal/App";
import InvestmentApp from "./modules/investment/App";
import DashboardApp from "./modules/dashboard/App";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Home Page - Pick a module</div>} />
        <Route path="/credit/*" element={<CreditApp />} />
        <Route path="/edtech/*" element={<EdtechApp />} />
        <Route path="/goal/*" element={<GoalApp />} />
        <Route path="/investment/*" element={<InvestmentApp />} />
        <Route path="/dashboard/*" element={<DashboardApp />} />
      </Routes>
    </Router>
  );
}

export default App;
