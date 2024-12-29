import React, { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../src/types/User"; // Asegúrate de que esta ruta sea correcta
import { Link } from "react-router-dom";



   export const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // Estado para almacenar la lista de usuarios
  const [loading, setLoading] = useState<boolean>(false); // Estado para indicar carga
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  // Función para obtener usuarios del backend
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<User[]>("http://localhost:3000/users"); // Llama al endpoint de usuarios
        setUsers(response.data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(`Error fetching users: ${err.message}`);
        } else {
          setError("Unknown error occurred while fetching users.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Solo se ejecuta al montar el componente

  // Función para manejar la eliminación de un usuario
  const handleDelete = async (userId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/api/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId)); // Actualiza el estado eliminando el usuario borrado
      alert("User deleted successfully");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(`Error deleting user: ${err.message}`);
      } else {
        alert("Unknown error occurred while deleting user.");
      }
    }
  };



  return (
    <div>
      <h2>User List</h2>

      {loading && <p>Loading...</p>} {/* Mensaje de carga */}
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Mensaje de error */}

      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
                <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.name}</td>
                    <td>{user.phone}</td>
                    <td>{user.role}</td>
                    <td>
                        <Link to={`/edit-user/${user._id}`}>
                            <button>Edit</button>
                        </Link>
                        <button onClick={() => handleDelete(user._id!)}>Delete</button> {/* Add null check */}
                    </td>
                </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>No users available</td> {/* Mensaje cuando no hay usuarios */}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
