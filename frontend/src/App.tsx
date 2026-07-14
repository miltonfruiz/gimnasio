import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface Deporte {
  _id: string;
  nombre: string;
  descripcion: string;
}

interface Cliente {
  _id: string;
  nombre: string;
  apellido: string;
}

interface Asignacion {
  _id: string;
  clienteId: string;
  deporteId: string;
}

interface User {
  _id: string;
  username: string;
  password: string;
}

const App = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [deportes, setDeportes] = useState<Deporte[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [asignaciones, setAsignaciones] = useState<Asignacion[]>([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [clienteNombre, setClienteNombre] = useState('');
  const [clienteApellido, setClienteApellido] = useState('');
  const [deporteId, setDeporteId] = useState('');
  const [clienteId, setClienteId] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      localStorage.setItem('token', data.token);
      setToken(data.token);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      localStorage.setItem('token', data.token);
      setToken(data.token);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const getDeportes = async () => {
    try {
      const response = await fetch(`${API_URL}/api/deportes`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setDeportes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const createDeporte = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/deportes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre, descripcion }),
      });
      const data = await response.json();
      setDeportes([...deportes, data]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateDeporte = async (id: string, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/deportes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre, descripcion }),
      });
      const data = await response.json();
      setDeportes(deportes.map((deporte) => (deporte._id === id ? data : deporte)));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteDeporte = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/api/deportes/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setDeportes(deportes.filter((deporte) => deporte._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const getClientes = async () => {
    try {
      const response = await fetch(`${API_URL}/api/clientes`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const createCliente = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/clientes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre: clienteNombre, apellido: clienteApellido }),
      });
      const data = await response.json();
      setClientes([...clientes, data]);
    } catch (error) {
      console.error(error);
    }
  };

  const getAsignaciones = async () => {
    try {
      const response = await fetch(`${API_URL}/api/asignaciones`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setAsignaciones(data);
    } catch (error) {
      console.error(error);
    }
  };

  const createAsignacion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/asignaciones`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ clienteId, deporteId }),
      });
      const data = await response.json();
      setAsignaciones([...asignaciones, data]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) {
      getDeportes();
      getClientes();
      getAsignaciones();
    }
  }, [token]);

  if (!token) {
    return (
      <div className="bg-gray-900 text-white p-4 rounded-lg">
        <h1 className="text-3xl font-bold mb-4">Login/Register</h1>
        <form onSubmit={handleLogin} className="mb-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="bg-gray-800 text-white p-2 rounded-lg mb-2"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-gray-800 text-white p-2 rounded-lg mb-2"
          />
          <button type="submit" className="bg-gray-800 text-white p-2 rounded-lg">
            Login
          </button>
        </form>
        <form onSubmit={handleRegister} className="mb-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="bg-gray-800 text-white p-2 rounded-lg mb-2"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-gray-800 text-white p-2 rounded-lg mb-2"
          />
          <button type="submit" className="bg-gray-800 text-white p-2 rounded-lg">
            Register
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Sistema de gestión de deportes</h1>
      <button onClick={handleLogout} className="bg-gray-800 text-white p-2 rounded-lg mb-4">
        Logout
      </button>
      <h2 className="text-2xl font-bold mb-4">Deportes</h2>
      <form onSubmit={createDeporte} className="mb-4">
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
          className="bg-gray-800 text-white p-2 rounded-lg mb-2"
        />
        <input
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción"
          className="bg-gray-800 text-white p-2 rounded-lg mb-2"
        />
        <button type="submit" className="bg-gray-800 text-white p-2 rounded-lg">
          Crear deporte
        </button>
      </form>
      <ul>
        {deportes.map((deporte) => (
          <li key={deporte._id} className="mb-2">
            {deporte.nombre} - {deporte.descripcion}
            <button
              onClick={() => updateDeporte(deporte._id, {} as React.FormEvent<HTMLFormElement>)}
              className="bg-gray-800 text-white p-2 rounded-lg ml-2"
            >
              Editar
            </button>
            <button
              onClick={() => deleteDeporte(deporte._id)}
              className="bg-gray-800 text-white p-2 rounded-lg ml-2"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <h2 className="text-2xl font-bold mb-4">Clientes</h2>
      <form onSubmit={createCliente} className="mb-4">
        <input
          type="text"
          value={clienteNombre}
          onChange={(e) => setClienteNombre(e.target.value)}
          placeholder="Nombre"
          className="bg-gray-800 text-white p-2 rounded-lg mb-2"
        />
        <input
          type="text"
          value={clienteApellido}
          onChange={(e) => setClienteApellido(e.target.value)}
          placeholder="Apellido"
          className="bg-gray-800 text-white p-2 rounded-lg mb-2"
        />
        <button type="submit" className="bg-gray-800 text-white p-2 rounded-lg">
          Crear cliente
        </button>
      </form>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente._id} className="mb-2">
            {cliente.nombre} {cliente.apellido}
          </li>
        ))}
      </ul>
      <h2 className="text-2xl font-bold mb-4">Asignaciones</h2>
      <form onSubmit={createAsignacion} className="mb-4">
        <select
          value={deporteId}
          onChange={(e) => setDeporteId(e.target.value)}
          className="bg-gray-800 text-white p-2 rounded-lg mb-2"
        >
          <option value="">Seleccione un deporte</option>
          {deportes.map((deporte) => (
            <option key={deporte._id} value={deporte._id}>
              {deporte.nombre}
            </option>
          ))}
        </select>
        <select
          value={clienteId}
          onChange={(e) => setClienteId(e.target.value)}
          className="bg-gray-800 text-white p-2 rounded-lg mb-2"
        >
          <option value="">Seleccione un cliente</option>
          {clientes.map((cliente) => (
            <option key={cliente._id} value={cliente._id}>
              {cliente.nombre} {cliente.apellido}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-gray-800 text-white p-2 rounded-lg">
          Asignar deporte a cliente
        </button>
      </form>
      <ul>
        {asignaciones.map((asignacion) => (
          <li key={asignacion._id} className="mb-2">
            {asignacion.deporteId} - {asignacion.clienteId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;