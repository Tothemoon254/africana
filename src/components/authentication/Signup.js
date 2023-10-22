import React, { useState } from "react";
import {
  useToast,
  Link as ChakraLink,
} from "@chakra-ui/react";

// Context
import { UserAuth } from "../../contexts/AuthContext";

import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const { createUser, updateUserProfile } = UserAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState('"https://example.com/jane-q-user/profile.jpg"');
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pwd) {
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
      await updateUserProfile(profilePic, name)

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
    <div className="w-[100%] h-[100vh] flex justify-center content-center"
 
    >
      <div className="flex w-[100vw] md:w-[40vw] h-[100vh] justify-center items-center text-center flex-col"
 
        // bgGradient={["linear(to-br, blue.500, blue.400)", "none"]}
      >
        <div className="w-[90%] max-w-[400px] shadow-custom px-6 py-8 rounded-lg border-2 border-black" >
          <h1 className="text-2xl font-semibold mb-4">
            Sign Up
          </h1>

          <form className=" flex flex-col place-items-start mt-4 my-3 " id="email" isRequired>
            <label>Email address</label>
            <input
            className="border-2 w-[100%] border-black px-2 h-[40px] mt-2"
              placeholder="Enter Email"
              type="email"
              variant="filled"
              value={email}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
          </form>

          <form className=" flex flex-col place-items-start mt-4 my-3 "id="username" mt={4} isRequired>
            <label>Username</label>
            <input
             className="border-2 w-[100%] border-black px-2 h-[40px] mt-2"
             placeholder="E.g John Doe"
              type="username"
              variant="filled"
              value={name}
              autoComplete="off"
              onChange={(e) => setName(e.target.value)} 
            />
          </form>

          <form  className= "flex flex-col place-items-start mt-4 my-3" id="password" mt={4} isRequired>
            <label>Password</label>
            <input
              className= "border-2 w-[100%] border-black px-2 h-[40px] mt-2"
              placeholder="Password"
              type="password"
              variant="filled"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
          </form>


          <button
            className="bg-blue-600 w-[100%] mt-4 py-3 text-xl text-black border-2 border-black rounded-lg shadow-custom"
      
            onClick={handleSubmit}
            isLoading={loading}
          >
            Sign Up
          </button>
        </div>
        <span className="mt-8 font-normal text-lg">
          Already have an account?{" "}
          <Link to="/login">
            <ChakraLink color="blue.700">Login</ChakraLink>
          </Link>
        </span>
      </div>

      <div
       className="w-[0vw] md:w-[90vw] h-[100%] shadow-2xl bg-gradient-to-r from-cyan-500 to-blue-500 "                      
      ></div>
    </div>
  );
}

export default Signup;