import React, { useState, useEffect } from "react";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
  } from "firebase/storage";
import { storage } from "../firebase.config";
import { v4 } from "uuid";







function Gallery(){

    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
  
    const imagesListRef = ref(storage, "images/");
    

const uploadFile = () => {
  if (imageUpload == null) return;
  const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
  uploadBytes(imageRef, imageUpload).then((snapshot) => {
    getDownloadURL(snapshot.ref).then((url) => {
     
      if (!imageUrls.includes(url)) {
        setImageUrls((prev) => [...prev, url]);
      }
    });
  });
};

useEffect(() => {
    listAll(imagesListRef)
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
                setImageUrls([...uniqueUrls]); // Convert the Set back to an array and update the state
              }
            });
        });
      });
  }, []);
  


 

    return(

        <div className="flex flex-col bg-[#FD8D14] h-[100%] w-[100vw] ">
          <h1 className="text-black text-xl font-bold m-3">Still Under construction</h1>
        <input
        className="m-3"
          type="file"
          onChange={(event) => {
            setImageUpload(event.target.files[0]);
          }}
        />
        <div>
        <button className="bg-yellow-500 border-black border-2 shadow-custom text-base sm:text-lg py-[12px] px-[12px] m-3" onClick={uploadFile}> Upload Image</button>
       </div>
        <div className="flex flex-row m-3">
        {imageUrls.map((url) => {
            
            
          return <img src={url} key={url} alt={url} className="h-[300px] m-3 " />;
        })}
        </div>
      </div>
  
    )
}
export default Gallery;