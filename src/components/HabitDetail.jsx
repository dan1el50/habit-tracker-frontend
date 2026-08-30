import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api';
//import StreakChain from './StreakChain';
import MilestonesBox from './MilestonesBox';

export default function HabitDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [habit, setHabit] = useState(null);
    const [stats, setStats] = useState(null);
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [marking, setMarking] = useState(false);
    const [deleting, setDeleting] = useState(false);

    async function loadData() {
        try {
            const [habitData, statsData, entriesData] = await Promise.all([
                api.getHabit(id),
                api.getStats(id),
                api.getEntries(id),
            ]);
            setHabit(habitData);
            setStats(statsData);
            setEntries(entriesData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    async function handleMarkDone() {
        setMarking(true);
        setError(null);
        try {
            await api.markDone(id);
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
            await api.deleteHabit(id);
            navigate('/');
        } catch (err) {
            setError(err.message);
            setDeleting(false);
        }
    }

    if (loading) return <p className="loading">Loading…</p>;
    if (error && !habit) return <p className="form-error">{error}</p>;

    const todayStr = new Date().toISOString().slice(0, 10);
    const doneToday = entries.some((e) => e.completedDate === todayStr);
    const createdDate = new Date(habit.createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="habit-detail">
            <button className="back-link" onClick={() => navigate('/')}>
                ← All habits
            </button>

            <div className="detail-header">
                <div>
                    <h2>{habit.description || habit.name}</h2>
                    {habit.description && <p className="detail-subname">{habit.name}</p>}
                    <p className="detail-created">Started {createdDate}</p>
                </div>
                <button
                    className={`done-btn large ${doneToday ? 'done' : ''}`}
                    onClick={handleMarkDone}
                    disabled={marking || doneToday}
                >
                    {doneToday ? 'Done today' : marking ? 'Marking…' : 'Mark done'}
                </button>
            </div>

            {/* Streak chain section from the detailed habit stats page. Uncomment the import at the top of the file
                <StreakChain entries={entries}/>
             */}
            <div className="streaks-box">
                <div className="streak-stat">
                    <span className="streak-stat-value">{stats.currentStreak}</span>
                    <span className="streak-stat-label">Current streak</span>
                </div>
                <div className="streak-stat">
                    <span className="streak-stat-value">{stats.longestStreak}</span>
                    <span className="streak-stat-label">Longest streak</span>
                </div>
            </div>

            <MilestonesBox longestStreak={stats.longestStreak} />

            {error && <p className="form-error">{error}</p>}

            <button className="delete-link" onClick={handleDelete} disabled={deleting}>
                Delete habit
            </button>
        </div>
    );
}