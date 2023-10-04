import React, { useState, useRef, useEffect } from 'react'
import { BsArrowLeftShort } from "react-icons/bs"
import { BsArrowRightShort } from "react-icons/bs"
import { FaPlay } from "react-icons/fa"
import { FaPause } from "react-icons/fa"

const AudioPlayer = ( { src } ) => {
  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // references
  const audioPlayer = useRef();   // reference our audio component
  const progressBar = useRef();   // reference our progress bar
  const animationRef = useRef();  // reference the animation

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  }

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying)
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  }

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  }

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
    setCurrentTime(progressBar.current.value);
  }

  const backThirty = () => {
    progressBar.current.value = Number(progressBar.current.value - 30);
    changeRange();
  }

  const forwardThirty = () => {
    progressBar.current.value = Number(progressBar.current.value + 30);
    changeRange();
  }

  return (
    <div className="items-center flex w-[500px] border-2 border-black rounded-[15px] shadow-custom ">
      <audio ref={audioPlayer} src={src} preload="metadata"></audio>
      <button className="bg-none border-none flex items-center font-mono text-[16px] cursor-pointer hover:text-gray-700" onClick={backThirty}><BsArrowLeftShort /> 30</button>
      <button onClick={togglePlayPause} className= "bg-transparent border-none rounded-[50%] w-[75px] h-[75px] text-[32px] text-[#ffd200] flex justify-center items-center">
        {isPlaying ? <FaPause /> : <FaPlay className="relative left-[5px]" />}
      </button>
      <button className="bg-none border-none flex items-center font-mono text-[16px] cursor-pointer hover:text-gray-700" onClick={forwardThirty}>30 <BsArrowRightShort /></button>

      {/* current time */}
      <div className='flex items-center'>
      <div className="ml-[25px] font-mono text-[16px]">{calculateTime(currentTime)}</div>

      {/* progress bar */}
      <div>
        <input type="range" className="progressBar" defaultValue="0" ref={progressBar} onChange={changeRange} />
      </div>

      {/* duration */}
      <div className="font-mono text-[16px] ml-[25px]">{(duration && !isNaN(duration)) && calculateTime(duration)}</div>
      </div>
    </div>
  )
}

export default AudioPlayer;