import { useEffect } from 'react';
import HabitForm from './HabitForm';

export default function AddHabitModal({ onCreate, onClose }) {
    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key === 'Escape') onClose();
        }
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Add habit">
                <div className="modal-header">
                    <h2>New habit</h2>
                    <button className="modal-close" onClick={onClose} aria-label="Close">
                        ×
                    </button>
                </div>
                <HabitForm onCreate={onCreate} />
            </div>
        </div>
    );
}