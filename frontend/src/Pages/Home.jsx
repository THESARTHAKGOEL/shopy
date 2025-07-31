import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/");
    }

    axios.get("http://localhost:3000/").then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  return (
    <div className="admin-home">
      <h2>Admin Dashboard</h2>
      {products.map((p) => (
        <div key={p._id} className="card">
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          <Link to={`/admin/products/detail/${p._id}`}>Details</Link>
        </div>
      ))}
    </div>
  );
};

export default Home;