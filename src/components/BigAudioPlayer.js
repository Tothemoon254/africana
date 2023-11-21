import React, { useState, useRef, useEffect } from 'react'
import { BsArrowLeftShort } from "react-icons/bs"
import { BsArrowRightShort } from "react-icons/bs"
import { FaPlay } from "react-icons/fa"
import { FaPause } from "react-icons/fa"
import { UserAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import { StarIcon, LinkIcon } from "@chakra-ui/icons";

const BigAudioPlayer = ( {src, path, customMetadata} ) => {
  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const toast = useToast();

  // references
  const audioPlayer = useRef();   // reference our audio component
  const progressBar = useRef();   // reference our progress bar
  const animationRef = useRef(); 
 // reference the animation
 const { user } = UserAuth()
 

  useEffect(() => {
    const seconds = Math.floor(customMetadata?.duration);
    setDuration(customMetadata?.duration);
    progressBar.current.max = duration;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const audioElement = new Audio(src);

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
  const handleShareArticle = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied to clipboard",
      status: "success",
      duration: 5000,
    });
  };
  

  return (
//The path parameter is used to get the internal path of the file from storage, e.g "audio/wbvrvar" as it is significantly easier to use as a dynamic url    
    <div>
      
    <div className="flex flex-col  w-[95%] m-3  sm:w-[900px] sm:h-[300px] border-2 border-black rounded-[15px] shadow-custom justify-center  ">

      <div className='flex flex-col items-center sm:pt-3 px-7 w-[100%]  '>
        <div className='flex items-center border-2 border-black bg-blue-500'>
        <button onClick={togglePlayPause} className= "bg-transparent border-r-2 border-r-black  w-[75px] h-[75px] pr-2 text-[30px] sm:text-[45px] text-[#ffd200] flex justify-center items-center" disabled={!src}>
        {isPlaying ? <FaPause /> : <FaPlay className="  relative left-[5px]" />}
      </button>
        <div  className='font-bold text-base sm:text-3xl mt-[-20px] text-gray-900 px-5  '>
        {customMetadata?.caption}  {user?.displayName}
        </div>
      
      <audio ref={audioPlayer} src={src} type= 'audio/wav' preload="metadata"></audio>
      
      
     
      
      </div>
      {/* current time */}
    
      </div> 
       <div className='flex items-center mb-1 mx-3'>
      <div className="ml-[12px] sm:ml-[2px] font-mono text-3 sm:text-[16px]">{calculateTime(currentTime)}</div>

      {/* progress bar */}
    
        <input type="range" className="progressBar" defaultValue="0" ref={progressBar} onChange={changeRange} />
    

      {/* duration */}
      <div className="font-mono text-[16px] sm:ml-[25px]">{duration}</div> 
      
      </div>
       <div className='flex m-3 mr-1'>
            <button className="bg-blue-500 py-3 px-3 border-2 border-black shadow-custom"
                        rightIcon={<LinkIcon />}
                        onClick={handleShareArticle}
                       
                      >
                        Share
                      </button>
            </div>
    



    </div>
    </div>
  )
}

export default BigAudioPlayer;