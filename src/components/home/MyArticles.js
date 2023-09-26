import React, { useState, useEffect } from "react";
import {

  Spacer,
  Button,
  useToast,
  Badge,
  Select,
} from "@chakra-ui/react";
import {
  StarIcon,
  DeleteIcon,
  EditIcon,
  LockIcon,
  UnlockIcon,
} from "@chakra-ui/icons";
import Nav from "../layout/Nav";
import LoadingSmall from "../layout/LoadingSmall";

import { useFirebase } from "../../contexts/FirebaseContext";

import { Link } from "react-router-dom";

function MyArticles() {
  const { getMyArticles, deleteArticle } = useFirebase();
  const [articles, setArticles] = useState([]);
  const [docIDs, setDocIDs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectValue, setSelectValue] = useState("all");
  const [filteredArticles, setFilteredArticles] = useState([]);

  const toast = useToast();

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const data = await getMyArticles();
      setArticles(data.docs.map((el) => el.data()));
      setFilteredArticles(data.docs.map((el) => el.data()));
      setDocIDs(data.docs.map((el) => el.id));
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (docID, i) => {
    try {
      await deleteArticle(docID);
      toast({
        title: "Article deleted successfully",
        status: "success",
        duration: 5000,
      });
      fetchArticles();
    } catch (err) {
      console.log(err);
      toast({
        title: "Failed to delete article",
        status: "error",
        duration: 5000,
      });
    }
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectValue(value);
    if (value === "all") {
      setFilteredArticles(articles);
    } else
      setFilteredArticles(articles.filter((el) => el.visibility === value));
  };

  const getDate = (timestamp) => {
    const d = new Date(timestamp);
    return d.toString();
  };

  return (
    <div className="flex justify-center items-center bg-[#FD8D14]">
      <div
         className="w-[100vw] md:w-[100vw] flex flex-col"
    
      >
        <Nav />
        {loading ? (
          <LoadingSmall />
        ) : (
          <div className="mx-6 sm:mx-10 h-screen">
            <h1 className="text-2xl sm:text-3xl mt-3">Articles you have written</h1>

            <div className="flex justify-center items-center">
              <Spacer />

              <Select 
                // placeholder="Choose article visibility"
                borderColor={"black"}
                w={["100%", null, "320px"]}
                mt="8"
                onChange={(e) => handleSelectChange(e)}
                value={selectValue}
              >
                <option value="all">All articles</option>
                <option value="public">Public articles</option>
                <option value="private">Private articles</option>
              </Select>
            </div>

            <div
            className="mt-6 mb-10 flex justify-center flex-col">
              {filteredArticles.map((el, i) => {
                return (
                  <>
                    <Link
                    className="flex justify-center flex-col items-start"
                   
              
                      to={`/article/${el.articleID}`}

                      // boxShadow="md"
                      // p={[6, 8]}
                      //   mb={[4, 6]}
                      // rounded="lg"
                    >
                      {el.visibility === "private" ? (
                        <Badge
                          variant="solid"
                          fontSize={["sm", "sm"]}
                          colorScheme="blue"
                          mb="2"
                        >
                          Private {<LockIcon mb="1" ml="1" />}
                        </Badge>
                      ) : (
                        <Badge
                          variant="solid"
                          fontSize={["sm", "sm"]}
                          colorScheme="green"
                          mb="2"
                        >
                          Public
                        </Badge>
                      )}
                      <h2 className="text-xl sm:text-2xl">{el.content.title}</h2>
                      <h3 className="text-lg sm:text-xl opacity-[50%]">
                        {el.content.subtitle}
                      </h3>
                      <div className="flex mt-4">
                        {el.visibility === "private" ? (
                          ""
                        ) : (
                          <>
                            <div
                            className="flex flex-row items-center mr-2"
        
                              // mt={[2, null, 0]}
                            >
                              <span
                              className="font-semibold text-yellow-500 text-md sm:text-lg"
                              >
                                {el.stars}
                              </span>
                              <StarIcon
                                color="yellow.500"
                                fontSize={["md", "lg"]}
                                ml="2"
                              />
                            </div>
                          </>
                        )}
                        <span className="text-md sm:text-lg mr-2 text-blue-500">
                          {el.authorUsername}
                        </span>
                        <span
                        className="text-md sm:text-lg opacity-[60%] font-light"
                        >
                          {getDate(el.when).slice(4, 21)}
                        </span>
                      </div>
                    </Link>
                    <div className="flex">
                      <Spacer d={["none", null, "block"]} />
                      {/* {setBtnLoading([...btnLoading, false])} */}

                      <Button
                        mt="4"
                        mr="2"
                        variant="outline"
                        as={Link}
                        rightIcon={<EditIcon />}
                        colorScheme="blue"
                        to={`/edit-article/${el.articleID}`}
                      >
                        Edit
                      </Button>

                      <Button
                        mt="4"
                        rightIcon={<DeleteIcon />}
                        colorScheme="red"
                        variant="outline"
                        onClick={() => {
                          handleDelete(docIDs[i], i);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                    <div className="border-b-2 border-b-black my-6" />
                  </>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyArticles;