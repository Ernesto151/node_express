import pg from 'pg';
import {config} from 'dotenv';


config();

export const pool= new pg.Pool({
   
    connectionString: process.env.DATABASE_URL
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