import React, { useState } from 'react';
import "./AboutPage.css";
import { Col, Row } from 'antd';
import 'antd/dist/antd.css';
import img from "../../../imgs/tot.jpg";
import TopMenu from '../NavBar/TopMenu';

const AboutPage = () => {

    const [members, setMembers] = useState([
        { name: "성 종 현", role: "React.js, Spring boot" },
        { name: "김 재 현", role: "Python model" },
        { name: "김 재 현", role: "Raspberry Pi" },
        { name: "최 민 준", role: "Swift" },
        { name: "허 예 원", role: "Swift" }
    ]);

    const makeImg = () => {
        return (
            members.map((idx) => {
                return (
                    <Col xs={24} sm={12} md={8} lg={8} style={{ paddingBottom: '2rem' }}>
                        <img className='profileImage' src={img} alt={null}></img>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            {makeTable(idx)}
                        </div>
                    </Col>
                )
            })
        );
    }

    const makeTable = (idx) => {
        return (
            <table style={{ width: '40%'}}>
                <tr>
                    <td>이름</td>
                    <td>{idx.name}</td>
                </tr>

                <tr>
                    <td>역할</td>
                    <td>{idx.role}</td>
                </tr>
            </table>
        )
    }
    return (
        <div>
            <TopMenu />
            <Row style={{margin: 'auto', width: '70%', paddingTop: '3rem'}}>
                {makeImg()}
            </Row>
        </div>
    );
}

export default AboutPage;