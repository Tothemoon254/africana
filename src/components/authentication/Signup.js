import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Flex,
  Button,
  Text,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  useToast,
  Link as ChakraLink,
} from "@chakra-ui/react";

// Context
import { UserAuth } from "../../contexts/AuthContext";

import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const { createUser } = UserAuth();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pwd !== confirmPwd) {
      setError("Passwords do not match.");
      toast({
        title: "Passwords do not match",
        status: "error",
        duration: 5000,
      });
      return;
    }

    try {
      setError("");
      setLoading(true);
      await createUser(email, pwd);

      toast({
        title: "Account successfully created",
        status: "success",
        duration: 5000,
      });

      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.message);

      toast({
        title: err.message,
        status: "error",
        duration: 5000,
      });
    }

    setLoading(false);
  };

  return (
    <Box className="w-[100%] h-[100vh] flex justify-center content-center"
      w="100%"
      h="100vh"
      d="flex"
      justifyContent="center"
      alignContent="center"
    >
      <Box className="flex w-[100vw] h-[100vh] justify-center items-center text-center flex-col"
        d="flex"
        w={["100vw", null, null, "40vw"]}
        h="100vh"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        flexDirection="column"
        // bgGradient={["linear(to-br, blue.500, blue.400)", "none"]}
      >
        <Box w="90%" maxW="400px" boxShadow="lg" px={6} py={8} rounded="lg">
          <Text fontSize="2xl" fontWeight="semibold" mb={4}>
            Sign Up
          </Text>

          <FormControl id="email" mt={4} isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              variant="filled"
              value={email}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl id="password" mt={4} isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              variant="filled"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
          </FormControl>

          <FormControl id="confirm-password" mt={4} isRequired>
            <FormLabel>Confirm password</FormLabel>
            <Input
              type="password"
              variant="filled"
              value={confirmPwd}
              onChange={(e) => setConfirmPwd(e.target.value)}
            />
          </FormControl>

          <button
          className="bg-blue-700 w-[100%] mt-4 py-6 text-xl text-black"
      
            onClick={handleSubmit}
            isLoading={loading}
          >
            Sign Up
          </button>
        </Box>
        <h1 className="mt-8 font-normal text-lg">
          Already have an account?{" "}
          <Link to="/login">
            <ChakraLink color="blue.400">Login</ChakraLink>
          </Link>
        </h1>
      </Box>

      <Box
        w={["0vw", null, null, "60vw"]}
        h="100%"
        bgGradient="linear(to-br, blue.500, blue.400)"
        boxShadow="2xl"
      ></Box>
    </Box>
  );
}

export default Signup;