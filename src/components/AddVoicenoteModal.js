
import React, { useState, useRef } from "react";
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
import AudioTimer from "./AudioTimer";
import FakeAudioPlayer from "./FakeAudioPlayer";






const AddVoiceNoteModal = ({ onClose }) => {



const [recording, setRecording] = useState(false);
const [audioChunks, setAudioChunks] = useState([]);
const mediaRecorder = useRef(null);
const [showModal, setShowModal] = useState(false);
const [loading, setLoading] = useState(false);
const [caption, setCaption ] = useState();
const [audioUrls, setAudioUrls] = useState([]);
const toast = useToast();
const AudioRef = ref( storage, "audio/ElevenLabs_2024-02-14T12_25_39_Charlotte.mp3");
const [isRunning, setIsRunning] = useState(false);
const [elapsedTime, setElapsedTime] = useState(0);




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



const startRecording = async () => {
  try {
    
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);
    
    

    mediaRecorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setAudioChunks((chunks) => [...chunks, event.data]);
      }
    };

    mediaRecorder.current.start();
    setRecording(true);
    setIsRunning(true)
  } catch (error) {
    console.error("Error accessing microphone:", error);
  }
};

const stopRecording = () => {
      
  if (mediaRecorder.current && mediaRecorder.current.state === "recording") {

    mediaRecorder.current.stop();

    
    
    
    setRecording(false);
    setIsRunning(false)


    
  }
};
 

const audioBlob = new Blob(audioChunks, { type: "audio/wav" });


const audioElement = new Audio(URL.createObjectURL(audioBlob));

  // Listen for the "loadedmetadata" event to get the duration
  audioElement.oncanplaythrough = () => {
    const durationInSeconds = audioElement.duration;
    console.log("Duration of recorded audio:", elapsedTime, "seconds");
  };

  audioElement.load(); 

const audioFile = new File([audioBlob], "audio.wav", { type: "audio/wav" });




console.log(audioBlob)

const handleUploadFile = () => {
  
 
  
  if (audioChunks.length > 0){
    
//  uploadFileWithMetadata(audioFile, caption, elapsedTime);
  const newMetadata = {
    customMetadata: {
       duration: 22, 
       caption: 'Example Recording'
    }
   
  };
  
  // Update metadata properties
  updateMetadata(AudioRef, newMetadata)
    .then((metadata) => {
      console.log('updated')
      // Updated metadata for 'images/forest.jpg' is returned in the Promise
    }).catch((error) => {
      // Uh-oh, an error occurred!
    });
  
  
  }
};



const audioUrl = URL.createObjectURL(audioBlob)

const playRecording = () => {
  ;
  const audio = new Audio(audioUrl);
  audio.play();
};

function openModal() {
    setShowModal(true);
}



    return(

//      <VoiceRecorder graphColor ='gray'  />

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
      <AudioTimer isRunning={isRunning}
                    elapsedTime={elapsedTime}
                    setElapsedTime={setElapsedTime} />


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
        
        
        <FakeAudioPlayer src={audioUrl} caption={caption} duration={elapsedTime}/>
        </div>
        
      <button  className="bg-yellow-500 border-black border-2 shadow-custom text-lg sm:text-lg py-[12px] px-[12px] m-3" onClick={handleUploadFile} disabled={audioChunks.length === 0}>
        Post!
      </button>
      </div>


     </div>
        </div>

     
      
    )
}
export default AddVoiceNoteModal;