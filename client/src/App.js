import "./App.css";
// import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useContext, useCallback } from "react";
import { AuthContext } from "./contexts/auth.context";
import { LoadingContext } from "./contexts/load.context";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import DeleteProfile from "./pages/DeleteProfile";
import Items from "./pages/Items";
import MyItems from "./pages/MyItems";
import DeleteItem from "./pages/DeleteItem";
import UpdateItem from "./pages/UpdateItem";

import Loading from "./components/Loading";

const App = () => {

  const { verifiedToken, isLoading, message } = useContext(LoadingContext)

  let token = localStorage.getItem("authToken");

  const LoggedIn = useCallback(() => {
    return token ? <Outlet /> : <Navigate to="/" />;
  }, [token]);

  const NotLoggedIn = useCallback(() => {
    return !token ? <Outlet /> : <Navigate to="/" />;
  }, [token]);

  

  return (
    <div>

      <Navbar/>

      <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/items" element={<Items />} />

        <Route element={<LoggedIn />}>
          <Route path="/:id/profile" element={<Profile />} />
          <Route path="/:id/change-password" element={<ChangePassword />} />
          <Route path="/:id/delete-profile" element={<DeleteProfile />} />
          <Route path="/:id/my-items" element={<MyItems />}/>
          <Route path="/:id/delete-item" element={<DeleteItem />}/>
          <Route path="/:id/update-item" element={<UpdateItem />}/>
        </Route>

        <Route element={<NotLoggedIn />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Route>

      </Routes>

      {message && <p>{message}</p>}
      {isLoading && <Loading />}
      
    </div>
  );
};

export default App;