import React,{useEffect} from 'react';


const AudioTimer = ({ isRunning,
    setIsRunning,
    elapsedTime,
    setElapsedTime, }) => {

    useEffect(() => {
        let intervalId;
        if (isRunning) {
            // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
            intervalId = setInterval(() => setElapsedTime(elapsedTime + 1), 10);
        }
        return () => clearInterval(intervalId);
    }, [isRunning, elapsedTime]);

    //  calculation
//    const hours = Math.floor(elapsedTime / 360000);
    const minutes = Math.floor((elapsedTime % 360000) / 6000);
    const seconds = Math.floor((elapsedTime % 6000) / 100);
 //   const milliseconds = elapsedTime % 100;

    return (
        <div className=" text-[15px] mt-4 font-semibold m-1 " >
            <div className="time">
                {minutes.toString().padStart(2, "0")}:
                <span className=" w-[23px] inline-block "> {seconds.toString().padStart(2, "0")}</span>
                
            </div>
        </div>
    );
};

export default AudioTimer;