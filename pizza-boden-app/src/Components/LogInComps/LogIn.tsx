import { useState } from 'react';
import './LogIn.css';
import { Link } from 'react-router-dom';

interface UserApiResponse {
    user: Users;
}

interface Users {
    userId: string;
    items: sendUser[];
}

interface sendUser {
    username: string;
    password: string;
    role: string;
}

async function LoginUser(user: sendUser): Promise<void> {
    try {
        console.log("Logging in user:", user.username, user.password);

        const response = await fetch('https://kisczu4vrd.execute-api.eu-north-1.amazonaws.com/menu/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });

        const result = await response.json();

        if (response.ok && result?.data?.token) {
            console.log('Login successful:', result);
            saveTokenToSessionStorage(result.data.token);
            alert("Du är nu inloggad!")
        } else {
            throw new Error(result?.error || 'Error during login');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}

const saveTokenToSessionStorage = (token: string) => {
    try {
        sessionStorage.setItem('token', token);
        console.log('Token saved to sessionStorage:', token);
    } catch (error) {
        console.error('Error saving token to sessionStorage:', error);
    }
};

function LogInComp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleLogin = () => {
        if (!username || !password || !role) {
            alert('Please enter both username, password and role.');
            return;
        }

        

        const user: sendUser = {
            username,
            password,
            role,
        };

        LoginUser(user);
    };

    return (
        <>
            <section className="login-section">
                <h1 className="login-section-title">Login</h1>
                <aside className="login-section-inputs">
                    <input
                        type="text"
                        placeholder="username"
                        className="username-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="password"
                        className="password-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="role"
                        className="role-input"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    />
                </aside>
                <p className="no-account-text">Har du inget konto?</p>
                <Link to={'/RegisterPage'}>Klicka här</Link>
                <button className="login-btn" onClick={handleLogin}>Logga in</button>
            </section>
        </>
    );
}

export default LogInComp;