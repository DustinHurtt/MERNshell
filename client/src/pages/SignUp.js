import React from "react";
import ConfirmPassword from "../components/ConfirmPassword";
import Email from "../components/Email";
import Password from "../components/Password";
import Username from "../components/Username";
import { post } from "../authService/authService";
import { useNavigate } from "react-router-dom";

const SignUp = ({ setMessage, setIsLoading }) => {
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
      return;
    } 
    if (!regexExp.test(email)) {
      setMessage("that is not a valid email address");
      return;
    } 
    if (password.length < 6) {
      setMessage("password must be at least 6 characters");
      return;
    } 
    if (password === "password") {
      setMessage("your password can't be 'password'");
      return;
    } 
    if (password !== confirmPassword) {
      setMessage("your password didn't match");
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
          setIsLoading(false)
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