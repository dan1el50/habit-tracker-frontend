import { useEffect, useState } from 'react';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';
import HabitGrid from './HabitGrid';
import AddHabitModal from './AddHabitModal';

export default function Dashboard() {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const { user, logout } = useAuth();

    useEffect(() => {
        api.getHabits()
            .then(setHabits)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    async function handleCreate(data) {
        const newHabit = await api.createHabit(data);
        setHabits((prev) => [...prev, newHabit]);
        setModalOpen(false);
    }

    return (
        <>
            <header className="app-header">
                <div className="app-header-top">
                    <div>
                        <h1>Chain</h1>
                        <p className="tagline">Every day is a bead. Don't drop the thread.</p>
                    </div>
                    <div className="user-menu">
                        {user && <span className="user-name">{user.name}</span>}
                        <button className="logout-btn" onClick={logout}>Log out</button>
                    </div>
                </div>
            </header>

            <button className="add-habit-btn" onClick={() => setModalOpen(true)}>
                + Add habit
            </button>

            {loading && <p className="loading">Loading habits…</p>}
            {error && <p className="form-error">{error}</p>}
            {!loading && !error && <HabitGrid habits={habits} />}

            {modalOpen && (
                <AddHabitModal onCreate={handleCreate} onClose={() => setModalOpen(false)} />
            )}
        </>
    );
}