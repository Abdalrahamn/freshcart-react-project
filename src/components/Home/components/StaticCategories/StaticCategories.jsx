import React from "react";
import slider1 from "../../../../assets/images/slider-image-1.jpeg";
import slider2 from "../../../../assets/images/slider-image-2.jpeg";
import slider3 from "../../../../assets/images/slider-image-3.jpeg";
import grocery1 from "../../../../assets/images/grocery-banner.png";
import grocery2 from "../../../../assets/images/grocery-banner-2.jpeg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./StaticCategories.module.css";
import Slider from "react-slick";

export default function StaticCategories() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <>
      <h2 className="text-center text-2xl font-bold mb-10">
        Static Categories
      </h2>
      <div className="my-10 px-10 flex">
        <div className="w-9/12">
          <Slider {...settings}>
            <img src={slider1} alt="slider1" className={styles.sliderImage} />

            <img src={slider2} alt="slider2" className={styles.sliderImage} />

            <img src={slider3} alt="slider3" className={styles.sliderImage} />
          </Slider>
        </div>

        <div className="w-3/12">
          <img
            src={grocery1}
            alt="grocery1"
            className={styles.groceryImage}
            style={{ height: "300px" }}
          />
          <img
            src={grocery2}
            alt="grocery2"
            className={styles.groceryImage}
            style={{ height: "300px" }}
          />
        </div>
      </div>
    </>
  );
}
