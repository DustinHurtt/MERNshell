import { Link } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth.context';
import AppIcon from '../mernIcon.png'

const Navbar = () => {

    const { user, logout } = useContext(AuthContext)

    return (
        <div className="navbar">
            <header className="nav-wrapper">
            <div className="nav-icon-container">
                <Link to="/" className="nav-icon-image">
                <img className="nav-icon" src={AppIcon} alt="appIcon" />
                </Link>
            </div>
            <h2 className="nav-headline">Mern Shell</h2>
            {user ? (
                <nav className="nav-items">
                <Link to="/" className="icon">
                    Home
                </Link>
                <Link to="/delete-user" className="icon">
                    Delete User
                </Link>
                <button onClick={logout} className="icon">
                    Logout
                </button>
                </nav>
            ) : (
                <nav className="nav-items">
                <Link to="/" className="icon">
                    Home
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