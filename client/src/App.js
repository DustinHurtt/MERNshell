import React from "react";
import "./App.css";

import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import DeleteUser from "./pages/DeleteUser";

function App() {
  const navigate = useNavigate();

  let token = localStorage.getItem("authToken");

  function logout() {
    localStorage.clear();
    navigate("/");
  }

  console.log(token, "Token")

  return (
    <div>
      <div className="navbar">
        <header className="nav-wrapper">
          <div className="navIconContainer">
            <Link to="/" className="navIconImage">
              <img className="navIcon" src={""} alt="appIcon" />
            </Link>

            <h1 className="navHeadline">Mern Shell</h1>
          </div>
          {token ? (
            <nav className="nav-items">
              <Link to="/" className="icon">+Home</Link>
              <button onClick={logout} className="icon">Logout</button>
            </nav>
          ) : (
            <nav className="nav-items">
              <Link to="/" className="icon">Home</Link>
              <Link to="/signup" className="icon">Sign Up</Link>
              <Link to="/login" className="icon">Log In</Link>
            </nav>
          )}
        </header>
      </div>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/delete-user" element={<DeleteUser />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;

