import { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import { LoadingContext } from "../contexts/load.context";

import { post } from "../authService/authService";

import Modal from "../components/Modal";
import Password from "../components/Password";
import ConfirmPassword from "../components/ConfirmPassword";

const ChangePassword = () => {

    const { showModal, setShowModal, setMessage } = useContext(LoadingContext)

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const params = useParams()

    const checkPassword = (e) => {
        e.preventDefault()
        post(`/users/${params.id}/check-password`, {password: password})
        .then((results) => {
            console.log(results, "results from check password")
            setShowModal(!showModal)
            setPassword('')

        })
        .catch((err) => {
            console.log(err)
        })
    }

    const changeSubmit = () => {
        console.log(password, "This is cleared password after check")

        if(password === confirmPassword){
        
        post(`/users/${params.id}/change-password`, {password})
            .then((result) => {
                console.log("THESE ARE THE CHANGE RESULTS", result)
                setMessage(result.data.message)
                setShowModal(false)
                console.log("we've hit the change password route")
                setPassword('')
            })
            .catch((err) => {
                console.log(err)
            })
        } else {
            setMessage("password doesn't match")
        }
    }

    return (

        <div>
            <h1>Change Password</h1>
            <p>Enter your current password.</p>
            <form onSubmit={checkPassword}>
                <Password setPassword={setPassword}/>
                <button 
                // type="submit"
                >Submit</button>
            </form>
            <Modal
                buttonAction={"Change Password"}
                showModal={showModal}
                handleSubmit={changeSubmit}
                closeModal={() => {
                setShowModal(false);
                }}>
                <h3>Enter and confirm your new password.</h3>
                <Password setPassword={setPassword}/>
                <ConfirmPassword setConfirmPassword={setConfirmPassword}/>
            </Modal>

        </div>

    )

}

export default ChangePassword