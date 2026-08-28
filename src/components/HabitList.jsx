import HabitCard from './HabitCard';

export default function HabitList({ habits, onDeleted }) {
    if (habits.length === 0) {
        return (
            <div className="empty-state">
                <p>No habits yet.</p>
                <p className="empty-sub">Add one above to start your first chain.</p>
            </div>
        );
    }

    return (
        <div className="habit-list">
            {habits.map((habit) => (
                <HabitCard key={habit.id} habit={habit} onDeleted={onDeleted} />
            ))}
        </div>
    );
}