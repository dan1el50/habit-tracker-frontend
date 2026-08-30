const MILESTONES = [1, 3, 5, 7, 14, 30, 60, 90, 180, 360];

export default function MilestonesBox({ longestStreak }) {
    return (
        <div className="milestones-box">
            <h3>Milestones</h3>
            <div className="milestones-grid">
                {MILESTONES.map((days) => {
                    const unlocked = longestStreak >= days;
                    return (
                        <div
                            key={days}
                            className={`milestone ${unlocked ? 'unlocked' : ''}`}
                            title={unlocked ? `${days}-day streak reached` : `${days}-day streak`}
                        >
                            <TrophyIcon unlocked={unlocked} />
                            <span className="milestone-days">{days}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function TrophyIcon({ unlocked }) {
    return (
        <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill={unlocked ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.6"
        >
            <path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0V4z" />
            <path d="M7 5H4a1 1 0 0 0-1 1 4 4 0 0 0 4 4M17 5h3a1 1 0 0 1 1 1 4 4 0 0 1-4 4" />
        </svg>
    );
}