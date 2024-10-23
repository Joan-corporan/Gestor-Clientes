import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; 
import Navbar from './Navbar';
import { motion } from 'framer-motion';
import { formatRut, validateRut } from '@fdograph/rut-utilities';
import { useValidations } from '../Helpers/helperValidations';
import validator from 'validator';



const FormularioCliente = () => {
  const token = localStorage.getItem('token');
  const [cliente, setCliente] = useState({
    id_sucursal: '',
    nombre_cliente: '',
    email_cliente: '',
    telefono_cliente: '',
    rut_cliente: '',
  });
  

  // Funciones de validación

  const {validarEmail,validarNombre,validarTelefono,validarSucursal}=useValidations()

 
  
  const handleChange = (e) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (
      cliente.id_sucursal.trim().length === 0 || 
      cliente.nombre_cliente.trim().length === 0 || 
      cliente.email_cliente.trim().length === 0 || 
      cliente.telefono_cliente.trim().length === 0 || 
      cliente.rut_cliente.trim().length === 0
    ) {
      return Swal.fire({
        title: "¡Error!",
        text: "Todos los campos son obligatorios",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
    
    
    
    if (!validarSucursal(cliente.id_sucursal)) {
      return Swal.fire({
        title: "¡Error!",
        text:'Sucursal inválido. Solo tipo número',
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    
    }
    if(!validarNombre(cliente.nombre_cliente)){
      return Swal.fire({
        title: "¡Error!",
        text:'Nombre inválido. Solo tipo texto',
        icon: "error",
        confirmButtonText: "Aceptar",
      });
   
    }
  
    
    if (!validator.isEmail(cliente.email_cliente)) {
      return Swal.fire({
        title: "¡Error!",
        text:'Email inválido. Debe ser formato email',
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      
    }
    if (!validarTelefono(cliente.telefono_cliente)) {
      return Swal.fire({
        title: "¡Error!",
        text:'Teléfono inválido. Debe tener 9 dígitos',
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    
    }
    if (!validateRut(formatRut(cliente.rut_cliente))) {
      return Swal.fire({
        title: "¡Error!",
        text:'RUT inválido. Debe ser formato rut',
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      
    }

   
      try {
        const response = await axios.post('http://localhost:3000/api/clients/create',cliente,  {
          headers: {
            'Authorization': `Bearer ${token}`, 
          }
        });
       
        Swal.fire({
          title: '¡Éxito!',
          text: `${response.data.message}`,
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        console.log(response.data)
       
        setCliente({
          id_sucursal: '',
          nombre_cliente: '',
          email_cliente: '',
          telefono_cliente: '',
          rut_cliente: '',
        });
      
      } catch (error) {
        console.error('Error al crear el cliente', error);
        if(error.response){
         
          Swal.fire({
            title: `Error!`,
            text: `${error.response.data.message}`,
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        }
    
      }
    
  };

  return (
    <>
    <Navbar/>
   
          <motion.div  className="modal-content-crear-cliente" id='modal-content-crear-cliente' 
          initial={{ x: '-100%', opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          transition={{ duration: 1 }} 
          >
          
        <h2 style={{ textAlign:"center"}}>Registrar Cliente</h2>
           
            <form onSubmit={handleSubmit} className="form-cliente" style={{display:"flex", justifyContent:"center"}}>
  <table className="form-table" >
    <tbody>
      <tr>
        <td>
          <label htmlFor="id_sucursal">Sucursal:</label>
        </td>
        <td>
          <select style={{ color:"gray"}}
            id="id_sucursal"
            name="id_sucursal"
            value={cliente.id_sucursal}
            onChange={handleChange}
            placeholder="Selecciona una sucursal"
          >
            
            <option style={{color:"gray"}} disabled value="">
              Selecciona una sucursal
            </option>
            <option value="1">Sucursal 1</option>
            <option value="2">Sucursal 2</option>
            <option value="3">Sucursal 3</option>
          </select>
        
        </td>
        
      </tr>

      <tr>
        <td>
          <label htmlFor="nombre_cliente">Nombre del Cliente:</label>
        </td>
        <td>
          <input
            type="text"
            name="nombre_cliente"
            value={cliente.nombre_cliente}
            onChange={handleChange}
            placeholder="Nombre y Apellido"
          />
        
        </td>
      </tr>

      <tr>
        <td>
          <label htmlFor="email_cliente">Email:</label>
        </td>
        <td>
          <input
            type="text"
            name="email_cliente"
            value={cliente.email_cliente}
            onChange={handleChange}
            placeholder="ejemplo@gmail.com"
          />
         
        </td>
      </tr>

      <tr>
        <td>
          <label htmlFor="telefono_cliente">Teléfono:</label>
        </td>
        <td>
          <input
            type="text"
            name="telefono_cliente"
            value={cliente.telefono_cliente}
            onChange={handleChange}
            placeholder="+56912345678"
          />
      
        </td>
      </tr>

      <tr>
        <td>
          <label htmlFor="rut_cliente">RUT del Cliente:</label>
        </td>
        <td>
          <input
            type="text"
            name="rut_cliente"
            value={cliente.rut_cliente}
            onChange={handleChange}
            placeholder="67654326-7"
          />
         
        </td>
      </tr>

      <tr>
        <td colSpan="2" className="button-row">
          <button type="submit"  style={{ backgroundColor: "#15616D", marginTop: "10px" }} className="btn-crear azul">
            Crear Cliente
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

export default FormularioCliente;
