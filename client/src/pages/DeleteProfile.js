import {useState } from "react";
import { useContext } from 'react';
import { AuthContext } from "../contexts/auth.context";
import { LoadingContext } from "../contexts/load.context";
import { post } from "../authService/authService";
import { useNavigate } from "react-router-dom";

import Password from "../components/Password";
import ConfirmPassword from "../components/ConfirmPassword";
import Modal from "../components/Modal";

const DeleteProfile = () => {

  const { showModal, setShowModal, setIsLoading, setMessage, setUser, setItems, setMyItems } = useContext(LoadingContext)

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

        <Password setPassword={setPassword} />
        <ConfirmPassword setConfirmPassword={setConfirmPassword} />
        <button onClick={() => {setShowModal(!showModal)}}>Delete Profile</button>

      <Modal
        buttonAction={"Delete Profile"}
        showModal={showModal}
        handleSubmit={checkError}
        closeModal={() => {
          setShowModal(false);
        }}>
        <h3>Are you sure you would like to delete your profile?</h3>
      </Modal>
    </div>
  );
};

export default DeleteProfile;