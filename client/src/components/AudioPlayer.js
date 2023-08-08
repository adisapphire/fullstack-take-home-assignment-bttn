import React, { useRef, useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import styles from "./AudioPlayer.module.css";
import SaveTrack from "./SaveTrack";

function AudioPlayer({ track, setIsMusicEnd }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState('0:00/0:00')
  const audioRef = useRef(null);
  const [isSaveTrackOpen, setIsSaveTrackOpen] = useState(false);

  function toggleSaveTrackModal() {
    setIsSaveTrackOpen(!isSaveTrackOpen);
  }

  function formatTime(seconds) {
    seconds = Math.round(seconds);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleTimeUpdate = (e) => {
    setProgress(e.target.currentTime / e.target.duration);
    setCurrentTimeStr(`${formatTime(e.target.currentTime)}/${formatTime(e.target.duration)}`);
  };

  const handleSliderChange = (e) => {
    audioRef.current.currentTime =
      (e.target.value / 1000) * audioRef.current.duration;
  };

  const handleTogglePlaybackClick = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  const handleEnd = () => {
    setIsMusicEnd(true);
  };

  useEffect(() => {
    audioRef.current.addEventListener("play", handlePlay);
    audioRef.current.addEventListener("pause", handlePause);
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    audioRef.current.addEventListener("ended", handleEnd);

  }, []);

  useEffect(() => {
    audioRef.current.play();
    audioRef.current.currentTime = 0;
  }, [track]);

  return (
    <>
      <audio src={track.audio} ref={audioRef} />
      <div className={styles.audioPlayer}>
        <button
          className={styles.togglePlaybackButton}
          onClick={handleTogglePlaybackClick}
        >
          {isPlaying ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 5H7V19H10V5ZM17 5H14V19H17V5Z"
                fill="#000"
              />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 12L8 5V19L20 12Z" fill="#000" />
            </svg>
          )}
        </button>
        <div className={styles.trackInfo}>
          <div className={styles.trackTitle}>{track.title}</div>
          <div className={styles.trackArtist}>
            {track.main_artists.join(", ")}
          </div>

        </div>
        <FaPlus onClick={toggleSaveTrackModal} />
        <SaveTrack track={track} isOpen={isSaveTrackOpen} toggleModal={toggleSaveTrackModal} />
        <div className={styles.sliderContainer}>
          <input
            type="range"
            min="1"
            max="1000"
            value={progress * 1000}
            className={styles.slider}
            onChange={handleSliderChange}
          />
        </div>
        <div>{currentTimeStr}</div>
      </div>
    </>
  );
}

export default AudioPlayer;
