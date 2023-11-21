import { useParams } from "react-router-dom";
import BigAudioPlayer from './BigAudioPlayer';
import {

    useToast,
    Spacer,
  
  } from "@chakra-ui/react";
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
  import { storage } from "../firebase.config";
  import Loading from "./layout/Loading";
  import { StarIcon, LinkIcon } from "@chakra-ui/icons";

function VoiceNotePage(){
    const { VoiceNoteID: VoiceNoteIDIDFromURL } = useParams();
    const toast = useToast();
    const [loading, setLoading] = useState(false);

    const [items, setItems ] = useState([]);

    const AudioListRef = ref(storage, `/audio/${VoiceNoteIDIDFromURL}`);

    const handleShareArticle = () => {
        navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied to clipboard",
          status: "success",
          duration: 5000,
        });
      };
//Here we might not actually need a 
      useEffect(() => {
        const fetchStorageData = async () => {
          
          const itemsArray = [];
    
          try {
            setLoading(true);
            const { items } = await listAll(AudioListRef);
            
    
            
              const url = await getDownloadURL(AudioListRef);
              const metadata = await getMetadata(AudioListRef);
    
              itemsArray.push({ url, metadata });
            
    
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


    
    

    return(
        <div className=" flex flex-col h-screen items-center w-[100%] justify-center
        ">
        {items.map((data) => {

       return <BigAudioPlayer src={data.url} path={data.metadata.fullPath} customMetadata={data.metadata.customMetadata}/>;

})}
            

        </div>
    )
}
export default VoiceNotePage;