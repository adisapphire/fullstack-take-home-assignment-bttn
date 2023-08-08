import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./TrackRow.module.css";
import styles2 from "./PlayListRow.module.css";

function PlayListRow({ playlist, handlePlayListPlay }) {
    return (
        <div className={styles.trackRow}>
            <button className={styles.trackPlay} onClick={() => handlePlayListPlay(playlist.id)}>
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M20 12L8 5V19L20 12Z" fill="white" />
                </svg>
            </button>
            <NavLink to={`/playlist/${playlist.id}`} className={styles2.navlink}>
                <div className={styles.trackInfo}>
                    <div className={styles.trackTitle}>{playlist.name}</div>
                </div>
            </NavLink>

        </div>
    );
}

export default PlayListRow;
