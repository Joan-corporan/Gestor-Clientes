// Navbar.js
import React from "react";
import "./login.css"; 


const NavbarLogin = () => {

 
  return (
    <nav style={{
        backgroundColor: "#15616D",
        height:"50px",
        color: "#fff",
        display: "flex",
        
        justifyContent: "center",
        alignItems: "center",
        padding: "15px",
     
        width: "100%",
        
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        transition: "background-color 0.3s ease",
  
    }} className="Login">
      <div  className="navbar-title">Gestor de Clientes</div>
      
    </nav>
  );
};

export default NavbarLogin;
