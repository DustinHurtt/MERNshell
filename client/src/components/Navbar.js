import { Link } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth.context';
import { LoadingContext } from "../contexts/load.context";

const Navbar = () => {

    let token = localStorage.getItem("authToken");

    let id = localStorage.getItem("id")

    console.log('THIS IS THE TOKEN', localStorage)

    
    const { 
        // user, 
        logout } = useContext(AuthContext)
        const { user, items, myItems, setMyItems } = useContext(LoadingContext)
    
    const getMyItems = () => {
        if(!myItems.length) {
            const theseItems = items.filter((item => item.contributor.includes(user._id)))
            setMyItems(theseItems)                   
        }
    }


    return (
        <div className="navbar">
            <header className="nav-wrapper">
            <div className="nav-icon-container">
                <Link to="/" className="nav-icon-image">
                <img className="nav-icon" src="https://res.cloudinary.com/dt8b5pu9l/image/upload/v1665416973/mernIcon_hir4nl.png" alt="appIcon" />
                </Link>
            </div>
            <h2 className="nav-headline">MERN Stack App</h2>
            {

                token
                ? (
                <nav className="nav-items">
                <Link to="/" className="icon">
                    Home
                </Link>
                <Link to="/items" className="icon">
                    Items
                </Link>
                <Link to={`/${id}/profile`} onClick={getMyItems} className='icon'> 
                    Profile
                </Link>
                {/* <Link to={`/${user._id}/profile`} className='icon'> 
                    Profile
                </Link> */}
                {/* <Link to={`/${user._id}/profile`} className='icon'> 
                    Profile
                </Link> */}
                <button onClick={logout} className="icon">
                    Logout
                </button>
                </nav>
            ) : (
                <nav className="nav-items">
                <Link to="/" className="icon">
                    Home
                </Link>
                <Link to="/items" className="icon">
                    Items
                </Link>
                <Link to="/signup" className="icon">
                    Sign Up
                </Link>
                <Link to="/login" className="icon">
                    Log In
                </Link>
                </nav>
            )}
            </header>
        </div>
    )    
}

export default Navbar;