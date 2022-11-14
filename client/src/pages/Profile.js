import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import { LoadingContext } from "../contexts/load.context"
import MyItems from '../pages/MyItems'

const Profile = () => {

    const { user, items, myItems } = useContext(LoadingContext);

    const navigate = useNavigate()

    const handleChangePassword = () => {
        navigate(`/${user._id}/change-password`)
    }

    const handleDeleteProfile = () => {
        navigate(`/${user._id}/delete-profile`)
    }

    return (
        user && 
        
        <div>
            <h1>Profile</h1>
            <table>
                <tr>
                    <td>Username: {user.username}</td>
                    <td>Email: {user.email}</td>
                    <td><button onClick={handleChangePassword}>Change Password</button></td>
                    <td><button onClick={handleDeleteProfile}>Delete Profile</button></td>
                </tr>
            </table>

            <MyItems />

        </div>

    )

}

export default Profile