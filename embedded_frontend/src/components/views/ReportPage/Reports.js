import React, { useState,useEffect } from 'react';
import KaKaoMap from './KaKaoMap';
import "./Reports.css";

const Reports = () => {

    const [clicked, setClicked] = useState(false);
    const [carInfo, setCarInfo] = useState({});
    const [carInfos, setCarInfos] = useState([]);

    // const carInfos = [
    //     {
    //         number: 1,
    //         type: "Sonata",
    //         carNum: "1234가",
    //     },
    //     {
    //         number: 2,
    //         type: "Avante",
    //         carNum: "5678나",
    //     }
    // ]

    useEffect(() => {
        fetchReports();
    }, [])

    const fetchReports = () => {
        fetch("/showReports")
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setCarInfos(res);
        })
    }

    const makeTable = () => {
        return (
            carInfos.map((idx) => {
                return (
                    <tr>
                        <td id="number">{idx.idx}</td>
                        <td>{idx.userId}</td>
                        <td>{idx.carType}</td>
                        <td>{idx.carNum}</td>
                        <td><button id="show" onClick={() => { setClicked(!clicked); setCarInfo(idx);}}>
                            조회하기</button></td>
                    </tr>
                );
            })
        );
    }

    if (clicked === false) {
        return (
            <div style={{ width: '50%', margin: '3rem auto' }}>
                <table>
                    <th>신고 번호</th>
                    <th>아이디</th>
                    <th>차종</th>
                    <th>차량 번호</th>
                    <th>조회</th>
                    <tbody>
                        {makeTable()}
                        {console.log(clicked)}
                    </tbody>
                </table>
            </div>
        );
    } else {
        return (
            <div>
                <KaKaoMap info={carInfo}/>
                <button id="back" onClick={() => {setClicked(!clicked)}}></button>
            </div>
        );
    }
}

export default Reports;