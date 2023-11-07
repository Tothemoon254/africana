import React, { useState, useRef, useEffect } from 'react'
import { BsArrowLeftShort } from "react-icons/bs"
import { BsArrowRightShort } from "react-icons/bs"
import { FaPlay } from "react-icons/fa"
import { FaPause } from "react-icons/fa"
import { UserAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

const AudioPlayer = ( { src, path, customMetadata } ) => {
  // state 
  const { user } = UserAuth()
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // references
  const audioPlayer = useRef();   // reference our audio component
  const progressBar = useRef();   // reference our progress bar
  const animationRef = useRef();  // reference the animation

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
   setDuration(customMetadata?.duration);
   console.log(duration);
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
  console.log(audioPlayer)

  return (
//The path parameter is used to get th internal path of the file from storage, e.g "audio/wbvrvar" as it is significantly easier to use as a dynamic url    
    <div>
      
    <div className=" grid w-[95%] m-3 h-[90px] sm:w-[500px] sm:h-[120px] border-2 border-black rounded-[15px] shadow-custom justify-start  ">

      <div className='flex items-center sm:pt-3 px-5'>
      <audio ref={audioPlayer} src={src} type= 'audio/wav' preload="metadata"></audio>
      <button className="bg-none border-none flex items-center font-mono text-[16px] cursor-pointer hover:text-gray-700" onClick={backThirty}><BsArrowLeftShort /> 30</button>
      <button onClick={togglePlayPause} className= "bg-transparent border-none  w-[75px] rounded-[100%] border-2 h-[75px] pr-2 text-[30px] sm:text-[45px] text-[#ffd200] flex justify-center items-center" disabled={!src}>
        {isPlaying ? <FaPause /> : <FaPlay className="  relative left-[5px]" />}
      </button>
      <button className="bg-none border-none flex items-center font-mono text-[16px] cursor-pointer hover:text-gray-700" onClick={forwardThirty}>30 <BsArrowRightShort /></button>

      {/* current time */}
      <div className='flex items-center'>
      <div className="ml-[12px] sm:ml-[25px] font-mono text-3 sm:text-[16px]">{calculateTime(currentTime)}</div>
      {/* progress bar */}
    
        <input type="range" className="progressBar" defaultValue="0" ref={progressBar} onChange={changeRange} />
    

      {/* duration */}
      <div className="font-mono text-[16px] sm:ml-[25px]">{duration}</div>
      </div>
      </div>

      
      <Link to={`/${path}`}  className='font-bold text-base sm:text-xl mt-[-20px] text-gray-900 px-5'>
    {customMetadata?.caption}  {user?.displayName}
  </Link>

    </div>
    </div>
  )
}

export default AudioPlayer;