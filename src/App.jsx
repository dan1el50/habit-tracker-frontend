import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import HabitDetail from './components/HabitDetail';
import Login from './components/Login';
import Register from './components/Register';
import RequireAuth from './components/RequireAuth';
import './App.css';

function App() {
    return (
        <div className="app">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />
                <Route path="/habits/:id" element={<RequireAuth><HabitDetail /></RequireAuth>} />
            </Routes>
        </div>
    );
}

export default App;