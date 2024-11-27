import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import ejs from 'ejs';
import session from 'express-session';
import actasRoutes from './routes/actas.routes.js';
import expRoutes from './routes/exp.routes.js';
import registroRoutes from './routes/registrar.routes.js';
import loginRoutes from './routes/login.routes.js';
import permisosRoutes from './routes/permisos.routes.js'
import { pool } from "./db.js";

const app= express();

app.use(session({
    secret: 'RwjigFBR.1122', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('/views', path.join(__dirname, '/views'));
app.set("view engine", "html");
app.engine('html', ejs.renderFile);

app.use('/views',express.static(path.join(__dirname, 'views')));
app.use('/public',express.static(path.join(__dirname, '../public')));

app.use(registroRoutes);
app.use(loginRoutes);
app.use(actasRoutes);
app.use(expRoutes);
app.use(permisosRoutes);

app.get("/",function(req,res){
    res.render("login.html");
});

app.get("/registrar",function(req,res){
    res.render("registrar.html");
});

app.get("/principal",function(req,res){
    res.render("principal.html");
});

app.get("/permisos",function(req,res){
    res.render("permisos.html");
});

app.get("/actas",function(req,res){
    res.render("indexActas.html");
});

app.get("/listaAct",function(req,res){
    res.render("listaAct.html");
});

app.get("/expedientes",function(req,res){
    res.render("indexExp.html");
});

app.get("/listaExp",function(req,res){
    res.render("listaExp.html");
});

// app.get("/fecha", async (req, res)=>{
//     const result= await pool.query('SELECT NOW()');
//     return res.json(result.rows[0]);
// });

app.listen(3000, function(){
    
    console.log("servidor creado http://localhost:3000");
})



    