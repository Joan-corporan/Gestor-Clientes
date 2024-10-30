// Register.js
import React, { useState } from "react";
/* import "./login.css"; */ 
import "./estilosTableListUser.css" 
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from 'framer-motion';
import {validateRut, formatRut} from "@fdograph/rut-utilities"

import Navbar from "./Navbar";

const Register = () => {
  const [errores, setErrores] = useState({});
 

  const [userR, setUserR] = useState({
    rut: "",
    name:"",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {

    const { name, value } = e.target;
    setUserR({
      ...userR,
      [name]: value,
    });
  };

  const validarContraseña = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return regex.test(password);
  };
  const validarNombre = (nombre) => {
    const regex =  /^[a-zA-ZñáéíóúÁÉÍÓ��\s]+$/;
    return regex.test(nombre);  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  const URL="https://api-storbox-prueba.vercel.app/api/clients/"
 /* const URL="http://localhost:3000/api/clients/" */


    const token = localStorage.getItem("token");
  
    if (
      userR.rut === "" ||
      userR.password === "" ||
      userR.confirmPassword === ""
    ) {
      return Swal.fire({
        title: "¡Error!",
        text: `Debes llenar los campos RUT, Nombre y Contraseña`,
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
    if (!token) {
      return Swal.fire({
        title: "¡Error!",
        text:"No se encontró el token de autenticación. Inicia sesión."   ,
        icon: "error",
        confirmButtonText: "Aceptar",
      }); 
      
      
    }
    if (!validateRut(formatRut(userR.rut))) {
      return Swal.fire({
        title: "¡Error!",
        text:"El rut ingresado no es válido"   ,
        icon: "error",
        confirmButtonText: "Aceptar",
      });  ;
    }
    if (!validarContraseña(userR.password)) {
      return Swal.fire({
        title: "¡Error!",
        text:"La contraseña debe tener al menos 6 caracteres, incluir una letra mayúscula, una letra minúscula y un número"   ,
        icon: "error",
        confirmButtonText: "Aceptar",
      }); 
    }
    if(!validarNombre(userR.name)){
      return Swal.fire({
        title: "¡Error!",
        text: "El nombre ingresado no es válido",
        icon: "error",
        confirmButtonText: "Aceptar",
      }); 
    }
    if (userR.password !== userR.confirmPassword) {
      return Swal.fire({
        title: "¡Error!",
        text: `"Las contraseñas no coinciden"`,
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
    try {
     
        const response = await axios.post(
          `${URL}registrarse`,
          userR,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        setUserR({
          rut: "",
          name:"",
          password: "",
          confirmPassword: "",
        });
        console.log(response)
        Swal.fire({
            title: '¡Exito!',
            text: `${response.data.message}`,
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
          setErrores("");
      
    }catch (error) {
      console.log("Error al registrar", error);
      const errorMessage = error.response?.data?.message || "Error inesperado";
      Swal.fire({
        title: '¡Error!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
    
  };

  return (
    <>
      <Navbar />
      <motion.div 
      className="contenedor-registrar-personal"
      initial={{ x: '-100%', opacity: 0 }} // Comienza fuera de la vista desde la izquierda
      animate={{ x: 0, opacity: 1 }} // Se desplaza a su posición original
      exit={{ x: '100%', opacity: 0 }} // Se mueve fuera de la vista hacia la derecha al salir
      transition={{ duration: 1 }} // Duración de la animación
      >
        <h2>Registrar Personal</h2>
        <form onSubmit={handleSubmit} style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}>
  <table style={{display:"flex",justifyContent:"center"}} className="form-table-register">
    <tbody>
      <tr>
        <td>
          <label htmlFor="rut">Rut:</label>
        </td>
        <td>
          <input
            onChange={handleChange}
            type="text"
            name="rut"
            value={userR.rut}
            placeholder="12345678-2"
            /* required */
          />
        
        </td>
      </tr>
      <tr>
        <td>
          <label htmlFor="name">Nombre:</label>
        </td>
        <td>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            value={userR.name}
            placeholder="Pedro"
            /* required */
          />
        
        </td>
      </tr>
      <tr>
        <td>
          <label htmlFor="password">Contraseña:</label>
        </td>
        <td>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            value={userR.password}
            placeholder="Ejemplo123"
            /* required */
          />
        
        </td>
      </tr>
      <tr>
        <td>
          <label htmlFor="confirmPassword">Repetir Contraseña:</label>
        </td>
        <td>
          <input
            onChange={handleChange}
            type="password"
            name="confirmPassword"
            value={userR.confirmPassword}
            placeholder="Ejemplo123"
            /* required */
          />
        </td>
      </tr>
      <tr>
        <td colSpan="2" className="button-row">
          <button
            style={{ backgroundColor: "#15616D", marginTop: "10px" }}
            type="submit"
          >
            Registrarse
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</form>

      </motion.div>
    </>
  );
};

export default Register;
