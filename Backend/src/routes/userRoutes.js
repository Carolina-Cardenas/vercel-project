import express from "express";
import {
  getAllUsers,
  saveUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();
router.get("/users", getAllUsers);
router.post("/users", saveUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
