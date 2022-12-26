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
        
        <div className="page">
            <h1>Profile</h1>
            <div>

                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    
                    <button onClick={handleChangePassword}>Change Password</button>
                    
                    <button onClick={handleDeleteProfile}>Delete Profile</button>

            </div>

            <MyItems />

        </div>

    )

}

export default Profile