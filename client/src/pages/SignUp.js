import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function SignUp({ setIsAuth, setUsername }) {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [formUsername, setFormUsername] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const signupData = {
      username: formUsername,
      email: email,
      password: pwd
    }
    await fetch("http://0.0.0.0:8000/register/", {
      headers: {
        'Content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(signupData),
    }).then((res) => res.json()).then((data) => {
      localStorage.setItem("access_token", data.token);
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
          type="text"
          value={formUsername}
          onChange={(e) => setFormUsername(e.target.value)}
          id="username"
          required
        />
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
          SignUp
        </button>
      </form>
    </>
  )
}
