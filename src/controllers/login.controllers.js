import { pool } from "../db.js";

export const autenticarUsuario= async (req, res)=>{
       const { usernameLogin, passwordLogin } = req.body;

    // Consulta para verificar si el usuario y la contraseña coinciden en la misma fila
    const query = `SELECT * FROM Usuarios WHERE usuario = $1 AND contraseña = $2`;
    
    try {
        // Ejecutar la consulta para verificar el usuario y la contraseña
        const result = await pool.query(query, [usernameLogin, passwordLogin]);

        // Si se encontró un usuario que coincide
        if (result.rows.length > 0) {
            const user = result.rows[0];

            // Guardar el ID del usuario y el rol en la sesión
            req.session.user_id = user.id;
            req.session.rol = user.rol;

            console.log(user.rol);
            res.json({ success: true, redirect: '/principal' });
        } else {
            // Si no se encontró un usuario que coincida
            res.json({ success: false, message: "Usuario o contraseña incorrectos" });
        }
    } catch (error) {
        console.error("Error al consultar la base de datos:", error.message);
        res.status(500).send("Error en el servidor");
    }
}