import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';


import AddPlayList from '../components/AddPlayList';
import PlayListRow from '../components/PlayListRow';


export default function Playlist({ tracks, setQueue, setCurrentTrack }) {
    const [isOpen, setIsOpen] = useState(false);
    const [playlists, setPlaylists] = useState([]);

    function toggleModal() {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        axiosInstance.get('/playlist')
            .then(({ data }) => setPlaylists(data));
    }, []);

    function handlePlayListPlay(id) {
        const [playlist] = playlists.filter((pl) => pl.id === id);
        const queuetracks = tracks.filter((track) => playlist.saved_tracks.includes(track.id))
        console.log(queuetracks);
        setCurrentTrack(queuetracks.pop());
        setQueue(queuetracks);
        console.log(queuetracks);

    }

    return (
        <>
            <button type='button' onClick={toggleModal}> add Playlist</button>
            <AddPlayList isOpen={isOpen} toggleModal={toggleModal} />
            {playlists.map((playlist, ix) => (
                <PlayListRow key={ix} playlist={playlist} handlePlayListPlay={handlePlayListPlay} />
            ))}
        </>
    )
}
