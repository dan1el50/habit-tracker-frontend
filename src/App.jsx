import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import HabitDetail from './components/HabitDetail';
import './App.css';

function App() {
    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/habits/:id" element={<HabitDetail />} />
            </Routes>
        </div>
    );
}

export default App;