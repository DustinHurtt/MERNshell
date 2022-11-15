import { useContext, useState } from "react";

import { LoadingContext } from "../contexts/load.context";

import Modal from "../components/Modal";
import Password from "../components/Password";
import ConfirmPassword from "../components/ConfirmPassword";

const ChangePassword = () => {

    const { showModal, setShowModal } = useContext(LoadingContext)

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const checkPassword = () => {
        setShowModal(!showModal)
    }

    return (

        <div>
            <h1>Change Password</h1>
            <p>Enter your current password.</p>
            <Password setPassword={setPassword}/>
            <button onClick={checkPassword}>
                Submit
            </button>
            <Modal
                buttonAction={"Submit"}
                showModal={showModal}
                // handleSubmit={handleDelete}
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