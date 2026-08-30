import { useState } from 'react';

export default function HabitForm({ onCreate }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!name.trim()) {
            setError('Give the habit a name.');
            return;
        }
        setSubmitting(true);
        setError(null);
        try {
            await onCreate({ name, description, frequency: 'DAILY' });
            setName('');
            setDescription('');
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form className="habit-form" onSubmit={handleSubmit}>
            <div className="field">
                <label htmlFor="name">Habit name</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                />
            </div>
            <div className="field">
                <label htmlFor="description">Description (optional)</label>
                <input
                    id="description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="field">
                <label htmlFor="frequency">Frequency</label>
                <select id="frequency" value="DAILY" disabled>
                    <option value="DAILY">Daily</option>
                </select>
            </div>
            {error && <p className="form-error">{error}</p>}
            <button type="submit" disabled={submitting}>
                {submitting ? 'Adding…' : 'Add habit'}
            </button>
        </form>
    );
}