import { useEffect, useState } from 'react';
import { api } from './api';
import HabitForm from './components/HabitForm';
import HabitList from './components/HabitList';
import './App.css';

function App() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getHabits()
        .then(setHabits)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
  }, []);

  async function handleCreate(data) {
    const newHabit = await api.createHabit(data);
    setHabits((prev) => [...prev, newHabit]);
  }

  function handleDeleted(id) {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  }

  return (
      <div className="app">
        <header className="app-header">
          <h1>Chain</h1>
          <p className="tagline">Every day is a bead. Don't drop the thread.</p>
        </header>

        <HabitForm onCreate={handleCreate} />

        {loading && <p className="loading">Loading habits…</p>}
        {error && <p className="form-error">{error}</p>}
        {!loading && !error && <HabitList habits={habits} onDeleted={handleDeleted} />}
      </div>
  );
}

export default App;