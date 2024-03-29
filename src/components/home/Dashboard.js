import React from "react";


import NewAfricanaLogo from "../../assets/NewAfricanaLogo.png"

import { Link } from "react-router-dom";

import RecentArticles from "./RecentArticles";
import Footer from "../layout/Footer";

function Dashboard() {
  

  return (
    <div className="flex justify-center items-center  bg-[#FD8D14] " >
      <div className="w-[100vw] flex justify-center flex-col">
        
           
        <div className="px-6" >
          <div className="flex justify-between flex-col-reverse sm:flex-row mt-11">
            <div className="flex justify-center items-start flex-col">
              <h1 className=" text-4xl sm:text-5xl font-bold sm:mt-11">
                Repainting Africa on our own canvas.
              </h1>
              <h1 className="text-xl mt-4">
                Short but magical stories from every corner of the continent we know and love.
              </h1>

              <Link to="/write"
               class='shadow-custom bg-[#5bdfdf] py-3 mt-6 px-3 text-xl border-2 border-black'>
                Start writing
              </Link>
            </div>
            <div className=" flex justify-center items center">
              <img src={NewAfricanaLogo} alt="logo" className=" h-[300px] sm:h-[750px] m-2 " />
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