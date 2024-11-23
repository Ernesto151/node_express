CREATE TABLE IF NOT EXISTS DocumentosActas(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    facultad VARCHAR(100) NOT NULL,
    fecha TEXT NOT NULL,
     hora TEXT NOT NULL,
     etapa TEXT NOT NULL,
     objetivo TEXT NOT NULL,
     descripcion TEXT NOT NULL,
     problemas TEXT NOT NULL,
     inspector TEXT NOT NULL,
     cargo TEXT NOT NULL);


CREATE TABLE IF NOT EXISTS DocumentosExp(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    facultad VARCHAR(100) NOT NULL,
    curso INTEGER NOT NULL,
    t_curso TEXT NOT NULL,
    carrera TEXT NOT NULL,
    fecha TEXT NOT NULL,
    participantes TEXT NOT NULL,
    objetivo TEXT NOT NULL,
    sen_general TEXT NOT NULL,
    hoja_matricula TEXT NOT NULL,
    titulos_e TEXT NOT NULL,
    doc_SM TEXT NOT NULL,
    eval_integ TEXT NOT NULL,
    hoja_result TEXT NOT NULL,
    convalidaciones TEXT NOT NULL,
    ratif_matric TEXT NOT NULL,
    reingresos TEXT NOT NULL,
    alta_lic_mat TEXT NOT NULL,
    req_ingles TEXT NOT NULL,
    otra TEXT NOT NULL,
    indicaciones TEXT NOT NULL,
    observaciones TEXT NOT NULL,
    clasif_aspectos TEXT NOT NULL,
    val_cualit TEXT NOT NULL,
    cumplimiento_plan TEXT NOT NULL,
    num_facultad TEXT NOT NULL,
    cifra_mat_ini INTEGER NOT NULL,
    num_exp_revisados INTEGER NOT NULL,
    num_infracciones INTEGER NOT NULL,
    num_senalamientos INTEGER NOT NULL,
    num_observaciones INTEGER NOT NULL);

CREATE TABLE IF NOT EXISTS Usuarios(
    id SERIAL PRIMARY KEY,
    usuario TEXT NOT NULL,
    contrasena TEXT NOT NULL,
    rol TEXT NOT NULL);

-- CREATE TABLE IF NOT EXISTS Notificaciones (
--     id INTEGER PRIMARY KEY AUTOINCREMENT,
--     mensaje TEXT NOT NULL,
--     fecha TEXT NOT NULL
-- );

CREATE TABLE IF NOT EXISTS Notificaciones (
    id SERIAL PRIMARY KEY,
    mensaje TEXT NOT NULL,
    fecha TEXT NOT NULL,
    documentosActas_id INTEGER,
    documentosExp_id INTEGER,
    FOREIGN KEY (documentosActas_id) REFERENCES DocumentosActas(id) ON DELETE CASCADE,
    FOREIGN KEY (documentosExp_id) REFERENCES DocumentosExp(id) ON DELETE CASCADE

    );

-- agregar columna a la tabla usuarios con el nombre rol
ALTER TABLE Usuarios ADD COLUMN rol TEXT NOT NULL;

CREATE TABLE IF NOT EXISTS Permisos (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER,
    documento_id INTEGER,
    tipo_documento TEXT, 
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (documento_id) REFERENCES DocumentosActas(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS DocumentosExp_usuario(
    usuario_id INTEGER NOT NULL,
    DocumentosExp_id INTEGER NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id),
    FOREIGN KEY (documentosExp_id) REFERENCES DocumentosExp(id) ON DELETE CASCADE
 );

CREATE TABLE IF NOT EXISTS DocumentosActas_usuario(
    usuario_id INTEGER NOT NULL,
    DocumentosActas_id INTEGER NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id),
    FOREIGN KEY (documentosActas_id) REFERENCES DocumentosActas(id) ON DELETE CASCADE
 );