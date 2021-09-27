import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryStack } from 'victory';
import "./common/Chart.css";

const InjuredChart = () => {
    const data = [
        { quarter: 1, earnings: 12274 },
        { quarter: 2, earnings: 11433 },
        { quarter: 3, earnings: 11099 },
        { quarter: 4, earnings: 10285 },
        { quarter: 5, earnings: 10419 }
    ];

    return (
        <div className="chart-size">
            <p className="title-style">부상자 수</p>
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
                        tickFormat={(x) => `${((x / 1000) + 2) * 1000}`}
                    />
                    <VictoryStack colorScale={"warm"}>
                        <VictoryBar data={data} x="quarter" y="earnings" />
                    </VictoryStack>
                </VictoryChart>
            </div>
        </div>
    );
}

export default InjuredChart;