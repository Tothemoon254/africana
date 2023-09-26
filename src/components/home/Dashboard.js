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
          <div className="flex justify-between flex-col-reverse sm:flex-row">
            <div className="flex justify-center items-start flex-col">
              <h1 className=" text-5xl font-bold">
                Repainting Africa on our own canvas.
              </h1>
              <h1 className="text-xl mt-4">
                Short and magical stories from every corner the continent we know and love.
              </h1>

              <Link to="/write"
               class='shadow-custom bg-[#5bdfdf] py-3 mt-6 px-3 text-xl border-2 border-black'>
                Start writing
              </Link>
            </div>
            <div className=" flex justify-center items-center">
              <img src={AfricanaLogo} alt="logo" className="h-[750px] border-2 border-black" />
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