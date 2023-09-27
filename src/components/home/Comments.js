import React, { useState, useEffect } from "react";
import {

  IconButton,
  useToast,
  Spacer,

} from "@chakra-ui/react";
import { StarIcon, AddIcon, DeleteIcon } from "@chakra-ui/icons";
import Nav from "../layout/Nav";
import LoadingSmall from "../layout/LoadingSmall";

import { useFirebase } from "../../contexts/FirebaseContext";
import { UserAuth } from "../../contexts/AuthContext";

const Comments = () => {
  const articleIDFromURL = window.location.href.split("/").pop();
  const { postComment, getComments, getSpecificArticle, deleteComment } =
    useFirebase();
  const { user } = UserAuth();
  const [loading, setLoading] = useState(false);
  const [commentBtnLoading, setCommentBtnLoading] = useState(false);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [article, setArticle] = useState([]);
  const [commentsDocIDs, setCommentsDocIds] = useState([]);

  const toast = useToast();

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const data = await getSpecificArticle(articleIDFromURL);
      setArticle(data.docs.map((el) => el.data()));
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  const fetchComments = async () => {
    try {
      setLoading(true);
      const data = await getComments(articleIDFromURL);
      setComments(data.docs.map((el) => el.data()));
      setCommentsDocIds(data.docs.map((el) => el.id));
    } catch (err) {
      console.log(err);
      toast({
        title: "Couldn't fetch comments at the moment",
        status: "error",
        duration: 5000,
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, []); 
  useEffect(() => {
    fetchArticle();
  }, []); 

  const handlePostComment = async () => {
    if (!comment) {
      toast({
        title: "Cannot post empty comment",
        status: "error",
        duration: 5000,
      });
      return;
    }

    try {
      const data = {
        comment: comment,
        articleID: articleIDFromURL,
        authorID: user.uid,
        when: Date.now(),
        authorEmail: user.email,
        autherUsername: `@${user.email.split("@")[0]}`,
      };

      setCommentBtnLoading(true);
      await postComment(data);
      toast({
        title: "Comment posted successfully",
        status: "success",
        duration: 5000,
      });
      setComment("");
      fetchComments();
    } catch (err) {
      console.log(err);
      toast({
        title: "Failed to comment",
        status: "error",
        duration: 5000,
      });
    }

    setCommentBtnLoading(false);
  };

  const handleDeleteComment = async (docID) => {
    try {
      await deleteComment(docID);
      toast({
        title: "Comment deleted",
        status: "success",
        duration: 5000,
      });
      fetchComments();
    } catch (err) {
      console.log(err);
      toast({
        title: "Failed to delete comment",
        status: "error",
        duration: 5000,
      });
    }
  };

  const getDate = (timestamp) => {
    const d = new Date(timestamp);
    return d.toString();
  };

  return loading ? (
    <LoadingSmall />
  ) : (
    <div className="mt-10 bg-[#FD8D14]">
      <h1 className="text-2xl sm:text-3xl">Comments</h1>
      <div className="flex mt-6 mb-6 px-3">
        <input
        className="border-black border-2 text-black mx-3 bg-[#FD8D14] px-5 py-1 placeholder:text-black "
          
          placeholder="Write your comment here"
          
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          g
        />
      
        <button
        className=" bg-yellow-500 text-xl flex justify-center py-3 shadow-custom border-2 border-black px-3"
          
          onClick={handlePostComment}
          isLoading={commentBtnLoading}
        ><AddIcon className="fill-black"/></button>
      </div>

      {comments.map((el, i) => (
        <div className="mt-6 ">
          <div className="flex mb-1 justify-center items-center" >
            <h2 className="text-blue-500 text-base sm:text-lg mr-2">
              {el.autherUsername}
            </h2>
            <h3 className="opacity-50 text-base sm:text-lg">
              {getDate(el.when).slice(4, 21)}
            </h3>

            

            {el.authorID === user.uid ||
            (article[0] && article[0].authorID === user.uid) ? (
              <IconButton
                icon={<DeleteIcon />}
                variant="ghost"
                colorScheme="red"
                onClick={() => {
                  handleDeleteComment(commentsDocIDs[i]);
                }}
              />
            ) : (
              ""
            )}
          </div>
          <h4 className="text-lg sm:text-xl mr-2">
            {el.comment}
          </h4>
          <div className="border-b-2 border-b-black my-6"/>
        </div>
      ))}
    </div>
  );
};

export default Comments;