import React from "react";
import { useContext } from 'react';
import { AuthContext } from "../contexts/auth.context";
import { LoadingContext } from "../contexts/load.context";
import Password from "../components/Password";
import ConfirmPassword from "../components/ConfirmPassword";
import { post } from "../authService/authService";
import { useNavigate } from "react-router-dom";

const DeleteProfile = () => {

  const { setIsLoading, setMessage, setUser, setItems, setMyItems } = useContext(LoadingContext)

  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const navigate = useNavigate();

  const checkError = (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("your password didn't match");
      setIsLoading(false);
    } else {
      post("/users/delete-user", {
        password: password,
      })
        .then((results) => {
          setUser(null);
          localStorage.clear();
          setMessage(results.data.message);
          setItems([]);
          setMyItems([]);
          navigate("/");
        })
        .catch((err) => {
          console.log("Something went wrong", err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="delete-user">
      <h1>Delete Profile</h1>
      <form onSubmit={checkError}>
        <Password setPassword={setPassword} />
        <ConfirmPassword setConfirmPassword={setConfirmPassword} />
        <button type="submit">Delete Profile</button>
      </form>
    </div>
  );
};

export default DeleteProfile;