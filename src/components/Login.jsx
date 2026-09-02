import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            const authResponse = await api.login({ usernameOrEmail, password });
            login(authResponse);
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="auth-page">
            <h2>Log in</h2>
            <form className="habit-form" onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="usernameOrEmail">Username or email</label>
                    <input
                        id="usernameOrEmail"
                        type="text"
                        value={usernameOrEmail}
                        onChange={(e) => setUsernameOrEmail(e.target.value)}
                        autoFocus
                    />
                </div>
                <div className="field">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p className="form-error">{error}</p>}
                <button type="submit" disabled={submitting}>
                    {submitting ? 'Logging in…' : 'Log in'}
                </button>
            </form>
            <p>No account? <Link to="/register">Register</Link></p>
        </div>
    );
}