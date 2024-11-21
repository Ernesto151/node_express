import { Router} from "express";
import { db } from "../db.js"; 
import { asignarPermiso, verificarAdmin } from "../controllers/permisos.controllers.js";

const router= Router();

// Ruta para asignar permisos a un usuario sobre un documento específico usando nombres
router.post('/permisos/asignar',verificarAdmin, asignarPermiso);


export default router;
