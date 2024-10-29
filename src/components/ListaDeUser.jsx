import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Swal from "sweetalert2";
import"./estilosTableListUser.css"
import { motion } from 'framer-motion';
import { useNavigate } from "react-router";

import "./login.css";

export const ListaDeUser = () => {
  const [listtaUser, setListaUser] = useState([]);
  const token = localStorage.getItem("token");
  const URL="https://api-storbox-prueba.vercel.app/api/clients/"
/*   const URL="http://localhost:3000/api/clients/" */



  const rutUserLogger = localStorage.getItem("userRut");
 console.log(rutUserLogger)



  const getListaU = async () => {
    try {
        const response = await axios.get(
      `${URL}getUserList?rut=${rutUserLogger}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setListaUser(response.data);
    } catch (error) {
      console.log(error)
      Swal.fire({
        title: "Error al obtener los usuarios!",
        text: `${error.response.data.message}`,
        icon: "error",
        confirmButtonText: "Aceptar",
      })
    }
  
  };

  useEffect(() => {
    getListaU();
  }, []);

  const deleteUserOfList = async (user) => {
    console.log("Eliminando usuario con RUT:", user.rut);
    try {
      const response = await axios.delete(
        `${URL}usuarios/${user.rut}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      getListaU();
      Swal.fire({
        title: "Usuario eliminado!",
        text: "El usuario ha sido eliminado exitosamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      console.log("Error al eliminar el usuario", error.message);
    }
  };

  // Aquí está la llave faltante:
  return (
    <>
      <Navbar />
      <motion.div 
       initial={{ x: '-100%', opacity: 0 }} // Comienza fuera de la vista desde la izquierda
       animate={{ x: 0, opacity: 1 }} // Se desplaza a su posición original
       exit={{ x: '100%', opacity: 0 }} // Se mueve fuera de la vista hacia la derecha al salir
       transition={{ duration: 1 }} // Duración de la animación
       >
        <h1>Lista de usuarios</h1>
      </motion.div>
      <motion.div
        style={{
          height: "400px",
          marginTop: "30px",
          overflowY: "auto",
          marginBottom: "30px",
          width: "90%",
        }}
        initial={{ x: '-100%', opacity: 0 }} // Comienza fuera de la vista desde la izquierda
        animate={{ x: 0, opacity: 1 }} // Se desplaza a su posición original
        exit={{ x: '100%', opacity: 0 }} // Se mueve fuera de la vista hacia la derecha al salir
        transition={{ duration: 1 }} // Duración de la animación
      >
        <table className="tabla-U" style={{ width: "90%", margin: "0 auto" }}>
          <thead>
            <tr>
              <th
                   style={{
                  backgroundColor: "#15616d",
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                }}
              >
                Rut
              </th>
              <th
                   style={{
                  backgroundColor: "#15616d",
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                }}
              >
                Nombre
              </th>
              <th
                style={{
                  backgroundColor: "#15616d",
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                }}
              >
                Fecha de Registro
              </th>
              <th
                   style={{
                  backgroundColor: "#15616d",
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                }}
              >
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {listtaUser.map((user) => (
              <motion.tr key={user.id} 
              
                  initial={{ y: -50, opacity: 0 }} // Comienza desde arriba y con opacidad 0
                  animate={{ y: 0, opacity: 1 }} // Desciende a su posición original y la opacidad aumenta
                  transition={{ duration: 1.5 }} // Duración de la animación
              >
                <td>{user.rut}</td>
                <td>{user.nombre}</td>
                <td>
                  {new Date(user.created_at)
                    .toISOString()
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("-")}
                </td>
                <td>
                  <button
                    className="boton-eliminar"
                    onClick={() => deleteUserOfList(user)}
                  >
                    <img
                      style={{ width: "15px" }}
                      src="/delete.svg"
                      alt="icon"
                    />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </>
  );
};
