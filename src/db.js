import pg from 'pg';
//import {config} from 'dotenv';

//config();

export const pool= new pg.Pool({
    user:'datos_owner',
    host:'ep-spring-resonance-a5ecjrn1.us-east-2.aws.neon.tech',
    password:'LE1WViqlxw2z',
    database:'datos',
    port:"5432",
    ssl: {
        rejectUnauthorized: false 
    }
});
