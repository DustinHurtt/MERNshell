import React from "react";
import { useContext } from 'react';
import { AuthContext } from "../contexts/auth.context";
import { useNavigate } from "react-router-dom";
import { post } from "../authService/authService";
import ConfirmPassword from "../components/ConfirmPassword";
import Email from "../components/Email";
import Password from "../components/Password";
import Username from "../components/Username";

const SignUp = () => {

  const { authenticateUser, setIsLoading, setMessage } = useContext(AuthContext)

  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const navigate = useNavigate();

  const regexExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
    

  const checkError = (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (username.length < 4) {
      setMessage("username must be at least four characters");
      setIsLoading(false);
      return;
    } 
    if (!regexExp.test(email)) {
      setMessage("that is not a valid email address");
      setIsLoading(false);
      return;
    } 
    if (password.length < 6) {
      setMessage("password must be at least 6 characters");
      setIsLoading(false);
      return;
    } 
    if (password === "password") {
      setMessage("your password can't be 'password'");
      setIsLoading(false);
      return;
    } 
    if (password !== confirmPassword) {
      setMessage("your password didn't match");
      setIsLoading(false);
      return;
    } 

      post("/users/signup", {
        username: username,
        password: password,
        email: email,
      })
        .then((results) => {
          localStorage.setItem("authToken", results.data.token);
          localStorage.setItem("id", results.data.id);
          setMessage(`Welcome ${username}!`);
          navigate("/");
        })
        .catch((err) => {
          setMessage(err.response.data.message);
          console.log("Something went wrong", err.message);
        })
        .finally(() => {
          authenticateUser();
        });
  };

  return (
    <div className="home-landing">
      <div className="home-container">
        <form onSubmit={checkError}>
          <Username setUsername={setUsername} />
          <Email setEmail={setEmail} />
          <Password setPassword={setPassword} />
          <ConfirmPassword setConfirmPassword={setConfirmPassword} />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;