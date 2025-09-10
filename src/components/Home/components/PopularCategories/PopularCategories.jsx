import { useState, useEffect } from "react";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styles from "./PopularCategories.module.css";

export default function PopularCategories() {
  const [categories, setCategories] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
  };

  async function getCategories() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className="my-10 px-10">
        <h2 className="text-center text-2xl font-bold mb-10">
          Popular Categories
        </h2>
        <Slider {...settings}>
          {categories.map((category) => (
            <div key={category._id}>
              <img
                src={category.image}
                alt={category.name}
                className={styles.categoryImage}
              />
              <h3 className="text-center">{category.name}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
