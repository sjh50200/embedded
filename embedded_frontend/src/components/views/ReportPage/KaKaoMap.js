/* global kakao */
import React, { useEffect, useState } from 'react';
import Crash from "../../../imgs/accidentmarker.png";

const KaKaoMap = (props) => {

    //use state는 비동기로 데이터를 가져옴 바로 뿌려주면 데이터가 안나옴
    const [cctvs, setCctvs] = useState([]);
    const [location, setLocation] = useState({});
    let linePath = [];

    useEffect(() => {
        console.log(props.info.carNum);

        fetchLocation(props.info.carNum);
        fetchCCTVs();
    }, []);
    //[]에는 update 시점을 정해준다

    useEffect(() => {
        let container = document.getElementById('map');
        let options = {
            //center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
            center: new kakao.maps.LatLng(location.mapX, location.mapY),
            level: 1
        };

        const map = new kakao.maps.Map(container, options);

        //서버에서 사고위치 가져오고 그린다.
        createAccidentMarker(location.mapX, location.mapY, map);


        //서버에서 CCTV 정보들 가져오기
        cctvs.forEach((el) => {
            new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(el.mapX, el.mapY),
                title: el.mapId + "," + el.mapX + "," + el.mapY
            });
        });

        fetchTrackInfo();

        let testlinePath = [
            new kakao.maps.LatLng(location.mapX, location.mapY),
            new kakao.maps.LatLng(37.4765938, 126.90271080000002),
            new kakao.maps.LatLng(37.4767561, 126.90340370000001),
            new kakao.maps.LatLng(37.4783869, 126.90358679999997),
        ];

        // console.log("tlp", testlinePath);
        // console.log("lp", linePath, "lp.len", linePath.length);

        let polyline = new kakao.maps.Polyline({
            path: testlinePath, //선 구성 좌표 배열
            strokeWeight: 3, //선 두께
            strokeColor: 'red',
            strokeOpacity: 0.7,
            strokeStyle: 'solid'
        })

        polyline.setMap(map);

    }, [location, cctvs, linePath]);

    const fetchTrackInfo = () => {
        fetch('http://localhost:8080/showAttacker')
            .then(res => res.json())
            .then(res => {
                let arr = res;
                let cctvNums = [];
                arr.map((idx) => {
                    cctvNums.push(idx.cctvNum);
                });

                let trackingCctv = [];
                cctvNums.map((idx) => {
                    if (cctvs.length > 100) {
                        trackingCctv.push(cctvs.find(element => element.mapId === idx));
                    }
                })

                trackingCctv.map((idx) => {
                    linePath.push(new kakao.maps.LatLng(idx.mapX, idx.mapY));
                })
            })
    }

    const fetchLocation = (carNum) => {
        fetch(`http://localhost:8080/accidentLocation/${carNum}`)
            .then(res => res.json())
            .then(res => {
                setLocation({
                    mapX: res.mapX,
                    mapY: res.mapY
                });
            })
    }

    const createAccidentMarker = (mapX, mapY, map) => {
        let imageSrc = Crash;
        let imageSize = new kakao.maps.Size(100, 65);
        let imageOption = { offset: new kakao.maps.Point(27, 69) };

        let markerImg = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
        let markerPosition = new kakao.maps.LatLng(mapX, mapY);

        let marker = new kakao.maps.Marker({
            position: markerPosition,
            image: markerImg,
            title: mapX + "," + mapY
        });

        marker.setMap(map);
    }

    const fetchCCTVs = () => {
        fetch("/cctvs")
            .then(res => res.json())
            .then(res => {
                setCctvs(res);
            })
    }

    return (
        <div style={{ width: '80%', height: "40rem", margin: '3rem auto' }}>
            <div id="map" style={{ width: "100%", height: "100%" }}></div>
        </div>
    );
}

export default KaKaoMap;