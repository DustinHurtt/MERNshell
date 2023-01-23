import { Link } from "react-router-dom";
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/auth.context';
import { LoadingContext } from "../contexts/load.context";

const MobileNavBar = () => {

    const [isOpen, setIsOpen] = useState(false)

    let token = localStorage.getItem("authToken");

    let id = localStorage.getItem("id")

    
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

    const openMenu = () => {

    }


    return (
        <div className="mobile-navbar" >
            <header className="nav-wrapper">
            <div className="nav-icon-container">
                <Link to="/" className="nav-icon-image">
                <img className="nav-icon" src="https://res.cloudinary.com/dt8b5pu9l/image/upload/v1665416973/mernIcon_hir4nl.png" alt="appIcon" />
                </Link>
            </div>
            <h2 className="nav-headline">MERN Stack App</h2>
            <button style={{visibility: !isOpen ? "visible" : "hidden", height: !isOpen ? "100%" : "0px"}} id="hamburger" class="hamburger" aria-label="Show Navigation Menu" aria-expanded="false" tabindex="0" onClick={()=>{setIsOpen(!isOpen)}}>☰</button>
            {

                token
                ? (
                <nav style={{visibility: isOpen ? "visible" : "hidden", height: isOpen ? "100%" : "0px", width: !isOpen ? "0px": "fit content"}} className="nav-items">
                <button id="close-nav-menu" class="close-btn" aria-label="Hide Navigation Menu" onClick={()=>{setIsOpen(!isOpen)}}>×</button>
                <Link to="/" className="icon">
                    Home
                </Link>
                <Link to="/items" className="icon">
                    Items
                </Link>
                <Link to={`/${id}/profile`} onClick={getMyItems} className='icon'> 
                    Profile
                </Link>
                <button onClick={logout} className="icon">
                    Logout
                </button>
                </nav>
            ) : (
                <nav style={{visibility: isOpen ? "visible" : "hidden", height: isOpen ? "100%" : "0px"}} className="mobile-nav-items">
                <button id="close-nav-menu" class="close-btn" aria-label="Hide Navigation Menu">×</button>
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

export default MobileNavBar;