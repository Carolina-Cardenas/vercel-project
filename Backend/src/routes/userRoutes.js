import express from "express";
import {
  getAllUsers,
  saveUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();
router.get("/", getAllUsers);
router.post("/", saveUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
export default router;
