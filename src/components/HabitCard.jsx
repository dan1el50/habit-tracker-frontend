import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

export default function HabitCard({ habit }) {
    const navigate = useNavigate();
    const [currentStreak, setCurrentStreak] = useState(null);
    const [doneToday, setDoneToday] = useState(false);
    const [marking, setMarking] = useState(false);
    const [error, setError] = useState(null);

    async function loadData() {
        try {
            const [statsData, entriesData] = await Promise.all([
                api.getStats(habit.id),
                api.getEntries(habit.id),
            ]);
            setCurrentStreak(statsData.currentStreak);
            const todayStr = new Date().toISOString().slice(0, 10);
            setDoneToday(entriesData.some((e) => e.completedDate === todayStr));
        } catch (err) {
            setError(err.message);
        }
    }

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [habit.id]);

    async function handleMarkDone(e) {
        e.stopPropagation(); // don't trigger the card's navigate-to-detail click
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

    return (
        <article
            className="habit-card-compact"
            onClick={() => navigate(`/habits/${habit.id}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigate(`/habits/${habit.id}`)}
        >
            <h3>{habit.name}</h3>

            <div className="habit-card-compact-footer">
                <span className="current-streak">
                    <strong>{currentStreak ?? '–'}</strong> day streak
                </span>
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
                        'Complete'
                    )}
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