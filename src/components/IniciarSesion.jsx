import React, { useState } from 'react';
import axios from 'axios';

const IniciarSesion = () => {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/clients/api/login', {
        rut,
        password,
      });

      // Almacena el token en el almacenamiento local o en una cookie
      localStorage.setItem('token', response.data.token);
      
      // Redirigir o realizar alguna acción después de un inicio de sesión exitoso
      // Por ejemplo, redirigir al usuario a la página principal
      /* window.location.href = '/home';  */
      
    } catch (err) {
      setError('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Rut:</label>
          <input
            type="rut"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            /* required */
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            /* required */
          />
        </div>
        <button type="submit">Iniciar sesión</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default IniciarSesion;
