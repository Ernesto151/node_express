import { pool } from "../db.js";

export const insertarUsuario= async(req,res)=>{
    const data= req.body;

    let usuarioR= data.usernameRegistrar;
    let contraseñaR= data.passwordRegistrar;
    let rolR= data.rolRegistrar;

    //verificar si el usuario ya existe
    const checkUserQuery = `SELECT COUNT(*) AS count FROM Usuarios WHERE usuario = $1`;

    try {
        // Ejecutar la consulta para verificar si el usuario ya existe
        const result = await pool.query(checkUserQuery, [usuarioR]);

        if (result.rows[0].count > 0) {
            // Si el usuario ya existe, enviar mensaje al frontend
            return res.status(409).json({ mensaje: "Este usuario ya existe en el sistema" });
        }

        // Si el usuario no existe, insertar el nuevo usuario
        const insertarU = `INSERT INTO Usuarios (usuario, contraseña, rol) VALUES ($1, $2, $3)`;

        await pool.query(insertarU, [usuarioR, contraseñaR, rolR]);

        console.log("Datos almacenados");
        res.status(201).send("Usuario registrado correctamente.");
    } catch (error) {
        console.error("Error al insertar el usuario:", error.message);
        res.status(500).send("Error en el servidor.");
    }
}