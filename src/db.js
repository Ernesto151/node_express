import pg from 'pg';
//import {config} from 'dotenv';
//import { connectionString } from 'pg/lib/defaults';

//config();

export const pool= new pg.Pool({
    user:"postgres",
    host:"localhost",
    password:"12345",
    database:"datos",
    port:"5432",
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