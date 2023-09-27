import React, { useState } from "react";
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

function WriteArticle() {
  const { user } = UserAuth();
  const { postArticle } = useFirebase();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [visibility, setVisibility] = useState("public");
  const toast = useToast();
  const navigate = useNavigate();

  const handlePost = async () => {
    if (!title || !subtitle || !articleContent) {
      toast({
        title: "Please fill all fields",
        status: "error",
        duration: 5000,
      });
      return;
    }

    try {
      setLoading(true);
      await postArticle({
        articleID: uuidv4(),
        authorID: user.uid,
        authorEmail: user.email,
        authorUsername: user.displayName,
        content: {
          title,
          subtitle,
          articleContent,
        },
        when: Date.now(),
        stars: 0,
        visibility: visibility,
      });

      toast({
        title: "Article posted",
        status: "success",
        duration: 5000,
      });

      navigate("/");
    } catch (err) {
      console.log(err);
      toast({
        title: "Failed to post article",
        status: "error",
        duration: 5000,
      });
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center bg-[#FD8D14] h-screen">
      <div
      className="flex w-[100vw] sm:w-[100vw] justify-center flex-col"
      >
        <Nav />

        <div className="px-[24px] sm:px-[40px]" >
          <h1 className="text-2xl sm:text-3xl text-center">
            Write your heart out!
          </h1>
          <h2 className="text-sm sm:text-md text-black">
            writing as {user.displayName}
          </h2>

          <Textarea
          className="placeholder:text-black"
            variant="unstyled"
            color={"black"}
            placeholder="Title"
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
            fontSize={["xl", "2xl"]}
            resize="vertical"
            rows={1}
            onChange={(e) => setSubtitle(e.target.value)}
          />
         <div className="border-b-2 border-b-black my-[24px} sm:my-[40px]"></div>
         

          <Textarea 
            className="placeholder:text-black"
            variant="unstyled"
            placeholder="Write your story here"
            fontSize={["md", "lg"]}
            resize="vertical"
            onChange={(e) => setArticleContent(e.target.value)}
            rows={8}
          />

          <div className="border-b-2 border-b-black my-[24px} sm:my-[40px]"></div>

          <div className="flex flex-col">
            <div
            className="flex flex-col sm:flex-row justify-start sm:items-center"
            >
              <h3 className="text-xl sm:text-2xl mr-[16px] mb-[8px] md:mb-0">
                Choose your article's visibility
              </h3>

              <RadioGroup
                onChange={setVisibility}
                value={visibility}
                mb={[2, 2, 0]}
              >
                <Stack direction="row">
                  <Radio mr="2" isChecked={true} size="lg" value="public" borderColor={"black"} >
                    Public
                  </Radio>
                  <Radio size="lg" value="private"  borderColor={"black"}>
                    Private
                  </Radio>
                </Stack>
              </RadioGroup>
            </div>
            <span className="text-sm sm:text-md opacity-[40%] mb-[8px] text-black" >
              {visibility === "private"
                ? "Your article will not be shared with the community and will be visible only to you. You can change it later anytime."
                : "Your article will be shared with the community and anyone could read it. You can change it later anytime."}
            </span>
          </div>

          <div
          className="flex justify-center items-center flex-col-reverse md:ppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp95flex-row my-[24px] mb-[24px] md:mb-[40px]"
          >
            <Link
              class="bg-yellow-500 border-black border-2 shadow-custom text-md sm:text-lg py-[12px] px-[12px] mr-0 md:mr-[16px] mt-[16px] sm:mt-0"
   
              to="/"
            >
              Discard
            </Link>
            <button class=" bg-yellow-500 border-black border-2 shadow-custom text-md sm:text-lg py-[12px] px-[12px] text-black"
         
              onClick={handlePost}
              isLoading={loading}
            >
              Post {visibility === "private" ? "privately" : "publicly"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WriteArticle;