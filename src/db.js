import pg from 'pg';
// import { database, host, password, port, user } from 'pg/lib/defaults';

export const pool= new pg.Pool({
    user:"postgres",
    host:"localhost",
    password:"12345",
    database:"datos",
    port:"5432"
});

// pool.query(`
// CREATE TABLE Permisos (
//     id SERIAL PRIMARY KEY,
//     usuario_id INTEGER,
//     documento_acta_id INTEGER,
//     documento_exp_id INTEGER,
//     tipo_documento TEXT,
//     FOREIGN KEY (usuario_id) REFERENCES Usuarios(id) ON DELETE CASCADE,
//     FOREIGN KEY (documento_acta_id) REFERENCES DocumentosActas(id) ON DELETE CASCADE,
//     FOREIGN KEY (documento_exp_id) REFERENCES DocumentosExp(id) ON DELETE CASCADE
// );
// `)