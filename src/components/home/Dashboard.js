import React from "react";


import AfricanaLogo from '../../assets/AfricanaLogo.svg'

import { Link } from "react-router-dom";

import Nav from '../layout/Nav';
import RecentArticles from "./RecentArticles";
import Footer from "../layout/Footer";

function Dashboard() {
  

  return (
    <div className="flex justify-center items-center bg-[#FD8D14]" >
      <div className="w-[100vw] flex justify-center flex-col">
        <Nav />

        <div className="px-6" >
          <div className="flex justify-between flex-col-reverse">
            <div className="flex justify-center items-start flex-col">
              <h1 className="mt-6 text-4xl">
                A place to read and tell of the millions of stories africa has to tell.
              </h1>
              <h1 className="text-lg mt-4">
                It's easy and free to tell your story and
                connect with millions of readers.
              </h1>

              <Link to="/write"
              className="bg-[#5bdfdf] py-3 mt-6 px-3 rounded-xl text-xl shadow-2xl border-2 border-black">
                Start writing
              </Link>
            </div>
            <div className="px-8 flex justify-center items-center">
              <img src={AfricanaLogo} alt="logo" className="h-[600px]" />
            </div>
          </div>
          <div className="border-b-2 border-b-black my-8"></div>
        </div>

        <RecentArticles />
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;