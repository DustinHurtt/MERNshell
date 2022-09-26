import React from "react";

import Username from "../components/Username";
import Password from "../components/Password";

import { post } from "../authService/authService";
import { useNavigate } from "react-router-dom";

const Login = ({setMessage}) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  const submit= (e) => {
    e.preventDefault();

    post("/users/login", {
      username: username,
      password: password
    })
      .then((results) => {
        localStorage.setItem("authToken", results.data.token);
        localStorage.setItem("id", results.data.id);
        navigate("/");
      })
      .catch((err) => {
        setMessage(err.response.data.message)
        console.log("Something went wrong", err.message);
      });
  }

  return (
    <div className="home-landing">
      <div className="home-container">
        <form onSubmit={submit}>
          <Username setUsername={setUsername} />
          <Password setPassword={setPassword} />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;