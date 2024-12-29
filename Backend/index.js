import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRouter from "./src/routes/userRoutes.js";

dotenv.config();

const app = express();
app.use("/api", userRouter);
app.use(cors());

// app.use(
//   cors({
//     origin: "http://localhost:5173", // Permite solo solicitudes desde este origen
//     methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
//     allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
//   })
// );

app.use(express.json());
// const corsOptions = {
//   origin: "http://localhost:5173",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };
// app.use(cors(corsOptions));
const PORT = process.env.PORT || 3000;

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
  res.send("Hola, este es tu servidor backend. HELLO Mundo");
});

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
