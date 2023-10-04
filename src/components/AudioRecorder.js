import React, { useState, useEffect, useRef } from "react";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
    deleteObject
  } from "firebase/storage";
import { storage } from "../firebase.config";
import { v4 } from "uuid";
import AudioPlayer from "./AudioPlayer"

const AudioRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const mediaRecorder = useRef(null);



  const [audioUpload, setAudioUpload] = useState(null);
  const [audioUrls, setAudioUrls] = useState([]);

  const AudioListRef = ref(storage, "audio/");
  

const uploadFile = () => {
if (audioUpload == null) return;
const FileRef = ref(storage, `audio/${audioUpload.name + v4()}`);
uploadBytes(FileRef, audioUpload).then((snapshot) => {
  getDownloadURL(snapshot.ref).then((url) => {
   
    if (!audioUrls.includes(url)) {
      setAudioUrls((prev) => [...prev, url]);
    }
  });
});
};

useEffect(() => {
  listAll(AudioListRef)
    .then((response) => {
      const uniqueUrls = new Set(); // Use a Set to store unique URLs

      response.items.forEach((item) => {
        getDownloadURL(item)
          .then((url) => {
            uniqueUrls.add(url); // Add each URL to the Set
          })
          .finally(() => {
            // Check if all URLs have been processed before updating the state
            if (uniqueUrls.size === response.items.length) {
              setAudioUrls([...uniqueUrls]); // Convert the Set back to an array and update the state
            }
          });
      });
    });
}, []);


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
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
      setRecording(false);
    }
  };

  const playRecording = () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
  };
  console.log(audioUrls)

  return (
    <div className="h-screen flex justify-center  ">
      <button onClick={startRecording} disabled={recording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!recording}>
        Stop Recording
      </button>
      <button onClick={playRecording} disabled={audioChunks.length === 0}>
        Play Recording
      </button>
      <button onClick={uploadFile} disabled={audioChunks.length === 0}>
        Upload!
      </button>
      <div className="grid grid-cols-1 m-3 justify-center">
        {audioUrls.map((url) => {
            
            
          return <AudioPlayer src={url} className="h-[180px] sm:h-[450px]  m-3 " />;
        })}
        </div>
    </div>
  );
};

export default AudioRecorder;
