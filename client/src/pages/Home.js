import React from "react";
import { get } from "../authService/authService";

const Home = ({ setUser, setIsLoading }) => {
  React.useEffect(() => {
    setIsLoading(true);

    let token = localStorage.getItem("authToken");

    console.log("This is the token", token);

    get("/users/login-test")
      .then((results) => {
        console.log("Are we logged in?", results.data);
        setUser(results.data._id)
      })
      .catch((err) => {
        localStorage.clear();
        console.log(err.message);
      })
        .finally(() => {
          setIsLoading(false)
        });
  }, [setUser, setIsLoading]);

  return (
    <div className="home-landing">
      <div className="home-container">
        <h1 className="home-text">Welcome to the MERN Shell!</h1>
        <h2 className="home-text">Customize for your own purposes</h2>
      </div>
    </div>
  );
};

export default Home;
