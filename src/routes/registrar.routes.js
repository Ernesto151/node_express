import { Router} from "express";
import { pool } from "../db.js"; 
import { insertarUsuario } from "../controllers/registrar.controllers.js";

const router= Router();

//insertar usuario en bd
router.post("/registrar", insertarUsuario);

router.post("/auth", async (req, res) => {
    const { user, password } = req.body;

    try {
        // Consulta para verificar el usuario y la contraseña
        const query = `SELECT rol FROM Usuarios WHERE usuario = $1 AND contraseña = $2`;
        const values = [user, password];
        
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            // Usuario o contraseña incorrectos
            return res.status(401).send("Credenciales incorrectas.");
        }

        // Devolver el rol del usuario
        return res.status(200).json({ rol: result.rows[0].rol });
    } catch (error) {
        console.error("Error al autenticar:", error.message);
        return res.status(500).send("Error en el servidor.");
    }
});

export default router;