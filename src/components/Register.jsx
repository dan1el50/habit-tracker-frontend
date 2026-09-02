import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';

export default function Register() {
    const [form, setForm] = useState({ name: '', surname: '', username: '', email: '', password: '' });
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    function update(field) {
        return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            const authResponse = await api.register(form);
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
            <h2>Register</h2>
            <form className="habit-form" onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" value={form.name} onChange={update('name')} autoFocus />
                </div>
                <div className="field">
                    <label htmlFor="surname">Surname</label>
                    <input id="surname" type="text" value={form.surname} onChange={update('surname')} />
                </div>
                <div className="field">
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" value={form.username} onChange={update('username')} />
                </div>
                <div className="field">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" value={form.email} onChange={update('email')} />
                </div>
                <div className="field">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" value={form.password} onChange={update('password')} />
                </div>
                {error && <p className="form-error">{error}</p>}
                <button type="submit" disabled={submitting}>
                    {submitting ? 'Registering…' : 'Register'}
                </button>
            </form>
            <p>Have an account? <Link to="/login">Log in</Link></p>
        </div>
    );
}