import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRouter from "./src/routes/userRoutes.js";
import User from "./src/models/userModel.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173", // Permite solo solicitudes desde este origen
  })
);
app.use(userRouter);
console.log("mono");
// Conectar a MongoDB (asegúrate de tener MongoDB en ejecución)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB", error));

// Middleware para analizar el cuerpo de las solicitudes
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// Endpoint para autenticar usuarios
app.get("/", (req, res) => {
  res.send(
    "Hola, este es tu servidor backend. HELLO Mundo" + process.env.MONGO_URI
  );
});

// app.get("/users", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// //crear nuevo usuario
// // app.post("/user",
// app.post("/users", async (req, res) => {
//   console.log("Datos recibidos:", req.body);
//   try {
//     const user = new User(req.body);
//     await user.save();
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.put("/users", async (req, res) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!updatedUser) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     res.json(updatedUser);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// app.delete("/users", async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.params.id);
//     if (!deletedUser) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     res.json({ message: "User deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

const PORT = process.env.PORT || 3000;

// app.post("/auth", async (req, res) => {
//   const { username, password } = req.body;
//   console.log(username, password);
//   try {
//     const user = await User.findOne({ username, password });
//     const token = jwt.sign(
//       { username: user.email, role: user.role },
//       SECRET_KEY,
//       { expiresIn: "1h" }
//     );

//     if (user) {
//       res.json({
//         success: true,
//         message: "Autenticación exitosa",
//         role: user.role,
//         accessToken: token,
//       });
//     } else {
//       res.json({
//         success: false,
//         message: "Nombre de usuario o contraseña incorrectos",
//       });
//     }
//   } catch (error) {
//     res
//       .status(500)
//       .json({ success: false, message: "Error interno del servidor" });
//   }
// });

// Rutas

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
