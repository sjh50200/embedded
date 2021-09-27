import React from 'react';
import { Link } from 'react-router-dom';
import "./commons/MenuDetails.css";

const SearchMenu = () => {
    return (
        <div className="box-style">
            <ul className="list-style">
                <p className="subtitle-style">DB 조회</p>
                <li className="option-position">
                    <Link to='/acc' className="option-style">
                        - 사고 조회
                    </Link>
                </li>
                <li className="option-position">
                    <Link to='/report' className="option-style">
                        - 신고 조회
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default SearchMenu;