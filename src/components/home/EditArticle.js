import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Textarea,
  Divider,
  Button,
  useToast,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";

import Nav from "../layout/Nav";
import { Link, useNavigate } from "react-router-dom";

import { UserAuth } from "../../contexts/AuthContext";
import { useFirebase } from "../../contexts/FirebaseContext";

import { v4 as uuidv4 } from "uuid";
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
    <div className="flex justify-center items-center">
      <div
      className="flex w-[100vw] md:w-[100vw] justify-center flex-col h-screen"
       
      >
        <Nav />

        {loading ? (
          <LoadingSmall />
        ) : (
          <>
            {article.map((el) => (
              <Box px={["6", "10"]}>
                <Text fontSize={["2xl", "3xl"]} textAlign="center">
                  Edit your article
                </Text>
                <Text
                  fontSize={["sm", "md"]}
                  textAlign="center"
                  color="blue.500"
                >
                  writing as {`@${user.email.split("@")[0]}`}
                </Text>

                <Textarea
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

                <Box d="flex" flexDirection="column">
                  <Box
                    d="flex"
                    flexDirection={["column", null, "row"]}
                    justifyContent="flex-start"
                    alignItems={[null, null, "center"]}
                  >
                    <Text fontSize={["xl", "2xl"]} mr="4" mb={[2, 2, 0]}>
                      Choose your article's visibility
                    </Text>

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
                  </Box>
                  <Text fontSize={["sm", "md"]} opacity="0.4" mb="2">
                    {visibility === "private"
                      ? "Your article will not be shared with the community. It will be visible only to you. You can change it later anytime."
                      : "Your article will be shared with the community and anyone could read it. You can change it later anytime."}
                  </Text>
                </Box>

                {/* //////////////////////// */}

                <Box
                  d="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection={["column-reverse", null, "row"]}
                  my="6"
                  mb={[6, 6, 10]}
                >
                  <Link
                    className=" bg-yellow-500 border-black border-2 shadow-custom text-base sm:text-lg py-[12px] px-[12px] mr-0 sm:mr-0 md:mr-4 mt-4 sm:mt-0"
                   
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
                </Box>
              </Box>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default EditArticle;