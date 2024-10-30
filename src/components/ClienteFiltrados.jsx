import React, { useState } from "react";
import "./ClientesFiltrados.css"; // Estilos externos
import "./estilosTableClienteFiltrados.css"; // Estilos externos
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import { useFiltradoCliente } from "../Hooks/useFiltradoCliente";
import { useModal } from "../Hooks/useModal";

const ClientesFiltrados = () => {
  const {
    handleSubmit,
    handleChange,
    filters,
    clientes,
    error,
    limpiarfiltros,
    loading,
    limpiarGrilla,
    exportarExcel,
    manejarModalDelete
  } = useFiltradoCliente();

  const {
    abrirModalEdicion,
    cerrarModal,
    clienteSeleccionado,
    guardarCliente,
    mostrarModal,
    manejarEdicion,
  } = useModal();

  return (
    <>
      <Navbar />
      <motion.div
        style={{
          padding: "0",
          boxShadow: "1px 1px 2px black",
          marginTop: "20px",
        }}
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="clientes-filtrados-container"
      >
        <div className="rowContainer">
          <div>
            <form className="filter-form" onSubmit={handleSubmit}>
              <table>
                <thead>
                  <tr>
                    <th>Sucursal</th>
                    <th>Nombre</th>
                    <th>RUT</th>
                    <th>Teléfono</th>
                    <th>Email</th>
                    <th>Fecha Desde</th>
                    <th>Fecha Hasta</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <select
                        id="id_sucursal"
                        name="id_sucursal"
                        value={filters.id_sucursal}
                        onChange={handleChange}
                        style={{ color: "gray" }}
                      >
                        <option disabled value="">
                          Selecciona una sucursal
                        </option>
                        <option value="1">Sucursal 1</option>
                        <option value="2">Sucursal 2</option>
                        <option value="3">Sucursal 3</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="nombre_cliente"
                        name="nombre_cliente"
                        value={filters.nombre_cliente}
                        onChange={handleChange}
                        placeholder="Nombre del cliente"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        id="rut_cliente"
                        name="rut_cliente"
                        value={filters.rut_cliente}
                        onChange={handleChange}
                        placeholder="RUT del cliente"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        id="telefono_cliente"
                        name="telefono_cliente"
                        value={filters.telefono_cliente}
                        onChange={handleChange}
                        placeholder="Teléfono del cliente"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        id="email_cliente"
                        name="email_cliente"
                        value={filters.email_cliente}
                        onChange={handleChange}
                        placeholder="ejemplo.123@gmail.com"
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        id="fecha_desde"
                        name="fecha_desde"
                        value={filters.fecha_desde}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        id="fecha_hasta"
                        name="fecha_hasta"
                        value={filters.fecha_hasta}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>

              <button
                style={{
                  backgroundColor: "#15616D",
                  marginTop: "10px",
                  marginLeft: "10px",
                }}
                type="submit"
                className="btn-submit"
              >
                Buscar Cliente
              </button>
              <button
                type="button"
                className="rojo"
                onClick={() => limpiarfiltros()}
                style={{
                  marginTop: "10px",
                  marginLeft: "10px",
                  backgroundColor: "#333",
                }}
              >
                Limpiar Filtros
              </button>
            </form>
          </div>
        </div>

        {loading && <p>Cargando...</p>}
        {error && <p className="error">{error}</p>}
      </motion.div>

      <motion.div
        className="clientes-grid"
        style={{ width: "90%" }}
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="contenedor_botones">
          <button className="rojo botton" onClick={() => limpiarGrilla()}>
            Limpiar grilla
          </button>
          <button className="Naranja botton" onClick={exportarExcel}>
            Generar Planilla
          </button>
        </div>

        <div
          style={{
            overflowY: "auto",
            marginBottom: "30px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <table
            className="table-filter"
            style={{
              textAlign: "center",
              width: "90%",
              borderCollapse: "collapse",
            }}
          >
            <thead style={{}}>
              <tr>
                <th
                  style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                  }}
                >
                  Sucursal
                </th>
                <th
                  style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                  }}
                >
                  Nombre
                </th>
                <th
                  style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                  }}
                >
                  Email
                </th>
                <th
                  style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                  }}
                >
                  Teléfono
                </th>
                <th
                  style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                  }}
                >
                  RUT
                </th>
                <th
                  style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                  }}
                >
                  Fecha Registro
                </th>
                <th
                  style={{
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
              {clientes.map((cliente) => (
                <motion.tr
                  key={cliente.rut_cliente}
                  initial={{ y: -50, opacity: 0 }} // Comienza desde arriba y con opacidad 0
                  animate={{ y: 0, opacity: 1 }} // Desciende a su posición original y la opacidad aumenta
                  transition={{ duration: 1 }} // Duración de la animación
                >
                  <td>{cliente.id_sucursal}</td>
                  <td>{cliente.nombre_cliente}</td>
                  <td>{cliente.email_cliente}</td>
                  <td>{cliente.telefono_cliente}</td>
                  <td>{cliente.rut_cliente}</td>
                  <td>
                    {new Date(cliente.fecha_registro)
                      .toISOString()
                      .split("T")[0]
                      .split("-")
                      .reverse()
                      .join("-")}
                  </td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <button
                        style={{ backgroundColor: "#15616D" }}
                        onClick={() => abrirModalEdicion(cliente)}
                      >
                        <img
                          style={{ width: "15px" }}
                          src="/pencil.svg"
                          alt="icon"
                        />
                      </button>
                      <button
                        style={{ marginLeft: "5px" }}
                        className="boton-eliminar"
                        onClick={() => manejarModalDelete(cliente)}
                      >
                        <img
                          style={{ width: "15px" }}
                          src="/delete.svg"
                          alt="icon"
                        />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Modal para editar cliente */}
      {mostrarModal && (
        <div className="modal">
          <motion.div
            style={{ backgroundColor: "#F4F4F4" }}
            className="modal-content"
            initial={{ x: "+100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span
              style={{ fontSize: "20px", cursor: "pointer" }}
              className="close"
              onClick={cerrarModal}
            >
              &times;
            </span>
            <h4 style={{ margin: "5px", textAlign: "center" }}>
              Actualizar Cliente
            </h4>
            <form style={{ display: "flex", justifyContent: "center" }}>
              <table className="form-table">
                <tbody>
                  <tr>
                    <td>
                      <label htmlFor="nombre_cliente">Nombre</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="nombre_cliente"
                        name="nombre_cliente"
                        value={clienteSeleccionado.nombre_cliente}
                        onChange={manejarEdicion}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="email_cliente">Email</label>
                    </td>
                    <td>
                      <input
                        type="email"
                        id="email_cliente"
                        name="email_cliente"
                        value={clienteSeleccionado.email_cliente}
                        onChange={manejarEdicion}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="telefono_cliente">Teléfono</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="telefono_cliente"
                        name="telefono_cliente"
                        value={clienteSeleccionado.telefono_cliente}
                        onChange={manejarEdicion}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="rut_cliente">RUT</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="rut_cliente"
                        name="rut_cliente"
                        value={clienteSeleccionado.rut_cliente}
                        onChange={manejarEdicion}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="id_sucursal">Sucursal</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="id_sucursal"
                        name="id_sucursal"
                        value={clienteSeleccionado.id_sucursal}
                        onChange={manejarEdicion}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2" className="button-row"></td>
                    <button
                      style={{ backgroundColor: "#15616D" }}
                      type="button"
                      className="btn-guardar"
                      onClick={guardarCliente}
                    >
                      Guardar
                    </button>
                  </tr>
                </tbody>
              </table>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ClientesFiltrados;
