import React, {useEffect, useState} from 'react';
import TopMenu from '../NavBar/TopMenu';
import "./AccidentPage.css";

const AccidentPage = () => {

    const [accidents, setAccidents] = useState([]);

    useEffect(() => {
        fetchAccidents();
    }, [])

    const fetchAccidents = () => {
        fetch("/showAccidents")
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setAccidents(res);
        })
    }

    const makeAccidentTable = () => {
        return (
            accidents.map((idx) => {
                return (
                    <tr>
                        <td>{idx.idx}</td>
                        <td>{idx.mapX}</td>
                        <td>{idx.mapY}</td>
                    </tr>
                )
            })
        )
    }

    return(
        <div>
            <TopMenu />
            <table style={{ width: '50%', margin: '3rem auto' }}>
                <th>사고 번호</th>
                <th>경도</th>
                <th>위도</th>
                <tbody>
                    {makeAccidentTable()}
                </tbody>
            </table>
        </div>
    )
}

export default AccidentPage;