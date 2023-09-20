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
      }
      setLoading(false);
    };
  
    // Call the fetchData function inside the useEffect
    fetchData();
  }, []); // The empty dependency array means this effect runs once, similar to componentDidMount
  

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

  return (
    <div className="mx-[24px] sm:mx-[64px]">
      <span className="text-2xl sm:text-3xl">Recently posted articles</span>

      <div className="my-[16px] sm:my-[32px]">
        <div  className="border-black border-2 h-[48px] w-[75%] p-3">
         <SearchIcon color='#000000'/>
          <input
          className="bg-transparent text-black px-3"
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
        <Box
          mt="10"
          mb={[0, 0, 4]}
          d="flex"
          justifyContent="center"
          flexDirection="column"
        >
          {filteredArticles.length === 0 ? (
            <Text fontSize="xl" textAlign="center">
              No articles found
            </Text>
          ) : null}
          {filteredArticles.map((el) => (
            <Box
              d="flex"
              justifyContent="center"
              flexDirection="column"
              alignItems="flex-start"
              as={Link}
              to={`/article/${el.articleID}`}
              // boxShadow="md"
              // p={[6, 8]}
              // mb={[4, 6]}
              // rounded="lg"
            >
              <Text fontSize={["xl", "2xl"]}>{el.content.title}</Text>
              <Text fontSize={["lg", "xl"]} opacity="0.8">
                {el.content.subtitle}
              </Text>
              <Box d="flex" mt="4">
                <Box
                  d="flex"
                  flexDirection="row"
                  alignItems="center"
                  mr="2"
                  // mt={[2, null, 0]}
                >
                  <Text
                    fontWeight="semibold"
                    color="yellow.500"
                    fontSize={["md", "lg"]}
                  >
                    {el.stars}
                  </Text>
                  <StarIcon color="yellow.500" fontSize={["md", "lg"]} ml="2" />
                </Box>
                <Text fontSize={["md", "lg"]} mr="2" color="blue.500">
                  {el.authorUsername}
                </Text>
                <Text fontSize={["md", "lg"]} opacity="0.6" fontWeight="light">
                  {getDate(el.when).slice(4, 21)}
                </Text>
              </Box>

              <Divider my="6" />
            </Box>
          ))}
        </Box>
      )}
    </div>
  );
}

export default SuggestedArticles;