import { pool } from "../db.js";

export const verificarAdmin= function(req, res, next) {
    if (req.session.rol === 'admin') {
        next(); // Si es administrador, permite el acceso
    } else {
        res.status(403).send('Acceso denegado. No tienes permisos para esta operación.');
    }
}


export const crearAct= async(req,res)=>{
    const userId = req.session.user_id;
    const datos= req.body;
    
    let facultadAct= datos.facultadAct;
    let fechaAct= datos.fechaAct;
    let horaAct= datos.horaAct;
    let etapaAct= datos.etapaAct;
    let objetivoAct= datos.objetivoAct;
    let descripcionAct= datos.descripcionAct;
    let problemasAct= datos.problemasAct;
    let inspectorAct= datos.inspectorAct;
    let cargoAct= datos.cargoAct;
    let nombreDoc= datos.nombredoc;

    let registrar=`INSERT INTO DocumentosActas(nombre, facultad, fecha, hora, etapa, objetivo, descripcion, problemas, inspector, cargo)
                   VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                   RETURNING id`;
            
    try{
        const documentResult = await pool.query(registrar, [nombreDoc, facultadAct, fechaAct, horaAct,
                                                etapaAct, objetivoAct, descripcionAct, problemasAct, 
                                                inspectorAct, cargoAct,]);

        console.log("Datos almacenados");
        const documentosActasId = documentResult.rows[0].id;

        // Crear la notificación
        const mensaje = `Se creó el documento "${nombreDoc}"`;
        const insertNotification = `INSERT INTO Notificaciones (mensaje, fecha, documentosActas_id, documentosExp_id) 
                                    VALUES ($1, $2, $3, $4)
                                    RETURNING id`;
        
        await pool.query(insertNotification, [mensaje, fechaAct, documentosActasId, null]);
            

        // Insertar en DocumentosActas_usuario
        const insertRelation = `
        INSERT INTO DocumentosActas_usuario (usuario_id, DocumentosActas_id)
               VALUES ($1, $2)`; 

        await pool.query(insertRelation, [userId, documentosActasId]);

        res.redirect('/principal');
    }catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Error al procesar la solicitud.');
    }  
};

export const listarAct = async (req, res) => {
    const userId = req.session.user_id;
    const userRole = req.session.rol;
        
    let query = `SELECT id, nombre, facultad, fecha, hora, etapa, objetivo, descripcion, problemas, inspector, cargo 
                 FROM DocumentosActas`;
        
    if (userRole === 'usuario') {
                // Consulta para usuarios con rol 'usuario', solo muestra los documentos con permiso
        query = `SELECT DocumentosActas.id, DocumentosActas.nombre, DocumentosActas.facultad, DocumentosActas.fecha, 
                        DocumentosActas.hora, DocumentosActas.etapa, DocumentosActas.objetivo, DocumentosActas.descripcion, 
                        DocumentosActas.problemas, DocumentosActas.inspector, DocumentosActas.cargo
                 FROM DocumentosActas
                 JOIN Permisos ON DocumentosActas.id = Permisos.documento_acta_id
                 WHERE Permisos.usuario_id = $1`;
    }
        
    try{
        // Ejecuta la consulta según el rol del usuario
        const { rows } = await pool.query(query, userRole === 'usuario' ? [userId] :[]);
            console.log("Datos obtenidos de la tabla DocumentosActas:", rows);
            res.json({ documentos: rows, rol: userRole });
    } catch (error) {
            console.error("Error al obtener los datos de la tabla DocumentosActas:", error.message);
            res.status(500).send('Error al obtener los datos.');
    }
};
        
export const mostrarAct= async (req,res)=>{
    const {nombre}= req.params;
    const userRole = req.session.rol;

    try{
        const { rows } = await pool.query("SELECT * FROM DocumentosActas WHERE nombre=$1",[nombre]);
        console.log("Datos obtenidos de la tabla DocumentosActas:", rows);
        res.status(200).json({ documentos: rows, rol: userRole });
    } catch (err) {
        console.error("Error al obtener los datos de la base de datos:", err.message);
        res.status(500).send("Error al obtener los datos.");
    }
}

export const eliminarAct= async (req, res)=>{
    const {id}= req.params;

    const query = "DELETE FROM DocumentosActas WHERE id=$1";

    try {
        // Ejecutar la consulta para eliminar el acta
        const result = await pool.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).send("No se encontró el acta con el ID proporcionado.");
        }else{
            console.log(`Acta con ID ${id} eliminada.`);
            res.status(200).send(`Acta con ID ${id} eliminada correctamente.`);
        }   
    } catch (err) {
        console.error("Error al eliminar los datos:", err.message);
        res.status(500).send("Error al eliminar los datos.");
    }
}

export const editarAct = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const userId = req.session.user_id;

    await pool.query('SELECT usuario FROM Usuarios WHERE id = ?', [userId], async (err, row) => {
        if (err) {
            console.error('Error al obtener el nombre del usuario:', err.message);
            return res.status(500).send('Error al obtener el nombre del usuario.');
        }
    
        const userName = row.usuario;

    // SQL para actualizar varios campos
    const query = `UPDATE DocumentosActas 
                   SET facultad =$1, fecha =$2, hora =$3, etapa =$4, objetivo =$5, descripcion =$6, problemas =$7, inspector =$8, cargo =$9, nombre =$10
                   WHERE id =$11`;

    try {
     // Ejecutar la consulta para actualizar el acta
         const result = await pool.query(query, [
         data.facultad, data.fecha, data.hora, data.etapa, data.objetivo, data.descripcion, 
         data.problemas, data.inspector, data.cargo, data.nombre, id]);

        if (result.rowCount === 0) {
            res.status(404).send("No se encontró el acta con el ID proporcionado.");
        } else {
              // Crear la notificación
              const mensaje = `El usuario ${userName} editó el documento "${data.nombre}"`;
              const insertNotification = `INSERT INTO Notificaciones (mensaje, fecha, documentosActas_id, documentosExp_id) VALUES (?, ?, ?, ?)`;
              const fechaActual = new Date().toISOString().split('T')[0];

              await pool.query(insertNotification,[mensaje, fechaActual, id, null]);
              res.status(200).send(`Acta con ID ${id} actualizada correctamente.`);
        }
    } catch (err) {
        console.error("Error al actualizar los datos:", err.message);
        res.status(500).send("Error al actualizar los datos.");
    }
});
}