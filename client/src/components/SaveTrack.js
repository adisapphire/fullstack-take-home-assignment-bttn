import React, { useState, useEffect } from 'react'
import styles from './SaveTrack.module.css'
import Modal from 'react-modal'
import axiosInstance from '../axiosInstance';


export default function SaveTrack({ track, isOpen, toggleModal }) {
    const [playlists, setPlaylists] = useState([]);


    useEffect(() => {
        axiosInstance.get('/playlist')
            .then(({ data }) => setPlaylists(data));
    }, []);

    function toggleTrack(saved_tracks) {
        const isAlready = saved_tracks.some((st) => st === track.id);

        if (isAlready) {
            return saved_tracks.filter((st) => st !== track.id);
        } else {
            return [...saved_tracks, track.id];
        }
    }

    const updatePlaylist = async (playlist) => {
        const saved_tracks = toggleTrack(playlist.saved_tracks);

        await axiosInstance.patch(`/playlist/${playlist.id}/`, {
            saved_tracks: saved_tracks
        }).then(({ data }) => {

            playlist.saved_tracks = data.saved_tracks;
        });
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={toggleModal}
            contentLabel="My dialog"
            className={styles.mymodal}
            overlayClassName={styles.myoverlay}
            closeTimeoutMS={500}
            ariaHideApp={false}
        >
            <button onClick={toggleModal}>Close modal</button>
            {playlists.map((playlist, ix) => (
                <div key={ix}>
                    <input type={'checkbox'} checked={playlist.saved_tracks.includes(track.id)} onChange={() => updatePlaylist(playlist)} />
                    <div>{playlist.name}</div>
                </div>
            ))}

        </Modal>
    )
}
