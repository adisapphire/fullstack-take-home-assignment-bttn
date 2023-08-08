import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  NavLink
} from "react-router-dom";

import styles from "./App.module.css";
import logo from "./assets/logo.svg";


import AudioPlayer from "./components/AudioPlayer";
import User from "./components/User";
import PlayListDetail from "./components/PlayListDetail";

import Home from "./pages/Home";
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Playlist from "./pages/Playlist"
import Error404 from "./pages/Error404";




function App() {
  const accessToken = localStorage.getItem("access_token");
  const [currentTrack, setCurrentTrack] = useState();
  const [isMusicEnd, setIsMusicEnd] = useState(false);
  const [queue, setQueue] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [isAuth, setIsAuth] = useState(!!(accessToken && username && accessToken !== 'null' && username !== 'null'));


  useEffect(() => {
    console.log(username, isAuth);
    if (accessToken && username && accessToken !== 'null' && username !== 'null') {
      setIsAuth(true);
    }
  }, [setIsAuth, username, accessToken, isAuth]);



  useEffect(() => {
    fetch("http://0.0.0.0:8000/tracks/", { mode: "cors" })
      .then((res) => res.json())
      .then((data) => {
        setTracks(data);
        setQueue(data);
      });

  }, []);

  useEffect(() => {
    if (queue.length > 0) {
      const popTrack = queue.pop();
      if (popTrack) {
        setCurrentTrack(popTrack);
      }
    }
  }, [isMusicEnd, queue]);




  return (
    <>
      <Router>
        <main className={styles.app}>
          <nav>
            <img src={logo} className={styles.logo} alt="Logo" />
            <ul className={styles.menu}>
              <li>
                <NavLink to="/" className={({ isActive }) => isActive ? styles.active : null}>
                  Tracks
                </NavLink>
              </li>
              <li>
                <NavLink to="/playlist" className={({ isActive }) => isActive ? styles.active : null}>
                  Playlists
                </NavLink>
              </li>
              {isAuth ? <li className={styles[`nav-item-right`]}>
                <User username={username} setIsAuth={setIsAuth} />
              </li> : <li className={styles[`nav-item-right`] + ' ' + styles[`auth-items`]}>
                <NavLink to="/login" className={({ isActive }) => isActive ? styles.active : null}>
                  Login
                </NavLink>
                <NavLink to="/signup" className={({ isActive }) => isActive ? styles.active : null}>
                  SignUp
                </NavLink>
              </li>}

            </ul>
          </nav>
          <Routes>
            <Route
              exact
              path="/"
              element={<Home setCurrentTrack={setCurrentTrack} tracks={tracks} setTracks={setTracks} />}
            />
            <Route
              exact
              path="/playlist"
              element={isAuth ? <Playlist tracks={tracks} setQueue={setQueue} setCurrentTrack={setCurrentTrack} /> : <Navigate to="/login" />}
            />
            <Route
              exact
              path="/login"
              element={!isAuth && <Login setIsAuth={setIsAuth} setUsername={setUsername} />}
            />
            <Route
              exact
              path="/signup"
              element={!isAuth && <SignUp setIsAuth={setIsAuth} setUsername={setUsername} />}
            />
            <Route
              exact
              path="/playlist/:id"
              element={<PlayListDetail tracks={tracks} setCurrentTrack={setCurrentTrack} />}
            />
            <Route path="*" element={<Error404 />} status={404} />
          </Routes>
        </main>
        {currentTrack && <AudioPlayer track={currentTrack} setIsMusicEnd={setIsMusicEnd} />}

      </Router>
    </>
  );
}

export default App;
