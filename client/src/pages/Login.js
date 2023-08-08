import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login({ setIsAuth, setUsername }) {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const navigate = useNavigate();
    const submit = async (e) => {
        e.preventDefault();
        const loginData = {
            email: email,
            password: pwd
        }
        await fetch("http://0.0.0.0:8000/login/", {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(loginData),
        }).then((res) => res.json()).then((data) => {
            localStorage.setItem("access_token", data.access);
            localStorage.setItem("refresh_token", data.refresh);
            localStorage.setItem("username", data.user.username);
            setIsAuth(true);
            setUsername(data.user.username);
            navigate("/");
        });
    };

    return (
        <>
            <form onSubmit={submit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    required
                />
                <input
                    type="password"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    id="pwd"
                    required
                />
                <button type="submit">
                    LogIn
                </button>
            </form>
        </>
    )
}
