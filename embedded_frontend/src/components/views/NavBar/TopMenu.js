import React from 'react';
import LogoBar from './LogoBar';
import NavBar from './NavBar';
import './TopMenu.css';
import DemoCarousel from './DemoCarousel';

const TopMenu = (props) => {

    if (props.home) {
        return (
            <div>
                <DemoCarousel />
                <LogoBar />
                <NavBar />
            </div>
        );
    } else {
        return (
            <div>
                <LogoBar colorful/>
                <NavBar colorful/>
            </div>
        )
    }
}

export default TopMenu;