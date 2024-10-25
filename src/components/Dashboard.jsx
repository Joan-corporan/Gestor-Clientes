import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import "./estilosGraficos.css";
import Swal from "sweetalert2";

export const Dashboard = () => {
  const [clientsTable, setClientsTable] = useState([]);
  const URL="https://api-storbox-prueba.vercel.app/api/clients/"


  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: ["Masculino", "Femenino"],
    }, plotOptions: {
        bar: {
          distributed: true,
        },
      },
      colors: ["#0000FF", "#FF69B4"], 
  });

  const [series, setSeries] = useState([
    {
      name: "Clientes",
      data: [0, 0],
    },
  ]);
  // ## Sucursal ...........................................................
  const [sucursalOptions, setSucursalOptions] = useState({
    Chart: {
      id: "sucursal-chart",
      type: "donut",
    },
    labels: ["Sucursal 1", "Sucursal 2", "Sucursal 3"],
  });
  const [sucursalSeries, setSucursalSeries] = useState([0, 0, 0]);

  const [mesOptions, setMesOptions] = useState({
    chart: {
      id: "mes-chart",
      type: "area",
    },
    xaxis: {
      categories: [],
    },
  });
  // ## meses ........................................................................
  const [mesSeries, setMesSeries] = useState([
    {
      name: "Clientes Registrados",
      data: [],
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${URL}getAll`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

       // ## Genero ..................................................................
        const clients = response.data;
        const masculinoCount = clients.filter(
          (client) => client.genero === "Masculino"
        ).length;
        const femeninoCount = clients.filter(
          (client) => client.genero === "Femenino"
        ).length;

       
        setSeries([
          {
            name: "Clientes",
            data: [masculinoCount, femeninoCount],
          },
        ]);
// ## Sucursal....................................................................................
        const sucursalCount1 = clients.filter(
          (client) => client.id_sucursal === 1
        ).length;
        const sucursalCount2 = clients.filter(
          (client) => client.id_sucursal === 2
        ).length;
        const sucursalCount3 = clients.filter(
          (client) => client.id_sucursal === 3
        ).length;
        setSucursalSeries([sucursalCount1, sucursalCount2, sucursalCount3]);
// ## Registro ........................................................................................
        const registrosPorMes = {};
        clients.forEach((client) => {
          const fecha = new Date(client.fecha_registro);
          const mesAnio = `${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
          registrosPorMes[mesAnio] = (registrosPorMes[mesAnio] || 0) + 1;
        });
        const meses = Object.keys(registrosPorMes);
        const registros = Object.values(registrosPorMes);

        setMesOptions((prevOptions) => ({
          ...prevOptions,
          xaxis: {
            categories: meses,
          },
        }));
        setMesSeries([
          {
            name: "Clientes Registrados",
            data: registros,
          },
        ]);
        setClientsTable(clients);
      } catch (error) {
        console.error("Error fetching data:", error);
        console.log(error)
        Swal.fire({
          title: "Error al obtener los usuarios!",
          text: `${error.response.data.message}`,
          icon: "error",
          confirmButtonText: "Aceptar",
        })
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />

      <div
        className="row"
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="mixed-chart"
        >
          <h2>Clientes por Genero</h2>
          <Chart options={options} series={series} type="bar" width="100%" />
        </motion.div>
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="mixed-chart"
        >
          <h2>Clientes por Sucursal</h2>
          <Chart
            options={sucursalOptions}
            series={sucursalSeries}
            type="donut"
            width="100%"
          />
        </motion.div>
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mixed-chart"
        >
          <h2>Clientes Registrados por Mes</h2>
          <Chart
            options={mesOptions}
            series={mesSeries}
            type="area"
            width="100%"
          />
        </motion.div>
        <div></div>
      </div>
      <motion.table
       initial={{ x: "-100%", opacity: 0 }}
       animate={{ x: 0, opacity: 1 }}
       transition={{ duration: 1.5 }} 
       className="tableGrafico">
        <thead>
          <tr>
            <th>Sucursal</th>
            <th>genero</th>
            <th>fecha_registro</th>
          </tr>
        </thead>
        <tbody>
          {clientsTable?.map((client) => (
            <motion.tr  key={client.id}
            initial={{ y: -50, opacity: 0 }} // Comienza desde arriba y con opacidad 0
            animate={{ y: 0, opacity: 1 }} // Desciende a su posición original y la opacidad aumenta
            transition={{ duration: 1.5 }} // Duración de la animación
            >
              <td className="tdt">{client.id_sucursal}</td>
              <td  className="tdt">{client.genero}</td>

              <td className="tdt">
                {new Date(client.fecha_registro)
                  .toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                  .replace(/\//g, "-")}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </>
  );
};
