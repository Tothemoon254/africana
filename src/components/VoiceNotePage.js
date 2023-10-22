import React from "react";
import { useParams } from "react-router-dom";
import AudioPlayer from './AudioPlayer';


function VoiceNotePage(){
    const { VoiceNoteID: VoiceNoteIDIDFromURL } = useParams();


    
    

    return(
        <div>

            <AudioPlayer/>

        </div>
    )
}