import { db } from "../db.js";

export const verificarAdminExp= function(req, res, next) {
    if (req.session.rol === 'admin') {
        next(); // Si es administrador, permite el acceso
    } else {
        res.status(403).send('Acceso denegado. No tienes permisos para esta operación.');
    }
}

export const crearExp= function(req,res){
    const userId = req.session.user_id;
    const datos= req.body;
        
    let nombreDoc= datos.nombreDoc;
    let facultadExp= datos.facultadExp;
    let curso= datos.curso;
    let tipoCurso= datos.tipoCurso;
    let carrera= datos.carrera;
    let fechaExp= datos.fechaExp;
    let participantes= datos.participantes;
    let objetivoExp= datos.objetivoExp;
    let general= datos.general;
    let h_matricula= datos.h_matricula;
    let titulos= datos.titulos;
    let s_militar= datos.s_militar;
    let ev_integradas= datos.ev_integradas;
    let h_resultado= datos.h_resultado;
    let convalidaciones= datos.convalidaciones;
    let r_matricula= datos.r_matricula;
    let reingresos= datos.reingresos;
    let licencia= datos.licencia;
    let ingles= datos.ingles;
    let otra= datos.otra;
    let indicaciones= datos.indicaciones;
    let observaciones= datos.observaciones;
    let clasif_aspectos= datos.clasif_aspectos;
    let val_cualitativa= datos.val_cualitativa;
    let plan_docente= datos.plan_docente;
    let num_facultad= datos.num_facultad;
    let cif_mat_ini= datos.cif_mat_ini;
    let exp_revisados= datos.exp_revisados;
    let num_infracciones= datos.num_infracciones;
    let num_señalamientos= datos.num_señalamientos;
    let num_observaciones= datos.num_observaciones;

    
    let insertar=`INSERT INTO DocumentosExp(
                   nombre, facultad, curso, t_curso, carrera, fecha, participantes, 
                   objetivo, señ_general, hoja_matricula, titulos_e, doc_SM, eval_integ, 
                   hoja_result, convalidaciones, ratif_matric, reingresos, alta_lic_mat, 
                   req_ingles, otra, indicaciones, observaciones, clasif_aspectos, val_cualit,
                   cumplimiento_plan, num_facultad, cifra_mat_ini, num_exp_revisados, num_infracciones, 
                   num_señalamientos, num_observaciones) 
                  VALUES(? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? )`;
            //console.log(datos);
            
    db.run(insertar,[nombreDoc, facultadExp, curso, tipoCurso, carrera, fechaExp, participantes, 
                     objetivoExp, general, h_matricula, titulos, s_militar, ev_integradas, h_resultado, 
                     convalidaciones, r_matricula, reingresos, licencia, ingles, otra, indicaciones, 
                     observaciones, clasif_aspectos, val_cualitativa, plan_docente, num_facultad, 
                     cif_mat_ini, exp_revisados, num_infracciones, num_señalamientos, num_observaciones], 
                function(error){
                if(error){
                    throw error;
                }
                else{
                    console.log("Datos almacenados");

// Crear la notificación
const documentosExpId = this.lastID; // Obtén el ID del último registro insertado
const mensaje = `Se creó el documento "${nombreDoc}"`;
const insertNotification = `INSERT INTO Notificaciones (mensaje, fecha, documentosActas_id, documentosExp_id) VALUES (?, ?, ?, ?)`;

    console.log('documentosExpId:', documentosExpId);

    db.run(insertNotification, [mensaje, fechaExp,null, documentosExpId], (err) => {
        if (err) {
            console.error('Error al guardar la notificación:', err.message);
            return res.status(500).send('Error al guardar la notificación.');
        }
// Insertar en DocumentosActas_usuario
const insertRelation = `
INSERT INTO DocumentosExp_usuario (usuario_id, DocumentosExp_id)
VALUES (?, ?)
`;

db.run(insertRelation, [userId, documentosExpId], (err) => {
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

export const listarExp= (req, res)=>{
    const userId = req.session.user_id;
    const userRole = req.session.rol;

    let query= `SELECT id, nombre, facultad, curso, t_curso, carrera, fecha, participantes, 
                   objetivo, señ_general, hoja_matricula, titulos_e, doc_SM, eval_integ, 
                   hoja_result, convalidaciones, ratif_matric, reingresos, alta_lic_mat, 
                   req_ingles, otra, indicaciones, observaciones, clasif_aspectos, val_cualit,
                   cumplimiento_plan, num_facultad, cifra_mat_ini, num_exp_revisados, num_infracciones, 
                   num_señalamientos, num_observaciones FROM DocumentosExp`;

    if (userRole === 'usuario') {
    query = `
        SELECT DocumentosExp.id, DocumentosExp.nombre, DocumentosExp.facultad, DocumentosExp.curso, 
                DocumentosExp.t_curso, DocumentosExp.carrera, DocumentosExp.fecha, DocumentosExp.participantes, 
                DocumentosExp.objetivo, DocumentosExp.señ_general, DocumentosExp.hoja_matricula, DocumentosExp.titulos_e, 
                DocumentosExp.doc_SM, DocumentosExp.eval_integ, DocumentosExp.hoja_result, DocumentosExp.convalidaciones, 
                DocumentosExp.ratif_matric, DocumentosExp.reingresos, DocumentosExp.alta_lic_mat, DocumentosExp.req_ingles, 
                DocumentosExp.otra, DocumentosExp.indicaciones, DocumentosExp.observaciones, DocumentosExp.clasif_aspectos, 
                DocumentosExp.val_cualit, DocumentosExp.cumplimiento_plan, DocumentosExp.num_facultad, DocumentosExp.cifra_mat_ini, 
                DocumentosExp.num_exp_revisados, DocumentosExp.num_infracciones, DocumentosExp.num_señalamientos, 
                DocumentosExp.num_observaciones
        FROM DocumentosExp
        JOIN Permisos ON DocumentosExp.id = Permisos.documento_id
        WHERE Permisos.usuario_id = ?
    `;
}
            
db.all(query, userRole === 'usuario' ? [userId] : [], (err, rows) => {
    if (err) {
        console.error("Error al obtener los datos de la base de datos:", err.message);
        return res.status(500).send("Error al obtener los datos.");
    }
    console.log("Datos obtenidos de la tabla DocumentosExp:", rows);
    res.json({ documentos: rows, rol: userRole });

    });
}

    export const mostrarExp = (req, res) => {
        const { nombre } = req.params;
        const userRole = req.session.rol;
        
            db.all("SELECT * FROM DocumentosExp WHERE nombre = ?", [nombre], (err, rows) => {
                if (err) {
                    console.error("Error al obtener los datos de la base de datos:", err.message);
                    res.status(500).send("Error al obtener los datos.");
                    return;
                } 
                console.log("Datos obtenidos de la tabla DocumentosActas:", rows);
    
                res.status(200).json({ documentos: rows, rol: userRole });
            });
            
        }

export const eliminarExp= (req, res)=>{
    const {id}= req.params;
    //console.log(`Solicitud para eliminar expediente con ID: ${id}`);
    db.run("DELETE FROM DocumentosExp WHERE id=$1",[id], function(err){
        if (err) {
            console.error("Error al eliminar al datos:", err.message);
            res.status(500).send("Error al eliminar los datos.");
            return;
        }
            
        if (this.changes === 0) {
            res.status(404).send("No se encontró el expediente con el ID proporcionado.");
            } 
        else {
            console.log(`Expediente con ID ${id} eliminado.`);
            res.status(200).send(`Expediente con ID ${id} eliminado correctamente.`);
            }
        });
    }

export const editarExp = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    
        // SQL para actualizar varios campos
    const query = `UPDATE DocumentosExp 
                       SET nombre= $1, facultad= $2, curso= $3, t_curso= $4, carrera= $5, fecha= $6, participantes= $7, 
                           objetivo= $8, señ_general= $9, hoja_matricula= $10, titulos_e= $11, doc_SM= $12, eval_integ= $13, 
                           hoja_result= $14, convalidaciones= $15, ratif_matric= $16, reingresos= $17, alta_lic_mat= $18, 
                           req_ingles= $19, otra= $20, indicaciones= $21, observaciones= $22, clasif_aspectos= $23, val_cualit= $24,
                           cumplimiento_plan= $25, num_facultad= $26, cifra_mat_ini= $27, num_exp_revisados= $28, num_infracciones= $29, 
                           num_señalamientos= $30, num_observaciones= $31
                       WHERE id =$32`;
    
    db.run(query, [data.nombre, data.facultad, data.curso, data.t_curso, data.carrera, data.fecha, data.participantes, 
                   data.objetivo, data.señ_general, data.hoja_matricula, data.titulos_e, data.doc_SM, data.eval_integ, 
                   data.hoja_result, data.convalidaciones, data.ratif_matric, data.reingresos, data.alta_lic_mat, 
                   data.req_ingles, data.otra, data.indicaciones, data.observaciones, data.clasif_aspectos, data.val_cualit,
                   data.cumplimiento_plan, data.num_facultad, data.cifra_mat_ini, data.num_exp_revisados, data.num_infracciones, 
                   data.num_señalamientos, data.num_observaciones, id], 
    function(err) {
        if (err) {
            console.error("Error al actualizar los datos:", err.message);
            res.status(500).send("Error al actualizar los datos.");
            return;
        }
    
        if (this.changes === 0) {
            res.status(404).send("No se encontró el expediente con el ID proporcionado.");
            } 
        else {
            res.status(200).send(`Expediente con ID ${id} actualizada correctamente.`);
            }
        });
    }