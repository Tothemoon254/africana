import React from "react";
import { Box, IconButton } from "@chakra-ui/react";
import { FiGithub } from "react-icons/fi";


function Footer() {
  return (
    <Box className="flex w-[100%] justify-center items-center mb-[40px]" >
      <IconButton
        onClick={() =>
          window.open("https://github.com/arpit2205/medium-clone", "_blank")
        }
        variant="ghost"
        size="lg"
        icon={<FiGithub />}
      />
    </Box>
  );
}

export default Footer;