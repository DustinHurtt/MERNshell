import React from "react";
import Password from "../components/Password";
import ConfirmPassword from "../components/ConfirmPassword";
import { post } from "../authService/authService";
import { useNavigate } from "react-router-dom";

const DeleteUser = ({ setUser, setMessage, setIsLoading }) => {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const navigate = useNavigate();

  const checkError = (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("your password didn't match");
    } else {
      post("/users/delete-user", {
        password: password,
      })
        .then((results) => {
          setUser("");
          localStorage.clear();
          setMessage("user deleted");
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
    <div>
      <h1>This is Delete User</h1>
      <form onSubmit={checkError}>
        <Password setPassword={setPassword} />
        <ConfirmPassword setConfirmPassword={setConfirmPassword} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DeleteUser;