import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./UserProductDetail.css";

const UserHome = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("https://shopy-ug5z.onrender.com/").then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  };

  return (
    <div className="product-list">
      {products.map((p) => (
        <div key={p._id} className="card">
          <img src={p.image} alt={p.title} />
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          <p>₹ {p.price}</p>
          <Link to={`/products/detail/${p._id}`}>View Detail</Link>
          <button onClick={() => addToCart(p)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default UserHome;
