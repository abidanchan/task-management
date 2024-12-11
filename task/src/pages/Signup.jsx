import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function Signup() {
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === true) {
    navigate("/");
  }

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const submit = async (e) => {
    e.preventDefault();
    try {
      if (data.username === "" || data.email === "" || data.password === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "http://Localhost:3000/api/v1/signin",
          data
        );
        setData({ username: "", email: "", password: "" });
        alert(response.data.message);
        navigate("/signin");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="p-8 w-full max-w-md rounded-lg shadow-lg bg-white border border-gray-700">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Create an Account
        </h1>
        <form>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              name="username"
              required
              onChange={change}
              value={data.username}
              className="bg-gray-700 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none px-4 py-3 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              name="email"
              required
              onChange={change}
              value={data.emaile}
              className="bg-gray-700 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none px-4 py-3 w-full rounded"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              name="password"
              required
              onChange={change}
              value={data.password}
              className="bg-gray-700 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none px-4 py-3 w-full rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-300"
            onClick={submit}
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-blue-500 hover:text-blue-400 underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
