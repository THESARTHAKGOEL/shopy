import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2>Shop-Cart</h2>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>

        {role === "admin" && (
          <>
            <Link to="/admin">Admin Panel</Link>
            <Link to="/admin/products/add">Add Product</Link>
          </>
        )}

        {role === "admin" ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={() => navigate("/login")}>Admin Login</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Navbar.css";

// const Navbar = () => {
//   const role = localStorage.getItem("role");
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/");
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchTerm.trim() !== "") {
//       navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
//       setSearchTerm("");
//     }
//   };

//   return (
//     <nav className="navbar">
//       <h2>Shop-Cart</h2>
//       <div className="links">
//         <Link to="/">Home</Link>
//         <Link to="/cart">Cart</Link>

//         {role === "admin" && (
//           <>
//             <Link to="/admin">Admin Panel</Link>
//             <Link to="/admin/products/add">Add Product</Link>
//           </>
//         )}

//         {role === "admin" ? (
//           <button onClick={handleLogout}>Logout</button>
//         ) : (
//           <button onClick={() => navigate("/login")}>Admin Login</button>
//         )}
//       </div>

      
//       <form className="search-form" onSubmit={handleSearch}>
//         <input
//           type="text"
//           placeholder="Search products..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button type="submit">Search</button>
//       </form>
//     </nav>
//   );
// };

// export default Navbar;

