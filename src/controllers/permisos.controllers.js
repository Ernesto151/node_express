import { db } from "../db.js";

export const verificarAdmin= function (req, res, next) {
    if (req.session.rol === 'admin') {
        next(); 
    } else {
        res.status(403).send('Acceso denegado. No tienes permisos para esta operación.');
    }
}

export const asignarPermiso= function (req, res){
    const { nombre_usuario, nombre_documento, tipo_documento } = req.body;

    // obtener el ID del usuario a partir del nombre de usuario
    const usuarioQuery = `SELECT id FROM Usuarios WHERE usuario = ?`;

    db.get(usuarioQuery, [nombre_usuario], (err, usuario) => {
        if (err || !usuario) {
            console.error('Error al obtener ID de usuario:', err?.message || 'Usuario no encontrado');
            return res.status(500).send('Error al obtener usuario.');
        }

        // Seleccion de la tabla de documentos según el tipo de documento
        const documentoTabla = tipo_documento === 'acta' ? 'DocumentosActas' : 'DocumentosExp';
        const documentoQuery = `SELECT id FROM ${documentoTabla} WHERE nombre = ?`;
        
        //obtener el ID del documento a partir del nombre del documento
        db.get(documentoQuery, [nombre_documento], (err, documento) => {
            if (err || !documento) {
                console.error('Error al obtener ID del documento:', err?.message || 'Documento no encontrado');
                return res.status(500).send('Error al obtener documento.');
            }

            // Insertar en la tabla Permisos con los IDs obtenidos
            const permisoQuery = `
                INSERT INTO Permisos (usuario_id, documento_id, tipo_documento)
                VALUES (?, ?, ?)
            `;
            db.run(permisoQuery, [usuario.id, documento.id, tipo_documento], function(err) {
                if (err) {
                    console.error('Error al asignar permiso:', err.message);
                    res.status(500).send('Error al asignar permiso.');
                } else {
                    res.status(200).send('Permiso asignado correctamente.');
                }
            });
        });
    });
}
