
import React, { useState, useEffect, useRef } from "react";
import {
    ref,
    uploadBytes,
    updateMetadata,
  } from "firebase/storage";
import { CloseIcon }  from "@chakra-ui/icons"
import { storage } from "../firebase.config";
import { v4 } from "uuid";
import AudioPlayer from "./AudioPlayer"
import { useToast } from "@chakra-ui/react";





const AddVoiceNoteModal = ({ onClose }) => {



const [recording, setRecording] = useState(false);
const [audioChunks, setAudioChunks] = useState([]);
const mediaRecorder = useRef(null);
const [showModal, setShowModal] = useState(false);
const [loading, setLoading] = useState(false);
const [caption, setCaption ] = useState();
const [audioUpload, setAudioUpload] = useState(null);
const [audioUrls, setAudioUrls] = useState([]);
const toast = useToast();
const AudioListRef = ref( storage, "audio/");


const uploadFileWithMetadata = (file, caption, duration) => {
  if (file == null) return;

  // Initialize Firebase Storage
  

  // Define the file reference
  const filename = file.name + v4();
  const AudioRef = ref(storage, `audio/${filename}`);

  // Create custom metadata for the caption
  const metadata = {
    contentType: 'audio/wav', // The content type of your audio file
    customMetadata: {
      caption: caption ,
      // Your custom caption data

      // You can add more custom metadata properties here
      duration:duration
    },
  };

  // Set the custom metadata for the file
  uploadBytes(AudioRef, file, metadata)


  .then((snapshot) => {

    toast({
      title: "Uploaded!",
      status: "success",
      duration: 5000,
    });
    // The file is uploaded with the specified metadata
  })

  

    .catch((error) => {
      console.error('Error uploading file with caption:', error);
    });
};

const getAudioDuration = (audioFile) => {
  return new Promise((resolve, reject) => {
    const audioElement = new Audio();
    audioElement.onloadedmetadata = () => {
      resolve(audioElement.duration);
    };
    audioElement.onerror = (error) => {
      reject(error);
    };

    // Load the audio file
    audioElement.src = URL.createObjectURL(audioFile);
  });
};

const [start, setStart] = useState(false);
const [count, setCount] = useState(0);
const [time, setTime] = useState("00:00");
const [timeSetting, setTimeSetting] = useState({ m: 0, s: 0 });

var initTime = new Date();

const showTimer = (ms) => {
  const milliseconds = Math.floor((ms % 1000) / 10)
    .toString()
    .padStart(2, "0");
  const second = Math.floor((ms / 1000) % 60)
    .toString()
    .padStart(2, "0");
  const minute = Math.floor((ms / 1000 / 60) % 60)
    .toString()
    .padStart(2, "0");
  // const hour = Math.floor(ms / 1000 / 60 / 60).toString();
  setTime(
    // hour.padStart(2, "0") +
    // ":" +
    minute + ":" + second 
  );
};

const clearTime = () => {
  setTime("00:00:00");
  setCount(0);
};

useEffect(() => {
  if (!start) {
    return;
  }
  var id = setInterval(() => {
    var left = count + (new Date() - initTime);
    setCount(left);
    showTimer(left);
    if (left <= 0) {
      setTime("00:00:00:00");
      clearInterval(id);
    }
  }, 1);
  return () => clearInterval(id);
}, [start]);


const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);
    setStart(true);

    mediaRecorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setAudioChunks((chunks) => [...chunks, event.data]);
      }
    };

    mediaRecorder.current.start();
    setRecording(true);
  } catch (error) {
    console.error("Error accessing microphone:", error);
  }
};

const stopRecording = () => {
  if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
    mediaRecorder.current.stop();


    setStart(false)
    
    setRecording(false);


    
  }
};
 

const audioBlob = new Blob(audioChunks, { type: "audio/wav" });


const audioElement = new Audio(URL.createObjectURL(audioBlob));

  // Listen for the "loadedmetadata" event to get the duration
  audioElement.oncanplaythrough = () => {
    const durationInSeconds = audioElement.duration;
    console.log("Duration of recorded audio:", durationInSeconds, "seconds");
  };

  audioElement.load(); 

const audioFile = new File([audioBlob], "audio.wav", { type: "audio/wav" });




console.log(audioBlob)

const handleUploadFile = () => {
  
 
  
  if (audioChunks.length > 0){
  uploadFileWithMetadata(audioFile, caption, time);
  }
};



const audioUrl = URL.createObjectURL(audioBlob)

const playRecording = () => {
  ;
  const audio = new Audio(audioUrl);
  audio.play();
};
console.log(audioUrls)
function openModal() {
    setShowModal(true);
}



    return(

        <div className=" fixed top-0 right-0 bottom-0 left-0 bg-none m-3 flex items-center justify-center z-30">
            <div className="min-w-[300px] bg-[#FD8D14] max-w-auto py-3 pt-9  border-2 border-black rounded-[20px] justify-center relative ">
             <button onClick={onClose} className="absolute m-3 right-0 top-0 bg-none ">
                    <CloseIcon className="fill-black"/>
                </button>

             <div>
      <button  className="bg-yellow-500 border-black border-2 shadow-custom text-base sm:text-lg py-[12px] px-[12px] m-3"  onClick={startRecording} disabled={recording}>
        Start Recording
      </button>
      <button  className="bg-yellow-500 border-black border-2 shadow-custom text-base sm:text-lg py-[12px] px-[12px] m-3"  onClick={stopRecording} disabled={!recording}>
        Stop Recording
      </button>
     
      <button  className="bg-yellow-500 border-black border-2 shadow-custom text-base sm:text-lg py-[12px] px-[12px] m-3"  onClick={playRecording} disabled={audioChunks.length === 0}>
        Play Recording
      </button>
      {time}

      <input
        className="m-3 border-2 border-black py-3 px-3"
        placeholder="Write a Title"
          type="Text"
          onChange={(e) => {
            setCaption(e.target.value);
          }}
        />
        <div>

        </div>
        <span className="text-xl m-3 self-center text-gray-900 font-bold">Preview:</span>
        <div className="m-3 flex justify-start ">
        
        
        <AudioPlayer src={audioUrl} caption={caption && caption}/>
        </div>
        
      <button  className="bg-yellow-500 border-black border-2 shadow-custom text-lg sm:text-lg py-[12px] px-[12px] m-3" onClick={handleUploadFile} disabled={audioChunks.length === 0}>
        Upload!
      </button>
      </div>


     </div>
        </div>
    )
}
export default AddVoiceNoteModal;