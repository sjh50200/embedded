import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from '../../../imgs/police1.jpg';
import img2 from '../../../imgs/police2.jpg';
import img3 from '../../../imgs/police3.jpg';
import './DemoCarousel.css';

export default function CarouselComponent() {
    return (
        <div style={{ width: '100%', position: 'absolute', zIndex: 0 }}>
            <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true} interval={4000}>
                <div className='carousel-background' style={{ backgroundImage: `url(${img1})` }}>
                    <div className="message-box">
                        2020년 기준 뺑소니 교통사고 건수<p className="message-box-strong">7418건</p>
                    </div>
                </div>
                <div className='carousel-background' style={{ backgroundImage: `url(${img2})` }}>
                    <div className="message-box">
                        2020년 기준 뺑소니 교통사고 건수<p className="message-box-strong">7418건</p>
                    </div>
                </div>
                <div className='carousel-background' style={{ backgroundImage: `url(${img3})` }}>
                    <div className="message-box">
                        2020년 기준 뺑소니 교통사고 건수<p className="message-box-strong">7418건</p>
                    </div>
                </div>
            </Carousel>
        </div>
    )
}