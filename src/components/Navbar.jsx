import React, { useEffect, useState } from "react";
/* import "./login.css"; */
import { motion } from "framer-motion";
import "./estilosNavbar.css";
import { useNavigate } from "react-router";
import {validateRut, formatRut} from "@fdograph/rut-utilities"

const Navbar = () => {
  const navegate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

const admin= localStorage.getItem("admin")==="true";
  const nombreUserLogiado = localStorage.getItem("userName");
 
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRut");
    localStorage.removeItem("admin");
    navegate("/");
  };


console.log(".........................................")


console.log("Rut validado para poder iniciar sesion:54735492-3 ")
console.log(validateRut(formatRut("54735492-3")))
console.log("Contraseña: Joan123")
console.log(".........................................")



  const btnRegistrarPersonal = () => {
    navegate("/register");
  };
  const btnRegistrarCliente = () => {
    navegate("/registro-cliente");
  };

  const btnListaUsers = () => {
    navegate("/lista-users");
  };

  const btnInicio = () => {
    navegate("/clientes-filtrados");
  };
  const btnDasboard = () => {
    navegate("/dashboard");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav
      style={{
        color: "#fff",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "15px",
        width: "100%",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        transition: "background-color 0.3s ease",
      }}
      className="navbar"
    >
      
      <div className="userbotonHamburguesa">
       
        <div className="navbar-options">
          <button
            onClick={toggleMenu}
            
            className="hamburger-button"
          >
            &#9776; {/* Icono de menú hamburguesa */}
          </button>

          {menuOpen && (
            <motion.div className="menu"initial={{ opacity: 0, x: "-100%" }}
            animate={menuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: "-100%" }} 
            transition={{ duration: 0.5, ease: "easeInOut" }} >
              <button onClick={btnDasboard} className="register-button">
                <span className="keyf">Inicio</span>
                
              </button>
              <button onClick={btnInicio} className="register-button">
                <span className="keyf">Filtro Clientes</span>
                
              </button>
              <button onClick={btnRegistrarCliente} className="register-button">
                <span className="keyf">Registrar Cliente</span>
                
              </button>
              {admin && (
              <>
               <button
                onClick={btnRegistrarPersonal}
                className="register-button"
              >
                <span className="keyf"> Registrar Personal</span>
              </button>

              <button onClick={btnListaUsers} className="register-button">
                <span className="animate:bonce">Lista de Usuarios</span>
              </button>
              </>
             )}
             
            </motion.div>
          )}
       
        </div>
      </div>
      <div  className="navbar-title">
        <span>Gestor de Clientes</span>
        
      </div>
  <h4>
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {nombreUserLogiado}
            <img style={{marginLeft:"10px"}} src="/user.svg" alt="" />
            <button style={{marginLeft:"30px", backgroundColor:"#15616D" }}  onClick={handleLogout} >
                
            <img  src="/logout.svg" alt="icon" />
              </button>

          </span>
        </h4>
      
    </nav>
  );
};

export default Navbar;
