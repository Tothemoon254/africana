import React, { useState } from "react";
import {
  Text,
  useToast,
  Link as ChakraLink,
} from "@chakra-ui/react";

// Context
import { UserAuth } from "../../contexts/AuthContext";

import { Link, useNavigate } from "react-router-dom";

function Login() {
  const { signIn } = UserAuth();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await signIn(email, pwd)
      toast({
        title: "Logged in successfully",
        status: "success",
        duration: 5000,
      });

      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.message);

      toast({
        title: "Failed to login",
        description: "Invalid email or password",
        status: "error",
        duration: 5000,
      });
    }

    setLoading(false);
  };

  return (
    <div
      className="w-[100%] h-[100vh] flex justify-center content-center "
    >
      <div
      className="flex w-[100vw] md:w-[40vw] h-[100vh] justify-center items-center text-center mx-3 flex-col">
        <div className="w-[90%] max-w-[400px] shadow-custom px-6 py-8 rounded-lg border-2 border-black">
          <h1 className= "text-2xl font-semibold mb-4">
            Login
          </h1>
          <form id="email" className=" flex flex-col place-items-start mt-4 my-3 "isRequired>
            <label>Email address</label>
            <input
              className= "border-2 w-[100%] px-2 h-[40px] mt-2 border-black"
              type="email"
              variant="filled"
              value={email}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
          </form>

          <form id="password" className=" flex flex-col place-items-start mt-4 my-3 " isRequired>
            <label>Password</label>
            <input
              className= "border-2 w-[100%] px-2 h-[40px] mt-2 border-black"
              type="password"
              variant="filled"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
          </form>

          <button
            className="bg-blue-600 w-[100%] mt-4 py-3 text-xl text-black border-2 border-black rounded-lg shadow-custom"
            onClick={handleSubmit}

      
          >
            Login
          </button>

          <Text mt={6} fontWeight="normal" fontSize="lg">
            <Link to="/forgot-password">
              <ChakraLink color="blue.700">Forgot password?</ChakraLink>
            </Link>
          </Text>
        </div>
        <Text mt={8} fontWeight="normal" fontSize="lg">
          Don't have an account?{" "}
          <Link to="/signup">
            <ChakraLink color="blue.700">Sign up</ChakraLink>
          </Link>
        </Text>
      </div>

      <div
        className="w-[0vw] md:w-[75vw] h-[100%] shadow-2xl bg-gradient-to-r from-cyan-500 to-blue-500 "
      ></div>
    </div>
  );
}


export default Login;