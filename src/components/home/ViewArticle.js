import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Divider,
  useToast,
  Spacer,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { StarIcon, LinkIcon } from "@chakra-ui/icons";
import Nav from "../layout/Nav";
import LoadingSmall from "../layout/LoadingSmall";
import { useParams } from "react-router-dom";

import { useFirebase } from "../../contexts/FirebaseContext";

import Comments from "./Comments";

function ViewArticle() {
//  const articleIDFromURL = window.location.href.split("/").pop();
  const { articleID: articleIDFromURL } = useParams();
  const { getSpecificArticle, giveAStar } = useFirebase();

  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(false);
  const [starBtnLoading, setStarBtnLoading] = useState(false);

  const toast = useToast();
  const [docId, setDocId] = useState("");

 

  useEffect(() => {

    const fetchArticle = async () => {
      try {
        setLoading(true);
        const data = await getSpecificArticle(articleIDFromURL);
        setArticle(data.docs.map((el) => el.data()));
        setDocId(data.docs.map((el) => el.id));
      } catch (err) {
        console.log(err);
        toast({
          title: "The article you are looking for was not found",
          status: "error",
          duration: 5000,
        });
      }
  
      setLoading(false);
    };





    fetchArticle();
  }, [articleIDFromURL]);
//Im gonna remove fetch article innit so rememeber to modify give a star accordingly innit my g
  const handleGiveAStar = async () => {
    try {
      setStarBtnLoading(true);
      await giveAStar(docId[0]);
//     fetchArticle();
    } catch (err) {
      console.log(err);
    }
    setStarBtnLoading(false);
  };

  const handleShareArticle = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Article link copied to clipboard",
      status: "success",
      duration: 5000,
    });
  };

  const getDate = (timestamp) => {
    const d = new Date(timestamp);
    return d.toString();
  };

  return (
    <div className="flex justify-center items-center bg-[#FD8D14] ">
      <div
      className="w-[100vw] sm:w-[100vw] flex justify-center flex-col">
        <Nav />
        {loading ? (
          <LoadingSmall />
        ) : (
          <>
            {article.map((el) => (
              <div className="px-6 sm:px-10 pt-9 h-screen">
                <h1 className="text-4xl sm:text-5xl text-black">{el.content.title}</h1>
                <h2 className=" mt-3 text-xl sm:text-2xl opacity-80 text-black">
                  {el.content.subtitle}
                </h2>

                <div className="flex mt-6 flex-col sm:flex-row">
                  <h3 className="text-blue-700 text-lg sm:text-xl mr-4">
                    {el.authorUsername}
                  </h3>
                  <span className="opacity-50 text-lg sm:text-xl text-black">
                    {getDate(el.when).slice(4, 21)}
                  </span>
                  <Spacer />
                  {el.visibility === "private" ? (
                    ""
                  ) : (
                    <div className="flex flex-row items-center mt-2 md:mt-0">
                      <span
                      className="font-semibold text-yellow-400 text-lg sm:text-lg">
                        {el.stars}
                      </span>
                      <StarIcon
                        color="yellow.400"
                        fontSize={["lg", "xl"]}
                        mx="2"
                      />
                    </div>
                  )}
                </div>

                <div className="border-b-2 border-b-black my-6"/>

                <span
                className="text-lg sm:text-xl whitespace-pre-wrap">
                  {el.content.articleContent}
                </span>

                <div className="border-b-2 border-b-black my-6"/>

                

                {el.visibility === "private" ? (
                  ""
                ) : (
                  <>
                    <div className="flex">
                      {/* <Spacer d={["none", null, "block"]} /> */}
                      <button
                      className="mr-2 bg-yellow-500 py-3 px-3 border-2 border-black shadow-custom"
                        rightIcon={<StarIcon />}
                        
                        onClick={handleGiveAStar}
                        isLoading={starBtnLoading}
                        
                      >
                        Give a star
                      </button>
                      <button className="bg-blue-500 py-3 px-3 border-2 border-black shadow-custom"
                        rightIcon={<LinkIcon />}
                        onClick={handleShareArticle}
                       
                      >
                        Share
                      </button>
                    </div>

                    <Comments />
                  </>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default ViewArticle;