import { Router } from "express";
import { pool } from "../db.js"; 
import { crearExp, editarExp, eliminarExp, listarExp, mostrarExp, verificarAdminExp } from "../controllers/exp.controllers.js";

const router= Router();

//insertar datos
router.post("/expedientes",verificarAdminExp, crearExp);

//listar contenido de la tabla
router.get("/expedientes/nombre", listarExp);

//obtener una fila especifica
router.get("/expedientes/nombre/:nombre",verificarAdminExp, mostrarExp);

//eliminar una fila
router.delete("/expedientes/:id", eliminarExp);

//editar datos
router.put("/expedientes/:id", editarExp);

//notificaciones
router.get('/principal', async (req, res) => {
    const query = `SELECT fecha, mensaje FROM Notificaciones ORDER BY fecha ASC`;

    try{
    const result = await pool.query(query, []);
    const notificacionesExp = result.rows;

    res.render('principal', { notificacionesExp }); // Pasa las notificaciones a la vista
}catch(err){
    console.error('Error al obtener notificaciones:', err.message);
    res.status(500).send('Error al cargar la página principal.');
}
    });


export default router;