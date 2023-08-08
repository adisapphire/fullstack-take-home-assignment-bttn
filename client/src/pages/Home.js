import TrackRow from "../components/TrackRow";
import React from "react";

function Home({ setCurrentTrack, tracks }) {
  const handlePlay = (track) => setCurrentTrack(track);

  return (
    <>
      {tracks.map((track, ix) => (
        <TrackRow key={ix} track={track} handlePlay={handlePlay} />
      ))}
    </>

  )
}

export default Home;
