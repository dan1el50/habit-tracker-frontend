const BASE_URL = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'}/api`;

async function request(path, options = {}) {
    const res = await fetch(`${BASE_URL}${path}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
    });

    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || `Request failed: ${res.status}`);
    }

    // DELETE returns no body
    if (res.status === 204 || options.method === 'DELETE') return null;
    return res.json();
}

export const api = {
    getHabits: () => request('/habits'),
    createHabit: (data) => request('/habits', { method: 'POST', body: JSON.stringify(data) }),
    deleteHabit: (id) => request(`/habits/${id}`, { method: 'DELETE' }),
    getStats: (habitId) => request(`/habits/${habitId}/stats`),
    getEntries: (habitId) => request(`/habits/${habitId}/entries`),
    markDone: (habitId, date) =>
        request(`/habits/${habitId}/entries`, {
            method: 'POST',
            body: JSON.stringify(date ? { date } : {}),
        }),
};