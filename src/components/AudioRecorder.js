import React, { useState, useEffect, useRef } from "react";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
    updateMetadata,
    getMetadata
  } from "firebase/storage";
  import Loading from "./layout/Loading";
import { storage } from "../firebase.config";
import { v4 } from "uuid";
import AudioPlayer from "./AudioPlayer"
import AddVoiceNoteModal from "./AddVoicenoteModal";
import { AddIcon } from "@chakra-ui/icons";



const AudioRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const mediaRecorder = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading ] = useState(false);
  const [caption, setCaption ] = useState();
  const [audioUpload, setAudioUpload] = useState(null);
  const [audioUrls, setAudioUrls] = useState([]);
  const [items, setItems ] = useState([]);

  const AudioListRef = ref(storage, "audio/");
  

  const uploadFileWithMetadata = (file, caption) => {
    if (file == null) return;
  
    // Initialize Firebase Storage
    
  
    // Define the file reference
    const filename = file.name + v4();
    const AudioRef = ref(storage, `audio/${filename}`);
  
    // Create custom metadata for the caption
    const customMetadata = {
      caption: caption,
    };
  
    // Set the custom metadata for the file
    updateMetadata(AudioRef, { customMetadata })
      .then(() => {
        // Upload the file to Firebase Storage
        return uploadBytes(AudioRef, file);
      })
      .then((snapshot) => {
        // Get the download URL of the uploaded file
        return getDownloadURL(snapshot.ref);
      })
      .then((url) => {
        if (!audioUrls.includes(url)) {
          setAudioUrls((prev) => [...prev, url]);
        }
      })
      .catch((error) => {
        console.error('Error uploading file with caption:', error);
      });
  };
  
  useEffect(() => {

    console.log(items);
  })



  useEffect(() => {
    const fetchStorageData = async () => {
      
      const itemsArray = [];

      try {
        setLoading(true);
        const { items } = await listAll(AudioListRef);
        

        for (const item of items) {
          const url = await getDownloadURL(item);
          const metadata = await getMetadata(item);

          itemsArray.push({ url, metadata });
        }

        setItems(itemsArray);
        
      } catch (error) {
        console.error('Error fetching storage data:', error);
      }
      finally {
        setLoading(false); // Move setLoading(false) here to ensure it always gets called
      }
    };

    fetchStorageData();
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


  
  
  
  
  
  const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
    
  
const audioUrl = URL.createObjectURL(audioBlob);
  const playRecording = () => {
   
    const audio = new Audio(audioUrl);
    audio.play();
  };
  

  function openModal() {
    setShowModal(true);
}

  return (
    <div className=" flex  bg-[#FD8D14] place-items-center h-screen top-[120px] pt-[50px] flex-col  ">
      
      <div className="flex fixed backdrop-blur-md sm:top-[106px] bg-[#FD8D14] justify-center w-[600px] z-10">

     <h1 className=" text-3xl font-bold pt-[100px] sm:pt-9">Audio Poetry</h1>
     
     
     </div>
     
    
      
      {loading ? (
          <Loading />
        ) : (
      <div className=" flex bg-[#FD8D14] pt-[150px] place-items-center w-screen flex-col m-3    ">
        {items.map((data) => {

          return <AudioPlayer src={data.url} caption={data.metadata.customMetadata.caption}/>;

        })}
        </div>
        
        )}
        {showModal && <AddVoiceNoteModal onClose={() => setShowModal(false)} />} 
        <div className="fixed right-0 m-5 bottom-0">
              <button
                onClick={openModal}
                  className={"flex  bg-[#5bdfdf] p-[20px] rounded-[20px] shadow-custom  ml-[10px] text-black hover:text-lg transition-all border-2 border-black "}
                        >
                           <AddIcon className="fill-black"/>
                          
                        </button>
                    </div>
    </div>
  );
};

export default AudioRecorder;
