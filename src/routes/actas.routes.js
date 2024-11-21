import { Router } from "express";
import { db } from "../db.js"; 
import { crearAct, editarAct, eliminarAct, listarAct, mostrarAct, verificarAdmin } from "../controllers/actas.controllers.js";

const router= Router();

//insertar datos en el form
router.post("/actas", verificarAdmin, crearAct);

//listar contenido de la tabla
router.get("/actas/nombre", listarAct);

//obtener una fila especifica
router.get("/actas/nombre/:nombre",verificarAdmin, mostrarAct);

//eliminar una fila
router.delete("/actas/:id", eliminarAct);

//editar datos
router.put("/actas/:id", editarAct);

//notificaciones
router.get('/principal', (req, res) => {
    const query = `SELECT fecha, mensaje FROM Notificaciones ORDER BY fecha DESC`;

    db.all(query, [], (err, notificaciones) => {
        if (err) {
            console.error('Error al obtener notificaciones:', err.message);
            res.status(500).send('Error al cargar la página principal.');
        } else {
            res.render('principal', { notificaciones }); // Pasa las notificaciones a la vista
        }
    });
});

router.delete('/notificaciones/limpiar', (req, res) => {
    const queryD = `DELETE FROM Notificaciones`;
    db.run(queryD, [], (err) => {
        if (err) {
            console.error('Error al borrar notificaciones:', err.message);
            res.status(500).send('Error al borrar notificaciones.');
        } else {
            res.status(200).send('Notificaciones borradas exitosamente');
        }
    });
});



export default router;