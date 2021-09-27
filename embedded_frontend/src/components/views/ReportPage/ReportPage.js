import React from 'react';
import {Link} from 'react-router-dom';
import TopMenu from '../NavBar/TopMenu';
import Reports from './Reports';
import './ReportPage.css';

const ReportPage = () => {

    const view = () =>{
        return(
            <Link to="/acc/map"></Link>
        )
    }

    return (
        <div>
            <TopMenu />
            <Reports style={{ width: '85%', margin: '3rem auto' }}/>
        </div>
    );
}

export default ReportPage;