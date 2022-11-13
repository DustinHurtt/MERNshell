import { useContext } from "react"

import { LoadingContext } from "../contexts/load.context"
import MyItems from '../pages/MyItems'

const Profile = () => {

    const { user, items, myItems } = useContext(LoadingContext)

    return (
        user && 
        
        <div>
            <h1>Profile</h1>
            <table>
                <tr>
                    <td>Username: {user.username}</td>
                    <td>Email: {user.email}</td>
                    <td><button>Change Password</button></td>
                    <td><button>Delete Profile</button></td>
                </tr>
            </table>

            <MyItems />

        </div>

    )

}

export default Profile