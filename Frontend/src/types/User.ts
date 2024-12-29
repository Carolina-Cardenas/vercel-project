export interface User {
  _id?: string; // Opcional porque al crear un usuario aún no tiene ID
  username: string;
  email: string;
  name: string;
  surname: string;
  phone: number;
  role: string;
  password: string;
}
