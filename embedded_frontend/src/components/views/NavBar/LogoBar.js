import React from 'react';
import { Link } from 'react-router-dom';
import './LogoBar.css';
import logo from "../../../imgs/logo.png"
import logo2 from "../../../imgs/logo2.png"


const LogoBar = (props) => {

    return (
        <nav className="logobar">
            <Link to="/">
                <img src={props.colorful? logo2 : logo} 
            className={props.colorful? "logo2" : "logo"}/>
            </Link>
        </nav>
    );
}

export default LogoBar;