import { db } from "../db.js";

export const autenticarUsuario= function (req, res){
       const { usernameLogin, passwordLogin } = req.body;

    // Consulta para verificar si el usuario y la contraseña coinciden en la misma fila
    const query = `SELECT * FROM Usuarios WHERE usuario = ? AND contraseña = ?`;
    
    db.get(query, [usernameLogin, passwordLogin], (err, user) => {
        if (err) {
            console.error("Error al consultar la base de datos:", err);
            return res.status(500).send("Error en el servidor");
        }

        if (user) {
                req.session.user_id = user.id;
                req.session.rol = user.rol;
                console.log(user.rol)  
                res.json({ success: true, redirect: '/principal' });
            }
        else {
           
            res.json({ success: false, message: "Usuario o contraseña incorrectos" });
        }
    });
}