import { pool } from "../db.js";

export const verificarAdmin = function (req, res, next) {
    if (req.session.rol === 'admin') {
        next();
    } else {
        res.status(403).send('Acceso denegado. No tienes permisos para esta operación.');
    }
};

export const asignarPermiso = async (req, res) => {
    const { nombre_usuario, nombre_documento, tipo_documento } = req.body;

    try {
        // Validar el tipo de documento
        const tipoDocumentoNormalizado = tipo_documento.toLowerCase(); // Convertir a minúsculas
        if (!['acta', 'expediente'].includes(tipoDocumentoNormalizado)) {
            return res.status(400).send('Tipo de documento no válido.');
        }

        // Obtener el ID del usuario
        const usuarioQuery = `SELECT id FROM Usuarios WHERE usuario = $1`;
        const usuarioResult = await pool.query(usuarioQuery, [nombre_usuario]);

        if (usuarioResult.rows.length === 0) {
            console.error('Usuario no encontrado');
            return res.status(404).send('Usuario no encontrado.');
        }

        const usuarioId = usuarioResult.rows[0].id;

        // Obtener el ID del documento según el tipo
        const documentoTabla = tipoDocumentoNormalizado === 'acta' ? 'DocumentosActas' : 'DocumentosExp';
        const documentoQuery = `SELECT id FROM ${documentoTabla} WHERE nombre = $1`;
        const documentoResult = await pool.query(documentoQuery, [nombre_documento]);

        if (documentoResult.rows.length === 0) {
            console.error('Documento no encontrado');
            return res.status(404).send('Documento no encontrado.');
        }

        const documentoId = documentoResult.rows[0].id;

        // Asignar permisos según el tipo de documento
        const permisoQuery = `
            INSERT INTO Permisos (usuario_id, documento_acta_id, documento_exp_id, tipo_documento)
            VALUES ($1, $2, $3, $4)
        `;
        const permisoParams = [
            usuarioId,
            tipoDocumentoNormalizado === 'acta' ? documentoId : null,
            tipoDocumentoNormalizado === 'expediente' ? documentoId : null,
            tipo_documento
        ];

        await pool.query(permisoQuery, permisoParams);

        res.status(200).send('Permiso asignado correctamente.');
    } catch (error) {
        console.error('Error al asignar permiso:', error.message);
        res.status(500).send('Error al asignar permiso.');
    }
};
