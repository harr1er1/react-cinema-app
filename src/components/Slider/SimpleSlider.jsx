import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import img from "../../assets/img/background/banner.jpeg"

const SimpleSlider = () => {var settings = 
    {dots: true,
      infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <Slider {...settings}>
      <div>
        <img src= {img} alt=""/>
      </div>
      <div>
        <img src= {img} alt=""/>
      </div>
      <div>
        <img src= {img} alt=""/>
      </div>
      <div>
        <h3>4</h3>
      </div>
      <div>
        <h3>5</h3>
      </div>
      <div>
        <h3>6</h3>
      </div>
    </Slider>
  );
}

export default SimpleSlider;