import { useEffect, useState } from 'react';
import { api } from '../api';
import StreakChain from './StreakChain';

export default function HabitCard({ habit, onDeleted }) {
    const [stats, setStats] = useState(null);
    const [entries, setEntries] = useState([]);
    const [error, setError] = useState(null);
    const [marking, setMarking] = useState(false);
    const [deleting, setDeleting] = useState(false);

    async function loadData() {
        try {
            const [statsData, entriesData] = await Promise.all([
                api.getStats(habit.id),
                api.getEntries(habit.id),
            ]);
            setStats(statsData);
            setEntries(entriesData);
        } catch (err) {
            setError(err.message);
        }
    }

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [habit.id]);

    async function handleMarkDone() {
        setMarking(true);
        setError(null);
        try {
            await api.markDone(habit.id);
            await loadData();
        } catch (err) {
            setError(err.message);
        } finally {
            setMarking(false);
        }
    }

    async function handleDelete() {
        if (!confirm(`Delete "${habit.name}"? This removes its whole history.`)) return;
        setDeleting(true);
        try {
            await api.deleteHabit(habit.id);
            onDeleted(habit.id);
        } catch (err) {
            setError(err.message);
            setDeleting(false);
        }
    }

    const todayStr = new Date().toISOString().slice(0, 10);
    const doneToday = entries.some((e) => e.completedDate === todayStr);

    return (
        <article className="habit-card">
            <div className="habit-card-header">
                <div>
                    <h3>{habit.name}</h3>
                    {habit.description && <p className="habit-desc">{habit.description}</p>}
                </div>
                <button
                    className={`done-btn ${doneToday ? 'done' : ''}`}
                    onClick={handleMarkDone}
                    disabled={marking || doneToday}
                >
                    {doneToday ? (
                        <>
                            <CheckIcon /> Done
                        </>
                    ) : marking ? (
                        'Marking…'
                    ) : (
                        'Mark done'
                    )}
                </button>
            </div>

            <StreakChain entries={entries} />

            <div className="habit-card-footer">
                <div className="streak-numbers">
                    <span><strong>{stats?.currentStreak ?? '–'}</strong> current</span>
                    <span><strong>{stats?.longestStreak ?? '–'}</strong> best</span>
                </div>
                <button className="delete-btn" onClick={handleDelete} disabled={deleting} aria-label="Delete habit">
                    <TrashIcon />
                </button>
            </div>

            {error && <p className="form-error">{error}</p>}
        </article>
    );
}

function CheckIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}

function TrashIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
    );
}