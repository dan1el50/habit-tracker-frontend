import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import HabitDetail from './components/HabitDetail';
import './App.css';

function App() {
  return (
      <div className="app">
        <header className="app-header">
          <h1>Chain</h1>
          <p className="tagline">Every day is a bead. Don't drop the thread.</p>
        </header>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/habits/:id" element={<HabitDetail />} />
        </Routes>
      </div>
  );
}

export default App;