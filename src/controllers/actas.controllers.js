import { db } from "../db.js";

export const verificarAdmin= function(req, res, next) {
    if (req.session.rol === 'admin') {
        next(); // Si es administrador, permite el acceso
    } else {
        res.status(403).send('Acceso denegado. No tienes permisos para esta operación.');
    }
}


export const crearAct= function(req,res){
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

    let registrar="INSERT INTO DocumentosActas(nombre, facultad, fecha, hora, etapa, objetivo, descripcion, problemas, inspector, cargo) VALUES('"+nombreDoc+"','"+facultadAct+"','"+fechaAct+"','"+horaAct+"','"+etapaAct+"','"+objetivoAct+"','"+descripcionAct+"','"+problemasAct+"','"+inspectorAct+"','"+cargoAct+"')";
            //console.log(datos);
            
        db.run(registrar, function(error){
                if(error){
                    throw error;
                }
                else{

            console.log("Datos almacenados");

            // Crear la notificación
            const documentosActaId = this.lastID; // Obtén el ID del último registro insertado
            const mensaje = `Se creó el documento "${nombreDoc}"`;
            const insertNotification = `INSERT INTO Notificaciones (mensaje, fecha, documentosActas_id, documentosExp_id) VALUES (?, ?, ?, ?)`;
        
                console.log('documentosActaId:', documentosActaId);
        
                db.run(insertNotification, [mensaje, fechaAct, documentosActaId, null], (err) => {
                    if (err) {
                        console.error('Error al guardar la notificación:', err.message);
                        return res.status(500).send('Error al guardar la notificación.');
                    }
// Insertar en DocumentosActas_usuario
const insertRelation = `
INSERT INTO DocumentosActas_usuario (usuario_id, DocumentosActas_id)
VALUES (?, ?)
`;

db.run(insertRelation, [userId, documentosActaId], (err) => {
if (err) {
    console.error('Error al guardar la relación usuario-documento acta:', err.message);
    return res.status(500).send('Error al guardar la relación usuario-documento acta.');
}

                    res.redirect('/principal');
                });
            });
        }
});   
};

         export const listarAct = (req, res) => {
            const userId = req.session.user_id;
            const userRole = req.session.rol;
        
            // muestrar todos los documentos de la tabla DocumentosActas
            let query = `
                SELECT id, nombre, facultad, fecha, hora, etapa, objetivo, descripcion, problemas, inspector, cargo 
                FROM DocumentosActas`;
        
            if (userRole === 'usuario') {
                // Consulta para usuarios con rol 'usuario', solo muestra los documentos con permiso
                query = `
                    SELECT DocumentosActas.id, DocumentosActas.nombre, DocumentosActas.facultad, DocumentosActas.fecha, 
                           DocumentosActas.hora, DocumentosActas.etapa, DocumentosActas.objetivo, DocumentosActas.descripcion, 
                           DocumentosActas.problemas, DocumentosActas.inspector, DocumentosActas.cargo
                    FROM DocumentosActas
                    JOIN Permisos ON DocumentosActas.id = Permisos.documento_id
                    WHERE Permisos.usuario_id = ?`;
            }
        
            // Ejecuta la consulta según el rol del usuario
            db.all(query, userRole === 'usuario' ? [userId] : [], (err, rows) => {
                if (err) {
                    console.error("Error al obtener los datos de la base de datos:", err.message);
                    return res.status(500).send("Error al obtener los datos.");
                }
        
                console.log("Datos obtenidos de la tabla DocumentosActas:", rows);
                res.json({ documentos: rows, rol: userRole });
            });
        };
        

export const mostrarAct= (req,res)=>{
    const {nombre}= req.params;
    const userRole = req.session.rol;

    db.all("SELECT * FROM DocumentosActas WHERE nombre=$1",[nombre], (err, rows)=>{
        if (err) {
            console.error("Error al obtener los datos de la base de datos:", err.message);
            res.status(500).send("Error al obtener los datos.");
            return;
        }
        
            console.log("Datos obtenidos de la tabla DocumentosActas:", rows);
    
            res.status(200).json({ documentos: rows, rol: userRole });
    });
}

export const eliminarAct= (req, res)=>{
    const {id}= req.params;

    db.run("DELETE FROM DocumentosActas WHERE id=$1",[id], function(err){
        if (err) {
            console.error("Error al eliminar al datos:", err.message);
            res.status(500).send("Error al eliminar los datos.");
            return;
        }
        
        if (this.changes === 0) {
            res.status(404).send("No se encontró el acta con el ID proporcionado.");
        } else {
            console.log(`Acta con ID ${id} eliminada.`);
            res.status(200).send(`Acta con ID ${id} eliminada correctamente.`);
        }
    });
}

export const editarAct = (req, res) => {
    const { id } = req.params;
    const data = req.body;

    // SQL para actualizar varios campos
    const query = `UPDATE DocumentosActas 
                   SET facultad =$1, fecha =$2, hora =$3, etapa =$4, objetivo =$5, descripcion =$6, problemas =$7, inspector =$8, cargo =$9, nombre =$10
                   WHERE id =$11`;

    db.run(query, [data.facultad, data.fecha, data.hora, data.etapa, data.objetivo, data.descripcion, data.problemas, data.inspector, data.cargo, data.nombre, id], function(err) {
        if (err) {
            console.error("Error al actualizar los datos:", err.message);
            res.status(500).send("Error al actualizar los datos.");
            return;
        }

        if (this.changes === 0) {
            res.status(404).send("No se encontró el acta con el ID proporcionado.");
        } else {
            
            res.status(200).send(`Acta con ID ${id} actualizada correctamente.`);
        }
    });
}
