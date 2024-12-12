import React from "react";
import { CiHeart } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaEdit, FaHeart } from "react-icons/fa";
import { IoAddCircleSharp } from "react-icons/io5";
import axios from "axios";

function Cards({ home, setInputDiv, data, setUpdatedData }) {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const handleImportant = async (id) => {
    try {
      await axios.put(
        `http://localhost:3000/api/v2/updateimportanttask/${id}`,
        {},
        { headers }
      );
    } catch (error) {
      console.error(error);
    }
  };
  const handleCompleteTask = async (id) => {
    try {
      await axios.put(
        `http://localhost:3000/api/v2/updatecompletetask/${id}`,
        {},
        { headers }
      );
    } catch (error) {
      console.error(error);
    }
  };
  const deleteTask = async (id) => {
    try {
      /* const response =  */ await axios.delete(
        `http://localhost:3000/api/v2/deletetask/${id}`,
        { headers }
      );
      /* alert(response.data.message); */
    } catch (error) {
      console.error(error);
    }
  };
  const editTask = (id, title, description) => {
    setInputDiv("fixed");
    setUpdatedData({
      id: id,
      title: title,
      description: description,
    });
  };
  return (
    <div className="grid grid-cols-3 gap-3 p-3">
      {data && data.length > 0 ? (
        data.map((items, i) => (
          <div
            key={i}
            className="flex flex-col justify-between bg-gray-600 rounded-sm p-4"
          >
            <div>
              <h3 className="text-xl font-semibold">{items.title}</h3>
              <p className="text-gray-300 my-2">{items.description}</p>
            </div>
            <div className="mt-4 w-full flex items-center">
              <button
                className={`${
                  items.complete === false ? "bg-red-500" : "bg-green-700"
                } p-2 rounded w-3/6 hover:scale-95 cursor-pointer transition-all duration-300`}
                onClick={() => handleCompleteTask(items._id)}
              >
                {items.complete === true ? "Completed" : "In Completed"}
              </button>
              <div className="text-white p-2 w-3/6 text-2xl font-semibold flex justify-around">
                <button
                  className="hover:scale-125 cursor-pointer transition-all duration-300"
                  onClick={() => handleImportant(items._id)}
                >
                  {items.important === false ? (
                    <CiHeart />
                  ) : (
                    <FaHeart className="text-red-500" />
                  )}
                </button>
                <button
                  className="hover:scale-125 cursor-pointer transition-all duration-300"
                  onClick={() =>
                    editTask(items._id, items.title, items.description)
                  }
                >
                  <FaEdit />
                </button>
                <button
                  className="hover:scale-125 cursor-pointer transition-all duration-300"
                  onClick={() => deleteTask(items._id)}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-3 text-center text-gray-300 mt-10">
          <h2 className="text-5xl font-semibold">No tasks found</h2>
        </div>
      )}

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
