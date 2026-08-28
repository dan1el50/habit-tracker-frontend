function last14Days() {
    const days = [];
    for (let i = 13; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        days.push(d.toISOString().slice(0, 10));
    }
    return days;
}

export default function StreakChain({ entries }) {
    const completedDates = new Set(entries.map((e) => e.completedDate));
    const days = last14Days();
    const todayStr = new Date().toISOString().slice(0, 10);

    return (
        <div className="streak-chain" aria-label="Last 14 days">
            {days.map((date, i) => {
                const isCompleted = completedDates.has(date);
                const isToday = date === todayStr;
                const prevDone = i > 0 && completedDates.has(days[i - 1]);
                const nextDone = i < days.length - 1 && completedDates.has(days[i + 1]);
                const isForgivenGap = !isCompleted && prevDone && nextDone;

                let className = 'bead';
                if (isCompleted) className += ' filled';
                else if (isForgivenGap) className += ' forgiven';
                if (isToday) className += ' today';

                return <span key={date} className={className} title={date} />;
            })}
        </div>
    );
}