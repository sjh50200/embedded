import React from 'react';
import TopMenu from '../NavBar/TopMenu';
import AccChart from './chart/AccChart';
import DeadChart from './chart/DeadChart';
import InjuredChart from './chart/InjuredChart';
import "./Home.css";

const Home = () => {
    return (
        <div style={{display: 'block'}}>
            <TopMenu home/>            
            <div className = "first-box">
                <AccChart style = {{border: '1px solid blue'}}/>
                <DeadChart style = {{border: '1px solid blue'}}/>
                <InjuredChart style = {{border: '1px solid blue'}}/>
            </div>
            <div className = "content-style-odd" id = "first">
                뺑소니(영어: hit and run)는 교통 사고 후에 도주하는 것을 일컫는다.
                뺑소니는 특가법상에서 다루고 있는 범죄 행위로서, 대법원 판례는 인명피해가 발생한 경우에 뺑소니에 해당한다고 보는데,
                운전자가 교통 사고를 낸 후 피해자에 대해 적절한 조치 없이 도주하는 것을 의미한다.
            </div>
            <hr/>
            <div className = "content-style-even">
            https://www.mk.co.kr/news/society/view/2017/10/662664/
                주차뺑소니 수사는 충돌이 언제 일어났는지를 규명하는 것이 시작이다. 블랙박스 녹화 영상은 충돌 시점을 규명할 핵심적 단서다. 충돌 부위가 블랙박스에 찍히지 않는 차량 옆면이나 뒷면이라도 충돌 시 소리와 함께 화면이 흔들리기 때문이다.
                경찰 관계자는 "언제 충돌이 일어났는지만 확인이 되면 주변 방범용 CCTV, 목격자 진술 등 다양한 단서 활용이 가능하지만, 충돌 시간이 불분명하면 사건 해결 확률이 급격히 떨어진다"고 설명했다.                
            </div>
            <hr/>
            <div className = "content-style-odd" id = "third">
            위의 차트를 보게 되면 근래 5년간 뺑소니 사고의 해결이 뚜렷하게 나아지지 않음을 보게 될 수 있습니다.
            </div>
        </div>
    );
}

export default Home;