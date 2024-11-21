import { Router} from "express";
import { db } from "../db.js"; 
import { autenticarUsuario } from "../controllers/login.controllers.js";

const router= Router();

// Ruta para autenticación
router.post("/login", autenticarUsuario);

export default router;
