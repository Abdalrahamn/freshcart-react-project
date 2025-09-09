import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductItem from "../../../shared/ProductItem/ProductItem";

export default function RelatedProducts(props) {
  const { id, categoryId } = props;
  const [relatedProducts, setRelatedProducts] = useState([]);

  function getRelatedProducts() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((data) => {
        setRelatedProducts(
          data.data.data.filter(
            (product) =>
              product.id !== id && product.category._id === categoryId
          )
        );
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getRelatedProducts();
  }, [id, categoryId]);

  return (
    <div className="flex flex-wrap gap-2 justify-center items-center my-15">
      {relatedProducts.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}
