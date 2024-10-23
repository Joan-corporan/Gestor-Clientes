import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

const GenerarExcel = () => {
  const [usuarios, setUsuarios] = useState([]);

  // Obtener los datos de la base de datos al cargar el componente
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/usuarios'); // Ruta de tu API
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    fetchUsuarios();
  }, []);

  // Función para generar el archivo Excel
  const exportarExcel = () => {
    const ws = XLSX.utils.json_to_sheet(usuarios); // Convierte el array de usuarios a una hoja de Excel
    const wb = XLSX.utils.book_new(); // Crea un nuevo libro de Excel
    XLSX.utils.book_append_sheet(wb, ws, 'Usuarios'); // Añade la hoja al libro

    // Generar y descargar el archivo Excel
    XLSX.writeFile(wb, 'usuarios.xlsx');
  };

  return (
    <div>
      <h2>Exportar Lista de Usuarios a Excel</h2>
      <button onClick={exportarExcel} className="btn-exportar">
        Descargar Excel
      </button>
    </div>
  );
};

export default GenerarExcel;
