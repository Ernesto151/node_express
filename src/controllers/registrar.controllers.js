import { db } from "../db.js";

export const insertarUsuario= function(req,res){
    const data= req.body;

    let usuarioR= data.usernameRegistrar;
    let contraseñaR= data.passwordRegistrar;
    let rolR= data.rolRegistrar;

    //verificar si el usuario ya existe
    const checkUserQuery = `SELECT COUNT(*) AS count FROM Usuarios WHERE usuario = ?`;

    db.get(checkUserQuery, [usuarioR], (error, row) => {
        if (error) {
            console.error("Error al verificar el usuario:", error.message);
            return res.status(500).send("Error en el servidor.");
        }

        if (row.count > 0) {
            // Si el usuario ya existe, enviar mensaje al frontend
            return res.status(409).json({ mensaje: "Este usuario ya existe en el sistema" });
        }

    let insertarU= `INSERT INTO Usuarios (usuario, contraseña, rol) VALUES(?, ?, ?)`;

    db.run(insertarU, [usuarioR,contraseñaR,rolR], function(error){
        if(error){
            throw error;
        }
        else{
            console.log("Datos almacenados");
        }
    });
});
}