import React, { useState, useEffect } from "react";
import {

  Textarea,
  useToast,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";

import { Link, useNavigate } from "react-router-dom";

import { UserAuth } from "../../contexts/AuthContext";
import { useFirebase } from "../../contexts/FirebaseContext";

import LoadingSmall from "../layout/LoadingSmall";

function EditArticle() {
  const articleIDFromURL = window.location.href.split("/").pop();
  const { user } = UserAuth();
  const { editArticle, getSpecificArticle } = useFirebase();
  const [article, setArticle] = useState([]);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [docId, setDocId] = useState("");
  const [visibility, setVisibility] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const data = await getSpecificArticle(articleIDFromURL);
      const articleData = data.docs[0].data();
      const articleId = data.docs[0].id;
  
      setArticle(data.docs.map((el) => el.data()));
      setDocId(articleId);
      setTitle(articleData.content.title);
      setSubtitle(articleData.content.subtitle);
      setArticleContent(articleData.content.articleContent);
      setVisibility(articleData.visibility);
    } catch (err) {
      console.error(err);
      toast({
        title: "The article you are looking for was not found",
        status: "error",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchArticle();
  }, [articleIDFromURL]);
  

  const handleEdit = async () => {
    if (!title || !subtitle || !articleContent) {
      toast({
        title: "Please fill all fields",
        status: "error",
        duration: 5000,
      });
      return;
    }

    const data = {
      title: title,
      subtitle: subtitle,
      articleContent: articleContent,
      visibility: visibility,
    };

    try {
      setBtnLoading(true);

      await editArticle(docId, data);

      toast({
        title: "Article updated",
        status: "success",
        duration: 5000,
      });

      navigate(`/article/${articleIDFromURL}`);
    } catch (err) {
      console.log(err);

      toast({
        title: "Failed to update article",
        status: "error",
        duration: 5000,
      });
    }

    setBtnLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div
      className="flex w-[100vw] md:w-[100vw] justify-center flex-col "
       
      >
        

        {loading ? (
          <LoadingSmall />
        ) : (
          <>
            {article.map((el) => (
              <div className="px-6 sm:px-10 ">
                <h1 className="text-2xl sm:text-3xl text-center">
                  Edit your article
                </h1>
                <h2
                className="text-sm sm:text-md text-center text-blue-600"
               
                >
                  writing as {`@${user.email.split("@")[0]}`}
                </h2>

                <Textarea
                className="placeholder:text-black"
                  variant="unstyled"
                  placeholder="Title"
                  defaultValue={el.content.title}
                  fontSize={["4xl", "5xl"]}
                  mt="10"
                  resize="vertical"
                  rows={1}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                className="placeholder:text-black"
                  variant="unstyled"
                  placeholder="Subtitle"
                  defaultValue={el.content.subtitle}
                  fontSize={["xl", "2xl"]}
                  resize="vertical"
                  rows={1}
                  onChange={(e) => setSubtitle(e.target.value)}
                />

                <div className="border-b-2 border-b-black my-8"></div>

                <Textarea
                className="placeholder:text-black"
                  variant="unstyled"
                  placeholder="Write your story here"
                  defaultValue={el.content.articleContent}
                  fontSize={["md", "lg"]}
                  resize="vertical"
                  onChange={(e) => setArticleContent(e.target.value)}
                  rows={8}
                />

                {/* ///////////////////// */}

                <div className="border-b-2 border-b-black my-8"></div>

                <div className="flex flex-col">
                  <div
                  className="flex flex-col md:flex-row justify-start md:items-center "
                  >
                    <h3 className="text-xl sm:text-2xl mr-4 mb-2 sm:mb-2 md:mb-0">
                      Choose your article's visibility
                    </h3>

                    <RadioGroup
                      onChange={setVisibility}
                      value={visibility}
                      mb={[2, 2, 0]}
                    >
                      <Stack direction="row">
                        <Radio mr="2" isChecked={true} size="lg" value="public" borderColor={'black'}>
                          Public
                        </Radio>
                        <Radio size="lg" value="private" borderColor={'black'} >
                          Private
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </div>
                  <span className="text-sm sm:text-md opacity-40 mb-2">
                    {visibility === "private"
                      ? "Your article will not be shared with the community. It will be visible only to you. You can change it later anytime."
                      : "Your article will be shared with the community and anyone could read it. You can change it later anytime."}
                  </span>
                </div>

                {/* //////////////////////// */}

                <div 
                className="flex justify-center items-center flex-row my-[24px] mx-5 md:mb-10 ">
                  <Link
                    className=" bg-yellow-500 border-black border-2 shadow-custom text-base sm:text-lg py-[12px] px-[12px] mr-3 sm:mr-0 md:mr-4 sm:mt-0"
                   
                    to="/my-articles"
                  >
                    Discard
                  </Link>
                  <button
                  className ="bg-yellow-500 border-black border-2 shadow-custom text-base sm:text-lg py-[12px] px-[12px] text-black"
        
                    onClick={handleEdit}
                    isLoading={btnLoading}
                  >
                    Update
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default EditArticle;