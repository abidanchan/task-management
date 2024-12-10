import React from "react";
import Sidebar from "../conponents/home/Sidebar";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className="flex h-[98vh] gap-4">
        <div className="w-1/6 border border-gray-400 rounded-xl p-4 flex flex-col justify-between">
          <Sidebar />
        </div>
        <div className="w-5/6 border border-gray-400 rounded-xl p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Home;
