import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import "./common/Chart.css";

const DeadChart = () => {
    const data = [
        { quarter: 1, earnings: 151 },
        { quarter: 2, earnings: 150 },
        { quarter: 3, earnings: 107 },
        { quarter: 4, earnings: 90 },
        { quarter: 5, earnings: 97 }
    ];

    return (
        <div className = "chart-size" style={{marginRight: '2rem'}}>
            <p className="title-style">사망자 수</p>
            <div style={{ border: '1px solid black' }}>
                <VictoryChart domainPadding={30}>
                    <VictoryAxis
                        // tickValues는 축 위의 점의 개수와 위치를 지정합니다.
                        tickValues={[1, 2, 3, 4, 5]}
                        tickFormat={["2016", "2017", "2018", "2019", "2020"]}
                    />
                    <VictoryAxis
                        dependentAxis
                        //tickFormat은 점이 어떻게 보여질지를 지정합니다.
                        tickFormat={(x) => `${((x / 10) + 1) * 10}`}
                    />
                    <VictoryBar data={data} x="quarter" y="earnings" />
                </VictoryChart>
            </div>
        </div>
    );
}

export default DeadChart;