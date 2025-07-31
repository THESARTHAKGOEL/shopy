import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${productId}`)
      .then((res) => setProduct(res.data.product))
      .catch((err) => console.error("Error fetching product", err));
  }, [productId]);

  if (!product) return <h3>Loading product...</h3>;

  return (
    <div className="product-detail-admin">
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} style={{ width: "300px" }} />
      <p>{product.description}</p>
      <h3>₹ {product.price}</h3>
    </div>
  );
};

export default ProductDetail;