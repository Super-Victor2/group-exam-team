import { Link } from 'react-router-dom';
import './RegisterComp.css'
import { useState } from 'react';

interface UserApiResponse {
    data: Users;
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

async function RegisterUser(user: sendUser): Promise<Users> {
    try {
        console.log("Registering user:", user.username, user.password);

        const response = await fetch('https://kisczu4vrd.execute-api.eu-north-1.amazonaws.com/menu/users/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error('Error fetching API');
        } else {
            const result: UserApiResponse = await response.json()
            console.log(result)
            return result.data;
        }
    } catch (error) {
        console.error('Error registrating user!:', error);
        throw error;
    }
}

function RegisterComp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (!username || !password) {
            alert('Please enter both username and password');
            return;
        }

        const user: sendUser = {
            username,
            password,
            role: "user",
        };

        RegisterUser(user);
    };

    return (
        <>
            <section className="login-section">
                <h1 className="login-section-title">Signup</h1>
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
                </aside>
                <Link to={'/LogInPage'}><button className="login-btn" onClick={handleLogin}>Logga in</button></Link>
            </section>
        </>
    );
}

export default RegisterComp