import React, { useState } from "react";
import "./App.css";

import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import DeleteUser from "./pages/DeleteUser";

import { get } from './authService/authService'

const App = () => {
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  let token = localStorage.getItem("authToken");

  React.useEffect(() => {
    // let token = localStorage.getItem("authToken");
    console.log("This is the token", token);
    get("/users/login-test")
      .then((results) => {
        console.log("Are we logged in?", results.data);
        // setMessage(results.data.message);
      })
      .catch((err) => {
        localStorage.clear();
        console.log(err.message);
        token=null;
      });
  }, []);

  const logout = () => {
    localStorage.clear();
    setMessage("You are logged out.");
    navigate("/");
  };

  return (
    <div>
      <div className="navbar">
        <header className="nav-wrapper">
          <div className="nav-icon-container">
            <Link to="/" className="nav-icon-image">
              <img className="nav-icon" src={""} alt="appIcon" />
            </Link>

            <h2 className="nac-headline">Mern Shell</h2>
          </div>
          {token ? (
            <nav className="nav-items">
              <Link to="/" className="icon">
                Home
              </Link>
              <Link to="/delete-user" className="icon">
                Delete User
              </Link>
              <button onClick={logout} className="icon">
                Logout
              </button>
            </nav>
          ) : (
            <nav className="nav-items">
              <Link to="/" className="icon">
                Home
              </Link>
              <Link to="/signup" className="icon">
                Sign Up
              </Link>
              <Link to="/login" className="icon">
                Log In
              </Link>
            </nav>
          )}
        </header>
      </div>

      <Routes>
        <Route path="/" element={<Home setMessage={setMessage} />}></Route>
        <Route
          path="/signup"
          element={<SignUp setMessage={setMessage} />}
        ></Route>
        <Route
          path="/login"
          element={<Login setMessage={setMessage} />}
        ></Route>
        <Route
          path="/delete-user"
          element={<DeleteUser setMessage={setMessage} />}
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>

      {message && <p>{message}</p>}
    </div>
  );
};

export default App;
