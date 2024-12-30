import { useState, useEffect } from "react";

import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";




const UserForm: React.FC = () => {
  interface User {
    username: string;
    email: string;
    name: string;
    surname: string;
    phone: number;
    role: string;
    password: string;
    accessToken: string;
  }

  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    name: "",
    surname: "",
    phone: 0,
    role: "",
    password: "",
    accessToken: "",
  });

  const { id } = useParams<{ id: string }>(); // Obtener el ID desde la URL (si es para actualizar)
  const navigate = useNavigate(); // Usamos useNavigate en lugar de useHistory

  // Efecto para cargar los datos del usuario si estamos actualizando
  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const response = await axios.get<User>(`https://server-vercel-project.vercel.app/users/${id}`);
          setUser(response.data);
        } catch (error) {
          
          console.error("Error fetching user:", error);
        }
      };

      fetchUser();
    }
  }, [id]);

  // Manejo de cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Guardar o actualizar el usuario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        // Si tenemos un ID, es una actualización
        await axios.put(`https://server-vercel-project.vercel.app/users/${id}`, user);
        alert("Usuario actualizado con éxito");
      } else {
        // Si no tenemos un ID, es una creación
        await axios.post("https://server-vercel-project.vercel.app/users/", user);
        alert("Usuario creado con éxito");
      }
      navigate("/users"); // Redirigir a la lista de usuarios después de la acción
    } catch (error) {
      console.error("Error al guardar el usuario:", error);
    }
  };

  // Eliminar el usuario
  const handleDelete = async () => {
    if (id) {
      try {
        await axios.delete(`https://server-vercel-project.vercel.app/users/${id}`);
        alert("Usuario eliminado con éxito");
        navigate("/users"); // Redirigir a la lista de usuarios después de la eliminación
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
      }
    }
  };

  return (
    <div>
      <h2>{id ? "Update User" : "Create User"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Surname:
          <input
            type="text"
            name="surname"
            value={user.surname}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            type="number"
            name="phone"
            value={user.phone}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Role:
          <input
            type="text"
            name="role"
            value={user.role}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          AccessToken:
          <input
            type="text"
            name="accessToken"
            value={user.accessToken}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">{id ? "Actualizar" : "Crear"}</button>
      </form>
      {id && (
        <button
          onClick={handleDelete}
          style={{ marginTop: "10px", backgroundColor: "red", color: "white" }}
        >
          Eliminar Usuario
        </button>
      )}
    </div>
  );
};

export default UserForm;
