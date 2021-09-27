import React, { useState } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { Dropdown } from 'antd';
import "antd/dist/antd.css";
import SearchMenu from './MenuDetails/SearchMenu';

const NavBar = (props) => {

    const [open, setOpen] = useState(false);

    return (
        <nav className={props.colorful ? "navbar-colorful" : "navbar"}>
            <ul className={open ? 'nav-links active' : 'nav-links'}>
                <li>
                    <Dropdown overlay={SearchMenu} placement="bottomLeft" trigger={['click']}>
                        <div className="nav-menu">
                            조회
                        </div>
                    </Dropdown>
                </li>
                <li>
                    <Link to="/about" onClick={() => setOpen(false)}>
                        <div className="nav-menu">
                            팀 소개
                        </div>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;