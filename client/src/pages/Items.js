import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/auth.context";
import { get, post } from "../authService/authService";

const Items = () => {

    const { setMessage } = useContext(AuthContext)

    useEffect(() => {
        get("/items", )
    }, [])

    return (

        <div>
            <h1>This is the Items page.</h1>
        </div>

    )

}

export default Items

//message: ${name} has been added to Items
//message: ${name} has been removed from Items