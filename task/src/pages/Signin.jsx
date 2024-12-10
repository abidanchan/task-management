import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authActions } from "../store/auth";
function Signin() {
  const [data, setData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      if (data.username === "" || data.password === "") {
        alert("Please fill in all fields");
      } else {
        const response = await axios.post(
          "http://localhost:3000/api/v1/login",
          data
        );
        setData({ username: "", password: "" });
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        dispatch(authActions.login());
        navigate("/");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="p-8 w-full max-w-md rounded-lg shadow-lg bg-white border border-gray-700">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Log in to your Account
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
              value={data.username}
              onChange={change}
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
              value={data.password}
              onChange={change}
              className="bg-gray-700 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none px-4 py-3 w-full rounded"
            />
          </div>
          <button
            type="submit"
            onClick={submit}
            className="w-full py-3 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-300"
          >
            Sign In
          </button>
        </form>
        <p className="mt-6 text-center text-gray-400 text-sm">
          Not having an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 hover:text-blue-400 underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signin;
