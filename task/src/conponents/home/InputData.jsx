import axios from "axios";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

function InputData({ InputDiv, setInputDiv }) {
  const [Data, setData] = useState({ title: "", description: "" });
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  const submitData = async () => {
    if (Data.title === "" || Data.description === "") {
      alert("Please fill in all fields");
    } else {
      const res = await axios.post(
        "http://localhost:3000/api/v2/newtask",
        Data,
        { headers }
      );
      console.log(res);
    }
  };
  return (
    <>
      <div
        className={`${InputDiv} top-0 left-0 bg-gray-800 opacity-90 h-screen w-full`}
      ></div>
      <div
        className={`${InputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}
      >
        <div className="w-2/6 bg-gray-900 p-4 rounded">
          <div className="flex justify-end">
            <button className="text-2xl" onClick={() => setInputDiv("hidden")}>
              <RxCross2 />
            </button>
          </div>
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="px-3 py-2 rounded w-full bg-gray-600 my-3"
            value={Data.title}
            onChange={change}
          />
          <textarea
            cols="30"
            rows="10"
            placeholder="Description"
            name="description"
            className="px-3 py-2 rounded w-full bg-gray-600 my-3"
            value={Data.description}
            onChange={change}
          />
          <button
            className="w-full py-2 text-xl font-semibold bg-green-700 rounded text-white transition-all duration-300 hover:scale-95"
            onClick={submitData}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default InputData;
