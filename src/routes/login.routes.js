import { Router} from "express";
import { pool } from "../db.js"; 
import { autenticarUsuario } from "../controllers/login.controllers.js";

const router= Router();

// Ruta para autenticación
router.post("/login", autenticarUsuario);

router.get("/fecha", async (req, res)=>{
    const result= await pool.query('SELECT NOW()');
    return res.json(result.rows[0]);
})

export default router;
