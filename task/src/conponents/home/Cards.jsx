import React from "react";
import { CiHeart } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoAddCircleSharp } from "react-icons/io5";

function Cards({ home, setInputDiv }) {
  const data = [
    {
      title: "The Best Coding ",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      status: "In Complete",
    },
    {
      title: "The Best Designing ",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      status: "Complete",
    },
    {
      title: "The Best Marketing ",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      status: "In Complete",
    },
    {
      title: "The Best Writing ",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      status: "In Complete",
    },
  ];
  return (
    <div className="grid grid-cols-3 gap-3 p-3">
      {data &&
        data.map((items, i) => (
          <div className="flex flex-col justify-between bg-gray-600 rounded-sm p-4">
            <div>
              <h3 className="text-xl font-semibold">{items.title}</h3>
              <p className="text-gray-300 my-2">{items.description}</p>
            </div>
            <div className="mt-4 w-full flex items-center">
              <button
                className={`${
                  items.status === "In Complete" ? "bg-red-500" : "bg-green-700"
                } p-2 rounded w-3/6 hover:scale-95 cursor-pointer transition-all duration-300`}
              >
                {items.status}
              </button>
              <div className="text-white p-2 w-3/6 text-2xl font-semibold flex justify-around">
                <button className="hover:scale-125 cursor-pointer transition-all duration-300">
                  <CiHeart />
                </button>
                <button className="hover:scale-125 cursor-pointer transition-all duration-300">
                  <FaEdit />
                </button>
                <button className="hover:scale-125 cursor-pointer transition-all duration-300">
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))}
      {home === "true" && (
        <div
          className="flex flex-col justify-center items-center bg-gray-600 rounded-sm p-4 text-gray-300 
          hover:scale-95 cursor-pointer transition-all duration-300"
          onClick={() => setInputDiv("fixed")}
        >
          <IoAddCircleSharp className="text-5xl" />
          <h2 className="text-2xl mt-4">Add Task</h2>
        </div>
      )}
    </div>
  );
}

export default Cards;
