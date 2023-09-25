import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { StarIcon, SearchIcon } from "@chakra-ui/icons";
import LoadingSmall from "../layout/LoadingSmall";

import { useFirebase } from "../../contexts/FirebaseContext";

import { Link } from "react-router-dom";

function SuggestedArticles() {
  const { getAllPublicArticles } = useFirebase();
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllPublicArticles();
        // Assuming getAllPublicArticles returns a Firestore query snapshot
        setArticles(data.docs.map((el) => el.data()));
        setFilteredArticles(data.docs.map((el) => el.data()));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // Move setLoading(false) here to ensure it always gets called
      }
    };

    fetchData();
  }, []); // Empty dependency array mea// The empty dependency array means this effect runs once, similar to componentDidMount
  

  const getDate = (timestamp) => {
    const d = new Date(timestamp);
    return d.toString();
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    console.log(searchValue);

    const filteredResults = articles.filter((article) => {
      return article.content.title
        .toLowerCase()
        .includes(searchValue.toLowerCase());
    });
    setFilteredArticles(filteredResults);
  };
console.log()
  return (
    <div className="mx-[24px] sm:mx-[64px]">
      <span className="text-2xl sm:text-3xl">Recently posted articles</span>

      <div className="my-[16px] sm:my-[32px]">
        <div  className="border-black border-2 h-[48px] w-[75%] p-3">
         <SearchIcon color='#000000'/>
          <input
          className="bg-transparent text-black px-3 placeholder:text-black"
            type="text"
            color="#000000"
            placeholder="Search for articles"
            onChange={(e) => handleSearch(e)}
           
          />
        </div>
      </div>

      {loading ? (
        <LoadingSmall />
      ) : (
        <div className="mt-10 mb-0 md:mb-4 justify-center flex-col"
 
        >
          {filteredArticles.length === 0 ? (
            <h1 className="text-xl text-center">
              No articles found
            </h1>
          ) : null}
          {filteredArticles.map((el) => (
            <Link
              className="flex justify-center flex-col items-start"
              d="flex"
              justifyContent="center"
              flexDirection="column"
              alignItems="flex-start"
              
              to={`/article/${el.articleID}`}
              // boxShadow="md"
              // p={[6, 8]}
              // mb={[4, 6]}
              // rounded="lg"
            >
              <h2 className="text-xl sm:text-2xl">{el.content.title}</h2>
              <h3 className="opacity-80 text-lg sm:text-xl">
                {el.content.subtitle}
              </h3>
              <div className="flex mt-4">
                <div
                className="flex flex-row items-center mr-2"
                  // mt={[2, null, 0]}
                >
                  <h4
                  className="font-semibold text-yellow-600 text-base sm:text-lg"
              
                  >
                    {el.stars}
                  </h4>
                  <StarIcon color={"yellow.500"} className= "text-base sm:text:lg ml-2 text-white" />
                </div>
                <span className="text-md sm:text-lg mr-2 text-blue-700">
                  {el.authorUsername}
                </span>
                <span className="text-md sm:text-lg opacity-60 font-light" >
                  {getDate(el.when).slice(4, 21)}
                </span>
              </div>

              <div className="border-b-2 border-b-black my-8"></div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SuggestedArticles;