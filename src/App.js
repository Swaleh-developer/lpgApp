
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StockInput from './components/StockInput';
import Dashboard from './components/Dashboard';
import IODemo from './components/IODemo';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 text-white p-4">
          <h1 className="text-2xl font-bold">LPG Gas Distribution System</h1>
        </nav>
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<StockInput />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <IODemo />
        </div>
      </div>
    </Router>
  );
}

export default App;