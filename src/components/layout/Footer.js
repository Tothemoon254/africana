import React from "react";
import { Box, IconButton } from "@chakra-ui/react";
import { FiGithub, FiInstagram } from "react-icons/fi";


function Footer() {
  return (
    <Box className="flex w-[100%] justify-center items-center mb-[40px]" >
      <IconButton
        onClick={() =>
          window.open("https://www.instagram.com/africanaverse", "_blank")
        }
        variant="ghost"
        size="lg"
        icon={<FiInstagram />}
      />
    </Box>
  );
}

export default Footer;