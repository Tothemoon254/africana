import React from "react";
import { Box, Spinner } from "@chakra-ui/react";

const LoadingSmall = () => {
  return (
    <div className="flex justify-center items-center h-screen w-[100%] bg-[#FD8D14]">
      <Spinner m="10" color="blue.500" />
    </div>
  );
};

export default LoadingSmall;