import './LogIn.css'

window.addEventListener('load', () : void => {
    fetchUsers();
});

interface userApiResponse {
    data: users[];
}

interface users {
    userId: number;
    username: string;
    password: string;
}

async function fetchUsers(): Promise<users[]> {
    try {
        const response = await fetch("https://kisczu4vrd.execute-api.eu-north-1.amazonaws.com/menu/users");
        if (!response.ok) {
            throw new Error('Error fetching API');
        } else {
            const result: userApiResponse = await response.json();
            console.log(result);
            return result.data;
        }
    } catch (error) {
        console.log(error);
        return [];
    }
}

function LogInComp() {
    return (
        <>
            <section className="login-section">
                <h1 className="login-section-title">Login</h1>
                <aside className="login-section-inputs">
                    <input type="text" placeholder='username' className="username-input" />
                    <input type="text" placeholder='password' className="password-input" />
                </aside>
                <button className="login-btn">Logga in</button>
            </section>
        </>
    )
}

export default LogInComp