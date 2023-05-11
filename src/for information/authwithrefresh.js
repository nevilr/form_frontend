import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://example.com/api";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${API_URL}/auth/login`, { email, password })
            .then(response => {
                localStorage.setItem("accessToken", response.data.accessToken);
                localStorage.setItem("refreshToken", response.data.refreshToken);
                axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.accessToken}`;
            })
            .catch(error => console.log(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input type="email" value={email} onChange={event => setEmail(event.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={event => setPassword(event.target.value)} />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}

axios.interceptors.request.use(
    config => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem("refreshToken");
            return axios.post(`${API_URL}/auth/refresh`, { refreshToken })
                .then(response => {
                    localStorage.setItem("accessToken", response.data.accessToken);
                    axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.accessToken}`;
                    return axios(originalRequest);
                })
                .catch(error => {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    delete axios.defaults.headers.common["Authorization"];
                    window.location.reload();
                    return Promise.reject(error);
                });
        }
        return Promise.reject(error);
    }
);

function App() {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            setAuthenticated(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setAuthenticated(false);
        delete axios.defaults.headers.common["Authorization"];
    };

    return (
        <div>
            {authenticated ? (
                <div>
                    <p>You are logged in.</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <LoginForm />
            )}
        </div>
    );
}

export default App;
