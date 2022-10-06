import "./App.css";
import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./contexts/auth.context";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import DeleteUser from "./pages/DeleteUser";
import Navbar from "./components/Navbar";

const App = () => {

  const { isLoading, message } = useContext(AuthContext)

  let token = localStorage.getItem("authToken");

  const LoggedIn = () => {
    return token ? <Outlet /> : <Navigate to="/" />;
  };

  const NotLoggedIn = () => {
    return !token ? <Outlet /> : <Navigate to="/" />;
  };

  return (
    <div>

      <Navbar/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route element={<LoggedIn />}>
          <Route path="/delete-user" element={<DeleteUser />} />
        </Route>
        <Route element={<NotLoggedIn />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>

      {message && <p>{message}</p>}
      {isLoading && <p>Loading...</p>}
      
    </div>
  );
};

export default App;