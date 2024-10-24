import { useState } from "react";
import { useValidations } from "../Helpers/helperValidations";
import Swal from "sweetalert2";
import axios from "axios";
import { formatRut, validateRut } from "@fdograph/rut-utilities";
import * as XLSX from "xlsx";
import validator from "validator";

export function useFiltradoCliente() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    id_sucursal: "",
    nombre_cliente: "",
    email_cliente: "",
    telefono_cliente: "",
    fecha_desde: "",
    fecha_hasta: "",
    rut_cliente: "",
  });
  const token = localStorage.getItem("token");
 
  const {
    validarFechaDesde,
    validarFechaHasta,
    validarNombre,
    validarRangoFechas,
    validarSucursal,
    validarTelefono,
  } = useValidations();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };
  const limpiarGrilla = () => {
    setClientes([]);
  };
  const EliminarCliente = async (cliente) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/clients/${cliente.rut_cliente}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Agregar token en el header
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        setClientes(
          clientes.filter((c) => c.rut_cliente !== cliente.rut_cliente)
        );
      }

      Swal.fire({
        title: "¡Éxito!",
        text: `${response.data.message}`,
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      console.error("Error al eliminar el cliente", error);
      Swal.fire({
        title: "¡Error!",
        text:
          error.response?.data?.message || "No se pudo eliminar el cliente.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };
  const limpiarfiltros = () => {
    setFilters({
      id_sucursal: "",
      nombre_cliente: "",
      email_cliente: "",
      telefono_cliente: "",
      fecha_desde: "",
      fecha_hasta: "",
      rut_cliente: "",
    });
  };
  const exportarExcel = () => {
    if (clientes.length === 0) {
      Swal.fire({
        title: "��Error!",
        text: "No hay clientes para exportar a Excel.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    } else {
      const ws = XLSX.utils.json_to_sheet(clientes);

      // Formatear encabezados
      const encabezados = Object.keys(clientes[0]);
      XLSX.utils.sheet_add_aoa(ws, [encabezados], { origin: "A1" });

      // Ajuste automático de las columnas
      const columnas = Object.keys(clientes[0]).map((key) => ({
        wch: Math.max(
          key.length,
          ...clientes.map((c) => (c[key] ? c[key].toString().length : 0))
        ),
      }));
      ws["!cols"] = columnas;

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Clientes");

      // Estilo básico (opcional, más detalles en la documentación de XLSX)
      ws["A1"].s = {
        font: { bold: true },
        alignment: { horizontal: "center" },
      };

      XLSX.writeFile(wb, "clientes.xlsx");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (filters.id_sucursal && !validarSucursal(filters.id_sucursal)) {
      Swal.fire({
        title: "¡Error!",
        text: "Sucursal inválida. Solo tipo números positivos",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      setLoading(false);
      return;
    }
    if (filters.nombre_cliente && !validarNombre(filters.nombre_cliente)) {
      Swal.fire({
        title: "¡Error!",
        text: "Nombre inválido. Solo tipo texto",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      setLoading(false);
      return;
    }
    if (filters.fecha_desde && !validarFechaDesde(filters.fecha_desde)) {
      Swal.fire({
        title: "¡Error!",
        text: "Fecha desde inválida. Debe ser formato fecha",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      setLoading(false);
      return;
    }
    if (filters.fecha_hasta && !validarFechaHasta(filters.fecha_hasta)) {
      Swal.fire({
        title: "¡Error!",
        text: "Fecha hasta inválida. Debe ser formato fecha",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      setLoading(false);
      return;
    }
    if (
      filters.fecha_desde &&
      filters.fecha_hasta &&
      !validarRangoFechas(filters.fecha_desde, filters.fecha_hasta)
    ) {
      Swal.fire({
        title: "¡Error!",
        text: "La fecha 'desde' no puede ser mayor que la fecha 'hasta'.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      setLoading(false);
      return;
    }
    if (filters.email_cliente && !validator.isEmail(filters.email_cliente)) {
      Swal.fire({
        title: "¡Error!",
        text: "Email inválido. Debe ser formato email",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      setLoading(false);
      return;
    }
    if (
      filters.telefono_cliente &&
      !validarTelefono(filters.telefono_cliente)
    ) {
      Swal.fire({
        title: "¡Error!",
        text: "Teléfono inválido. Debe tener 9 dígitos",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      setLoading(false);
      return;
    }
    if (filters.rut_cliente && !validateRut(formatRut(filters.rut_cliente))) {
      Swal.fire({
        title: "¡Error!",
        text: "RUT inválido. Debe ser formato Rut",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      setLoading(false);
      return;
    }
    // Formatear las fechas
    const fechaDesdeFormateada = filters.fecha_desde
      ? new Date(filters.fecha_desde).toISOString().split("T")[0]
      : "";
    const fechaHastaFormateada = filters.fecha_hasta
      ? new Date(filters.fecha_hasta).toISOString().split("T")[0]
      : "";

    try {
      if (
        filters.email_cliente === "" &&
        filters.rut_cliente === "" &&
        filters.id_sucursal === "" &&
        filters.nombre_cliente === "" &&
        filters.fecha_desde === "" &&
        filters.fecha_hasta === "" &&
        filters.telefono_cliente === ""
      ) {
        return Swal.fire({
          title: "¡Error!",
          text: "Debes colocar valores para poder filtrar",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
      const { data } = await axios.get(
        "http://localhost:3000/api/clients/filtro",
        {
          params: {
            ...filters,
            fecha_desde: fechaDesdeFormateada,
            fecha_hasta: fechaHastaFormateada,
          },
          headers: {
            Authorization: `Bearer ${token}` 
          },
        }
      );
      setClientes(data.detail);
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "¡Error!",
        text: `Error: ${err.response.data.message}`,
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      setLoading(false);
      return;
    } finally {
      setLoading(false);
    }
  };
  return {
    filters,
    loading,
    error,
    clientes,
    setClientes,
    handleSubmit,
    limpiarfiltros,
    handleChange,
    setFilters,
    limpiarGrilla,
    exportarExcel,
    EliminarCliente,
  };
}
