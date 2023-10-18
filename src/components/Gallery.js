import React, { useState, useEffect } from "react";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
    deleteObject,
    getMetadata
  } from "firebase/storage";

import { storage } from "../firebase.config";
import { v4 } from "uuid";
import AddPhotoModal from "./AddPhotoModal";
import { AddIcon } from "@chakra-ui/icons";
import Loading from "./layout/Loading";








function Gallery(){

    const [imageUpload, setImageUpload] = useState(null);
    const [caption, setCaption ] = useState();
    const [imageUrls, setImageUrls] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading ] = useState(false);
    const [items, setItems ] = useState([]);

    const imagesListRef = ref(storage, "images/");
    

    
    

async function verifyImage(imageRef) {
  // Example: Check if the image has a valid format, size, or content
  // Replace this with your verification logic
  return true; // Return true if the image is verified, false otherwise
}


async function moveImageToMainStorage(imageRef, temporaryPath) {
  // Implement your verification process here
  const isVerified = await verifyImage(imageRef);

  if (isVerified) {
    // If the image is verified, move it to the main storage
    const mainImageRef = ref(storage, `main/${imageRef.name}`);
    await storage.move(temporaryPath, mainImageRef);

    // Retrieve the download URL for the main storage
    const downloadURL = await getDownloadURL(mainImageRef);
    return downloadURL;
  } else {
    // If the image is not verified, delete it from temporary storage
    await deleteObject(imageRef);
    return null; // Return null to indicate that the image is not stored
  }
}

async function uploadToTemporaryStorage(file) {
  const temporaryImageRef = ref(storage, `temporary/${file.name}`);
  await uploadBytes(temporaryImageRef, file);
  return temporaryImageRef;
}

useEffect(() => {
  const fetchStorageData = async () => {
    
    const itemsArray = [];

    try {
      setLoading(true);
      const { items } = await listAll(imagesListRef);
      

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

  

  
  function openModal() {
    setShowModal(true);
}
  
  const ImageWithCaption = ({ imageUrl, caption }) => {
    return (
      <div className="">
        <img src={imageUrl} alt={caption} className="h-[180px] sm:h-[450px] m-3" />
        <div className="caption">{caption}</div>
      </div>
    );
  };

 

    return(

        <div className="flex flex-col  justify-center  w-[100vw] ">
           <div className="flex justify-center w-[100%] bg-[#FD8D14] z-10">
          <h1 className=" text-3xl font-bold fixed top-[120px]  mx-5">Gallery(Still Under Construction)</h1>
          
           </div>
               
 
         <div className="fixed right-0 m-5 bottom-0">
              <button
                onClick={openModal}
                  className={"flex  bg-[#5bdfdf] p-[20px] rounded-[20px] shadow-custom  ml-[10px] text-black hover:text-lg transition-all border-2 border-black "}
                        >
                           <AddIcon className="fill-black"/>
                          
                        </button>
                    </div>
                    {loading ? (
          <Loading />
        ) : (
        <div className="grid grid-cols-1 place-items-center sm:grid-cols-3 justify-center mt-[200px] w-[100%] sm:mt-[210px] bg-[#FD8D14] z-0 h-[100%] m-3">
        {items.map((data) => {
            
            
          return <img src={data.url} className="h-[300px] sm:h-[500px]" />;
        })}
        </div>)}
        {showModal && <AddPhotoModal onClose={() => setShowModal(false)} />}
      </div>
  
    )
}
export default Gallery;