import React, { useEffect } from "react";
import Home from "./pages/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import AllTask from "./pages/AllTask";
import ImportantTask from "./pages/ImportantTask";
import CompleteTask from "./pages/CompleteTask";
import InCompleteTask from "./pages/InCompleteTask";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { useSelector } from "react-redux";

function App() {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    if (!isLogin) {
      navigate("/signin");
    } else {
      navigate("/");
    }
  }, []);
  return (
    <div className="bg-gray-700 text-white h-screen p-2 relative">
      <Routes>
        <Route exact path="/" element={<Home />}>
          <Route index element={<AllTask />} />
          <Route path="/importantTask" element={<ImportantTask />} />
          <Route path="/incompleteTask" element={<InCompleteTask />} />
          <Route path="/completedTask" element={<CompleteTask />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </div>
  );
}

export default App;
