
import React, { useState, useEffect, useRef } from "react";

import {
    ref,
    uploadBytes,
    updateMetadata,
  } from "firebase/storage";
  import checkImageType from "./checkImageType";

import { storage } from "../firebase.config";
import { v4 } from "uuid";
import { CloseIcon }  from "@chakra-ui/icons"
import { useToast } from "@chakra-ui/react";

 


const AddPhotoModal = ({ onClose }) =>{

const [recording, setRecording] = useState(false);
const [audioChunks, setAudioChunks] = useState([]);
const mediaRecorder = useRef(null);
const [showModal, setShowModal] = useState(false);
const [loading, setLoading] = useState(false);
const [caption, setCaption ] = useState();
const [imageUpload, setImageUpload] = useState(null);
const [audioUrls, setAudioUrls] = useState([]);
const toast = useToast();





  
const uploadFileWithMetadata = (file, caption) => {

  
  if (file == null) return;

  // Initialize Firebase Storage
  

  // Define the file reference
  const filename = file.name + v4();
  const imageRef = ref(storage, `Temporary/${filename}`);
  

  
  // Create custom metadata for the caption
  const metadata = {
              
    customMetadata: {
      contentType: 'image/jpeg',
      caption: caption// Your custom caption data
      // You can add more custom metadata properties here
    },
  };

  // Set the custom metadata for the file
  uploadBytes(imageRef, file, metadata)
  .then((snapshot) => {
    // The file is uploaded with the specified metadata
    toast({
      title: "Photo Posted!",
      status: "success",
      duration: 5000,
    });
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
  } catch (error) {
    console.error("Error accessing microphone:", error);
  }
};



 



const handleUploadFile = () => {
  
 
  
  
  uploadFileWithMetadata(imageUpload, caption);
  

};




    return(

      <div className=" fixed top-0 right-0 bottom-0 left-0 bg-none m-3 flex items-center justify-center">

       <div className="min-w-[300px]  bg-[#FD8D14] shadow-custom max-w-auto py-7 pt-9  border-2 border-black rounded-[20px] justify-center relative">

       <button onClick={onClose} className="absolute m-3 right-0 top-0 bg-none ">
                    <CloseIcon className="fill-black"/>
                </button>
       
      <input
      className="m-3"
        type="file"
        onChange={(e) => {
          setImageUpload(e.target.value);
        }}
      />
       <input
      className="m-5 border-2 border-black py-3 px-3"
      placeholder="Write a caption"
        type="Text"
        onChange={(e) => {
          setCaption(e.target.value);
        }}
      />
      <div>
      
      <button className="bg-yellow-500 border-black border-2 shadow-custom text-base sm:text-lg py-[12px] px-[12px] m-3" onClick={handleUploadFile}> Upload Image</button>  
      <span className="flex m-3 ">All images are approved before going live on the site.
    </span>
     </div>
     </div>
    </div>
    )
};
export default AddPhotoModal;