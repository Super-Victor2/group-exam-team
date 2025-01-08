import { useState } from 'react';
import './LogIn.css';

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
}

async function postUserToDb(user: sendUser): Promise<void> {
    try {
        console.log("Added user:", user.username, user.password);

        const response = await fetch('https://kisczu4vrd.execute-api.eu-north-1.amazonaws.com/menu/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            const result = await response.json();
            throw new Error(result.error || 'Error posting user');
        } else {
            const result: UserApiResponse = await response.json();
            console.log('User added successfully:', result);
        }
    } catch (error) {
        console.log('Error in sending user:', error);
    }
}

function LogInComp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (!username || !password) {
            alert('Please enter both username and password.');
            return;
        }

        const user: sendUser = {
            username,
            password,
        };

        postUserToDb(user);
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
                        type="password"
                        placeholder="password"
                        className="password-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </aside>
                <button className="login-btn" onClick={handleLogin}>Logga in</button>
            </section>
        </>
    );
}

export default LogInComp;
