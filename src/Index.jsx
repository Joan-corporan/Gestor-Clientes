import "./App.css";
import ClientesFiltrados from "./components/ClienteFiltrados";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
/* import IniciarSesion from './components/IniciarSesion'; */
import Login from "./components/Login";
import Register from "./components/Register";
import { ListaDeUser } from "./components/ListaDeUser";
import FormularioCliente from "./components/FormularioCliente";
import { Dashboard } from "./components/Dashboard";

function Index() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="lista-users" element={<ListaDeUser />} />
          <Route exact path="dashboard" element={<Dashboard />} />
          <Route exact path="lista-users" element={<ListaDeUser />} />
          <Route
            exact
            path="registro-cliente"
            element={<FormularioCliente />}
          />
          <Route exact path="register" element={<Register />} />
          <Route
            exact
            path="clientes-filtrados"
            element={<ClientesFiltrados />}
          />
          <Route exact path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
}

export default Index;
