import { useContext, useState } from 'react';
import { AuthContext } from "../contexts/auth.context";
import { useNavigate } from "react-router-dom";
import { post } from "../authService/authService";

import Password from "../components/Password";
import Email from "../components/Email";
import { LoadingContext } from '../contexts/load.context';

const Login = () => {

  const { authenticateUser
    // , setIsLoading, setMessage
   } = useContext(AuthContext)

   const { setIsLoading, setMessage } = useContext(LoadingContext)


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submit= (e) => {
    setIsLoading(true); 
    e.preventDefault();

    post("/users/login", {
      email: email,
      password: password
    })
      .then((results) => {
        console.log(results.data, "LOGIN RESULTS")
        localStorage.setItem("authToken", results.data.token);
        localStorage.setItem("id", results.data.id);
        setMessage(results.data.message);
        navigate("/");
      })
      .catch((err) => {
        console.log("Something went wrong", err.message);
        setMessage(err.response.data.message)
        setIsLoading(false);
      })
      .finally(() => {
        authenticateUser();
      });
  }

  return (
    <div className="home-landing">
      <div className="home-container">
        <form onSubmit={submit}>
          <Email setEmail={setEmail} />
          <Password setPassword={setPassword} />
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;