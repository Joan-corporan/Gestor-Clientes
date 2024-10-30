import { useEffect, useState } from "react";
import { useFiltradoCliente } from "./useFiltradoCliente";
import axios from "axios";
import Swal from "sweetalert2";
import { validateRut, formatRut } from "@fdograph/rut-utilities";
import { useValidations } from "../Helpers/helperValidations";
import validator from 'validator';




export function useModal() {
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null); // Almacena el cliente seleccionado para editar
  const [mostrarModal, setMostrarModal] = useState(false);
  /* const URL="https://api-storbox-prueba.vercel.app/api/clients/" */
  const URL="http://localhost:3000/api/clients/"


  const { clientes, setClientes } = useFiltradoCliente();
  const token = localStorage.getItem("token");
  const {  validarNombre, validarSucursal, validarTelefono } =
  useValidations();



  const abrirModalEdicion = (cliente) => {
    setClienteSeleccionado(cliente); // Establece el cliente a editar
    console.log(cliente);
    setMostrarModal(true); // Muestra el modal
  };


  const cerrarModal = () => {
    setMostrarModal(false); // Oculta el modal
    setClienteSeleccionado(null); // Limpia el cliente seleccionado
  };

  const manejarEdicion = (e) => {
    const { name, value } = e.target;
    setClienteSeleccionado({
      ...clienteSeleccionado,
      [name]: value,
    });
  };
  const guardarCliente = async () => {
   
    if (
      clienteSeleccionado.email_cliente &&
      !validator.isEmail(clienteSeleccionado.email_cliente)
    ) {
      return Swal.fire({
        title: "¡Error!",
        text: "Email inválido. Debe ser formato email",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
    if (
      clienteSeleccionado.telefono_cliente &&
      !validarTelefono(clienteSeleccionado.telefono_cliente)
    ) {
      return Swal.fire({
        title: "¡Error!",
        text: "Teléfono inválido. Debe tener 9 dígitos",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
    if (
      clienteSeleccionado.rut_cliente &&
      !validateRut(formatRut(clienteSeleccionado.rut_cliente))
    ) {
      return Swal.fire({
        title: "¡Error!",
        text: "RUT inválido. Debe ser formato rut",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
    if (
      clienteSeleccionado.nombre_cliente &&
      !validarNombre(clienteSeleccionado.nombre_cliente)
    ) {
      return Swal.fire({
        title: "¡Error!",
        text: "Nombre inválido. Solo tipo texto",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
    if (
      clienteSeleccionado.id_sucursal &&
      !validarSucursal(clienteSeleccionado.id_sucursal)
    ) {
      return Swal.fire({
        title: "¡Error!",
        text: "Sucursal inválido. Solo tipo número",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }

    try {
      // Realiza la petición PUT al backend con los datos del cliente seleccionado
      const response = await axios.put(
        `${URL}${clienteSeleccionado.rut_cliente}`,
        clienteSeleccionado,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Agregar token en el header
          },
        }
      );

      // Si la respuesta es exitosa, actualiza la lista de clientes
      if (response.status === 200) {
        const nuevosClientes = clientes.map((cliente) =>
          cliente.rut_cliente === clienteSeleccionado.rut_cliente
            ? clienteSeleccionado
            : cliente
        );

        setClientes(nuevosClientes);
        cerrarModal(); // Cierra el modal después de guardar los cambios
        Swal.fire({
          title: "¡Éxito!",
          text: `${response.data.message}`,
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      console.log("Error al guardar los cambios:", error.response.data.message);
      Swal.fire({
        title: "¡Error!",
        text: `${error.response.data.message}`,
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };
  return {
   
    abrirModalEdicion,
    cerrarModal,
    clienteSeleccionado,
    guardarCliente,
    mostrarModal,
    setClienteSeleccionado,
    setMostrarModal,manejarEdicion 
  };
}
