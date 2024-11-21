import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const db= new sqlite3.Database('./data.db', sqlite3.OPEN_READWRITE, (error)=>{
    if(error){
        console.error(error);
    }
});
