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
        const query = `SELECT rol FROM Usuarios WHERE usuario = $1 AND contrasena = $2`;
        const values = [user, password];
        
        await pool.query(query, values);

        if (!row) {
            // Usuario o contraseña incorrectos
            return res.status(401).send("Credenciales incorrectas.");
        }

        // Devolver el rol del usuario
        return res.status(200).json({ rol: row.rol });

    } catch (error) {
        console.error("Error al autenticar:", error.message);
        return res.status(500).send("Error en el servidor.");
    }
});

export default router;