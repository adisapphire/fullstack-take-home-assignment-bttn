import React, { useEffect, useRef, useState } from 'react'
import TrackRow from './TrackRow'
import { useParams } from "react-router-dom";
import axiosInstance from '../axiosInstance';

export default function PlayListDetail({ tracks, setCurrentTrack }) {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState({});
    const saved_tracks = useRef([]);

    const handlePlay = (track) => setCurrentTrack(track);

    useEffect(() => {
        axiosInstance.get(`/playlist/${id}`)
            .then(({ data }) => setPlaylist(data))
    }, [id]);

    useEffect(() => {
        if (Object.keys(playlist).length > 0) {
            saved_tracks.current = tracks.filter((track) => playlist.saved_tracks.includes(track.id));
        }
        console.log(saved_tracks);
    }, [playlist, tracks]);

    return (
        <>
            {playlist && Object.keys(playlist).length > 0 ? <>
                <div>PlayList: {playlist.name}</div>
                {saved_tracks.current.map((track, ix) => (
                    <TrackRow key={ix} track={track} handlePlay={handlePlay} />
                ))}
            </> : <> Playlist not found </>}

        </>

    );
}
