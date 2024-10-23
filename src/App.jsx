
import './App.css'
import ClientesFiltrados from './components/ClienteFiltrados'
import Error from './components/Error'
import Exito from './components/Exito'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import IniciarSesion from './components/IniciarSesion'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Register from './components/Register'

function App() {
 

  return (
    <>
      <Router>
        <Routes>
          {/* <Route exact path="/" element={<Home />} /> */}
         {/*  <Route exact path="/iniciarsesion" element={<IniciarSesion />} /> */}
          <Route exact path="/login" element={<Login />} />
          {/* <Route exact path="/register" element={<Register />} /> */}
         {/*  <Route exact path="/clientes-filtrados" element={<ClientesFiltrados />} /> */}
          {/* <Route exact path="*" element={<Error />} /> */}
        </Routes>
        </Router>  
    {/* <Login/> */}
     {/* <ClientesFiltrados/> */}
     {/* <IniciarSesion/> */}


      {/* <Exito /> */}
    {/*  <Register/> */}
    </>
  )
}

export default App
