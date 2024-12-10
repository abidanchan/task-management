import React, { useState } from "react";
import Cards from "../conponents/home/Cards";
import { IoAddCircleSharp } from "react-icons/io5";
import InputData from "../conponents/home/InputData";

function AllTask() {
  const [InputDiv, setInputDiv] = useState("hidden");
  return (
    <>
      <div>
        <div className="w-full flex justify-end px-4 py-2">
          <button onClick={() => setInputDiv("fixed")}>
            <IoAddCircleSharp className="text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300" />
          </button>
        </div>
        <Cards home={"true"} setInputDiv={setInputDiv} />
      </div>
      <InputData InputDiv={InputDiv} setInputDiv={setInputDiv} />
    </>
  );
}

export default AllTask;
