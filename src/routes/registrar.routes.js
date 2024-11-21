import { Router} from "express";
import { db } from "../db.js"; 
import { insertarUsuario } from "../controllers/registrar.controllers.js";

const router= Router();

//insertar usuario en bd
router.post("/registrar", insertarUsuario);

export default router;