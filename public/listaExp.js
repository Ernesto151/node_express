
async function eliminarExp(id) {
    try {
        const response = await fetch(`/expedientes/${id}`, { method: 'DELETE' });

        if (response.ok) {
            console.log(`expediente con ID ${id} eliminado correctamente.`);
            document.getElementById(`expediente-${id}`).remove();  // Eliminar el elemento del DOM
        }else {
            console.error("Error al eliminar el expediente.");
        }
    }catch (error) {
        console.error("Error al realizar la solicitud de eliminación:", error);
    }
}

function abrirFormularioEdicionExp(expediente) {

    const expElementEdit = document.getElementById(`expediente-${expediente.id}`);

    if (expElementEdit) {
    // Crear un contenedor
        let edicionContainerExp = document.getElementById(`edicionExp-container-${expediente.id}`);
        if (!edicionContainerExp) {
            edicionContainerExp = document.createElement('div');
            edicionContainerExp.id = `edicionExp-container-${expediente.id}`;
            edicionContainerExp.style.display = 'none';
            expElementEdit.appendChild(edicionContainerExp);
        }

        edicionContainerExp.innerHTML = `
            <form id="formExp-${expediente.id}">
                <h1 class="encabezadoExp">Registro y Control de las Inspecciones realizadas por la Secretaría General según la Resolución Ministerial 119/21 capítulo XIV.</h1>
                <label for="nombreDoc">Nombre del documento:</label>
                <input type="text" class="inputExp" name="nombre" value="${expediente.nombre}"/>
                <label for="facultadExp">Facultad:</label>
                <input type="text" class="inputExp" name="facultad" value="${expediente.facultad}"/>
                <label for="curso">Curso:</label>
                <input type="text" class="inputExp" name="curso" value="${expediente.curso}"/>
                <label for="tipoCurso">Tipo de Curso:</label>
                <input type="text" class="inputExp" name="t_curso" value="${expediente.t_curso}"/>
                <label for="carrera">Carrera:</label>
                <input type="text" class="inputExp" name="carrera" value="${expediente.carrera}"/>
                <label for="fechaExp">Fecha:</label>
                <input type="date" class="inputExp" name="fecha" value="${expediente.fecha}"/>
                <label for="participantes">Participantes:</label>
                <textarea name="participantes">${expediente.participantes}</textarea>
                <label for="objetivoExp">Objetivo: Revisar expedientes de <input type="text" name="objetivo" value="${expediente.objetivo}" readonly/> año.</label>
                <h3 class="ici-cd">ICI CD</h3>
                <h3 class="asp-señalados">Aspectos señalados:</h3>
                <label for="general"><b>I. General:</b></label>
                <textarea name="señ_general">${expediente.señ_general}</textarea>
                <label for="h_matricula">Hoja de matrícula:</label>
                <textarea name="hoja_matricula">${expediente.hoja_matricula}</textarea>
                <label for="titulos">Títulos de enseñanza precedente:</label>
                <textarea name="titulos_e">${expediente.titulos_e}</textarea>
                <label for="s_militar">Documentación del servicio militar:</label>
                <textarea name="doc_SM">${expediente.doc_SM}</textarea>
                <label for="ev_integradas">Evaluaciones Integradas:</label>
                <textarea name="eval_integ">${expediente.eval_integ}</textarea>
                <label for="h_resultado">Hojas de resultados:</label>
                <textarea name="hoja_result">${expediente.hoja_result}</textarea>
                <label for="convalidaciones">Convalidaciones:</label>
                <textarea name="convalidaciones">${expediente.convalidaciones}</textarea>
                <label for="r_matricula">Ratificación de matrícula:</label>
                <textarea name="ratif_matric">${expediente.ratif_matric}</textarea>
                <label for="reingresos">Reingresos:</label>
                <textarea name="reingresos">${expediente.reingresos}</textarea>
                <label for="licencia">Alta de licencia de matrícula:</label>
                <textarea name="alta_lic_mat">${expediente.alta_lic_mat}</textarea>
                <label for="ingles">Requisito de Inglés:</label>
                <textarea name="req_ingles">${expediente.req_ingles}</textarea>
                <label for="otra">Otra:</label>
                <textarea name="otra">${expediente.otra}</textarea>
                <label for="indicaciones"><b>II. Indicaciones o acciones a cumplir para erradicar señalamiento</b></label>
                <textarea name="indicaciones">${expediente.indicaciones}</textarea>
                <label for="observaciones"><b>III. Observaciones o Recomendaciones</b></label>
                <textarea name="observaciones">${expediente.observaciones}</textarea>
                <label for="clasif_aspectos"><b>IV. Clasificación de los aspectos detectados(Fraudes, Violaciones, Infracciones, Señalamientos)</b></label>
                <textarea name="clasif_aspectos">${expediente.clasif_aspectos}</textarea>
                <label for="val_cualitativa"><b>V. Valoración Cualitativa:</b></label>
                <textarea name="val_cualit">${expediente.val_cualit}</textarea>
                <label for="plan_docente"><b>VI. Cumplimiento del plan del proceso docente</b></label>
                <textarea name="cumplimiento_plan">${expediente.cumplimiento_plan}</textarea>
                <label for=""><b>VII. Valoración cuantitativa</b></label>
                <table class="cont-tabla">
                <tr class="cont-tabla-tr">
                    <th>Facultad</th>
                    <th>Cifras matrícula inicial</th>
                    <th># Expedientes revisados</th>
                    <th>Infracciones</th>
                    <th>Señalamientos</th>
                    <th>Observaciones</th>
                </tr>

                <tr>
                    <td><input type="text" name="num_facultad" value="${expediente.num_facultad}" /></td>
                    <td><input type="number" name="cifra_mat_ini" value="${expediente.cifra_mat_ini}" readonly /></td>
                    <td><input type="number" name="num_exp_revisados" value="${expediente.num_exp_revisados}" /></td>
                    <td><input type="number" name="num_infracciones" value="${expediente.num_infracciones}" /></td>
                    <td><input type="number" name="num_señalamientos" value="${expediente.num_señalamientos}" /></td>
                    <td><input type="number" name="num_observaciones" value="${expediente.num_observaciones}" /></td>
                </tr>
                </table>

                <label for="inspectoraExp">Inspectora Sec. General</label>
                <input type="file" id="inspectoraExp" accept="image/*" onchange="previewImageExp('inspectoraExp', 'previewInspectoraExp')" />
                <label for="sec-generalExp">Secretaria General</label>
                <input type="file" id="sec-generalExp" accept="image/*" onchange="previewImageExp('sec-generalExp', 'previewSecGeneralExp')" />
                <label for="sec-docenteExp">Secretaria Docente</label>
                <input type="file" id="sec-docenteExp" accept="image/*" onchange="previewImageExp('sec-docenteExp', 'previewSecDocenteExp')" />
                <div>
                <button type="button" class="btn-guardarEditar-Exp" onclick="guardarCambiosExp(${expediente.id})">Guardar</button>
                <button type="button" id="cancelarEdicion-btn-${expediente.id}" class="btn-cerrarEditar-Exp" onclick="cancelarEdicionExp(${expediente.id})">Cancelar</button>
                </div>
            </form>`;

        edicionContainerExp.style.display = 'block';

    }else {
        console.error(`El elemento con ID expediente-${expediente.id} no se encontró en el DOM.`);
    }  
}

function cancelarEdicionExp(id) {
    const edicionContainerExp = document.getElementById(`edicionExp-container-${id}`);

    if (edicionContainerExp) {
        edicionContainerExp.style.display = 'none';
    }
}

function verDetallesExp(expediente) {

    const expElement = document.getElementById(`expediente-${expediente.id}`);

    if (expElement) {
     // Crear un contenedor si no existe
        let detallesContainerExp = document.getElementById(`detallesExp-container-${expediente.id}`);
        if (!detallesContainerExp) {
            detallesContainerExp = document.createElement('div');
            detallesContainerExp.id = `detallesExp-container-${expediente.id}`;
            detallesContainerExp.style.display = 'none';
            expElement.appendChild(detallesContainerExp);
        }

        detallesContainerExp.innerHTML = `
            <form id="detallesExp-form-${expediente.id}">
                <h1 class="encabezadoExp">Registro y Control de las Inspecciones realizadas por la Secretaría General según la Resolución Ministerial 119/21 capítulo XIV.</h1>
                <label for="nombreDoc">Nombre del documento:</label>
                <input type="text" class="inputExp" name="nombre" value="${expediente.nombre}" readonly/>
                <label for="facultadExp">Facultad:</label>
                <input type="text" class="inputExp" name="facultad" value="${expediente.facultad}" readonly/>
                <label for="curso">Curso:</label>
                <input type="text" class="inputExp" name="curso" value="${expediente.curso}" readonly/>
                <label for="tipoCurso">Tipo de Curso:</label>
                <input type="text" class="inputExp" name="t_curso" value="${expediente.t_curso}" readonly/>
                <label for="carrera">Carrera:</label>
                <input type="text" class="inputExp" name="carrera" value="${expediente.carrera}" readonly/>
                <label for="fechaExp">Fecha:</label>
                <input type="date" class="inputExp" name="fecha" value="${expediente.fecha}" readonly/>
                <label for="participantes">Participantes:</label>
                <textarea name="participantes" readonly>${expediente.participantes}</textarea>
                <label for="objetivoExp">Objetivo: Revisar expedientes de <input type="text" name="objetivo" value="${expediente.objetivo}" readonly/> año.</label>
                <h3 class="ici-cd">ICI CD</h3>
                <h3 class="asp-señalados">Aspectos señalados:</h3>
                <label for="general"><b>I. General:</b></label>
                <textarea name="señ_general" readonly>${expediente.sen_general}</textarea>
                <label for="h_matricula">Hoja de matrícula:</label>
                <textarea name="hoja_matricula" readonly>${expediente.hoja_matricula}</textarea>
                <label for="titulos">Títulos de enseñanza precedente:</label>
                <textarea name="titulos_e" readonly>${expediente.titulos_e}</textarea>
                <label for="s_militar">Documentación del servicio militar:</label>
                <textarea name="doc_SM" readonly>${expediente.doc_SM}</textarea>
                <label for="ev_integradas">Evaluaciones Integradas:</label>
                <textarea name="eval_integ" readonly>${expediente.eval_integ}</textarea>
                <label for="h_resultado">Hojas de resultados:</label>
                <textarea name="hoja_result" readonly>${expediente.hoja_result}</textarea>
                <label for="convalidaciones">Convalidaciones:</label>
                <textarea name="convalidaciones" readonly>${expediente.convalidaciones}</textarea>
                <label for="r_matricula">Ratificación de matrícula:</label>
                <textarea name="ratif_matric" readonly>${expediente.ratif_matric}</textarea>
                <label for="reingresos">Reingresos:</label>
                <textarea name="reingresos" readonly>${expediente.reingresos}</textarea>
                <label for="licencia">Alta de licencia de matrícula:</label>
                <textarea name="alta_lic_mat" readonly>${expediente.alta_lic_mat}</textarea>
                <label for="ingles">Requisito de Inglés:</label>
                <textarea name="req_ingles" readonly>${expediente.req_ingles}</textarea>
                <label for="otra">Otra:</label>
                <textarea name="otra" readonly>${expediente.otra}</textarea>
                <label for="indicaciones"><b>II. Indicaciones o acciones a cumplir para erradicar señalamiento</b></label>
                <textarea name="indicaciones" readonly>${expediente.indicaciones}</textarea>
                <label for="observaciones"><b>III. Observaciones o Recomendaciones</b></label>
                <textarea name="observaciones" readonly>${expediente.observaciones}</textarea>
                <label for="clasif_aspectos"><b>IV. Clasificación de los aspectos detectados(Fraudes, Violaciones, Infracciones, Señalamientos)</b></label>
                <textarea name="clasif_aspectos" readonly>${expediente.clasif_aspectos}</textarea>
                <label for="val_cualitativa"><b>V. Valoración Cualitativa:</b></label>
                <textarea name="val_cualit" readonly>${expediente.val_cualit}</textarea>
                <label for="plan_docente"><b>VI. Cumplimiento del plan del proceso docente</b></label>
                <textarea name="cumplimiento_plan" readonly>${expediente.cumplimiento_plan}</textarea>
                <label for=""><b>VII. Valoración cuantitativa</b></label>
                <table class="cont-tabla">
                <tr class="cont-tabla-tr">
                    <th>Facultad</th>
                    <th>Cifras matrícula inicial</th>
                    <th># Expedientes revisados</th>
                    <th>Infracciones</th>
                    <th>Señalamientos</th>
                    <th>Observaciones</th>
                </tr>

                <tr>
                    <td><input type="text" name="num_facultad" value="${expediente.num_facultad}" readonly /></td>
                    <td><input type="number" name="cifra_mat_ini" value="${expediente.cifra_mat_ini}" readonly /></td>
                    <td><input type="number" name="num_exp_revisados" value="${expediente.num_exp_revisados}" readonly /></td>
                    <td><input type="number" name="num_infracciones" value="${expediente.num_infracciones}" readonly /></td>
                    <td><input type="number" name="num_señalamientos" value="${expediente.num_senalamientos}" readonly /></td>
                    <td><input type="number" name="num_observaciones" value="${expediente.num_observaciones}" readonly /></td>
                </tr>
                </table>

                <label for="inspectoraExp">Inspectora Sec. General</label>
                <input type="file" id="inspectoraExp" accept="image/*" onchange="previewImageExp('inspectoraExp', 'previewInspectoraExp')" />
                <label for="sec-generalExp">Secretaria General</label>
                <input type="file" id="sec-generalExp" accept="image/*" onchange="previewImageExp('sec-generalExp', 'previewSecGeneralExp')" />
                <label for="sec-docenteExp">Secretaria Docente</label>
                <input type="file" id="sec-docenteExp" accept="image/*" onchange="previewImageExp('sec-docenteExp', 'previewSecDocenteExp')" />
                <div>
                <button type="button" id="cerrar-btn-${expediente.id}" class="btn-cerrarDetalles-Exp" onclick="cerrarDetallesExp(${expediente.id})">Cerrar</button>
                <button type="button" class="btn-pdfDetalles-Exp" onclick="exportarPDFDetallesExp(${JSON.stringify(expediente).replace(/"/g, '&quot;')})">Exportar PDF</button>
                </div>                    
            </form>`;

        detallesContainerExp.style.display = 'block';

    }else {
        console.error(`El elemento con ID expediente-${expediente.id} no se encontró en el DOM.`);
    }  
}

function cerrarDetallesExp(id) {
    const detallesContainerExp = document.getElementById(`detallesExp-container-${id}`);

    if (detallesContainerExp) {
        detallesContainerExp.style.display = 'none';
    }
}

async function guardarCambiosExp(id) {
    const form = document.getElementById(`formExp-${id}`);
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch(`/expedientes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            console.log(`expediente con ID ${id} actualizado correctamente.`);
            // Recargar los nombres para reflejar los cambios
            document.getElementById("fetch-nombresExp").click();
        } else {
            console.error("Error al actualizar el expediente.");
        }
    } catch (error) {
        console.error("Error al realizar la solicitud de actualización:", error);
    }
}

document.getElementById("fetch-nombresExp").addEventListener("click", async function() {
    try {
        const response = await fetch('/expedientes/nombre');

        if (response.ok) {
            const data = await response.json();
            const nombres = data.documentos;
            const userRole = data.rol; 

            const nombresListExp = document.getElementById("nombres-listExp");
            nombresListExp.innerHTML = '';  // Limpiar el contenido

            nombres.forEach(expediente => {
                const rowExp = document.createElement("tr");
                rowExp.id = `expediente-${expediente.id}`;

                const nameCellExp = document.createElement("td");
                nameCellExp.textContent = expediente.nombre;
                rowExp.appendChild(nameCellExp);

                const facultyCellExp = document.createElement("td");
                facultyCellExp.textContent = expediente.facultad;
                rowExp.appendChild(facultyCellExp);

                const dateCellExp = document.createElement("td");
                dateCellExp.textContent = expediente.fecha;
                rowExp.appendChild(dateCellExp);

                // Celda para los botones de acción
                const actionsCellExp = document.createElement("td");

                // Botón de ver
                const viewButtonExp = document.createElement("button");
                viewButtonExp.classList.add("btnListExp");
                viewButtonExp.textContent = "Ver";
                viewButtonExp.addEventListener("click", () => verDetallesExp(expediente));
                actionsCellExp.appendChild(viewButtonExp);

                // Botón de editar
                const editButtonExp = document.createElement("button");
                editButtonExp.classList.add("btnListExp");
                editButtonExp.textContent = "Editar";
        
                if (userRole === 'admin') {
                    editButtonExp.addEventListener("click", () => abrirFormularioEdicionExp(expediente));
                } else {
                    editButtonExp.disabled = true;  
                }
                actionsCellExp.appendChild(editButtonExp);

                // Botón de eliminar
                const deleteButtonExp = document.createElement("button");
                deleteButtonExp.classList.add("btnListExp");
                deleteButtonExp.textContent = "Eliminar";
        
                if (userRole === 'admin') {
                    console.log(expediente);
                    deleteButtonExp.addEventListener("click", () => eliminarExp(expediente.id));
                } else {
                    deleteButtonExp.disabled = true;  // Desactivar el botón para usuarios
                }
                actionsCellExp.appendChild(deleteButtonExp);

                rowExp.appendChild(actionsCellExp);  // Añadir la celda de acciones

                nombresListExp.appendChild(rowExp);  // Añadir la fila a la tabla
            });
        } else {
            console.error("Error en la respuesta del servidor.");
        }
    } catch (error) {
        console.error("Error al obtener los nombres:", error);
    }
});

function cargarDatos() {
    const nDocumentoExp = document.getElementById('nombreDocumentoExp').value;
    const nombresListExp = document.getElementById("nombres-listExp");
          nombresListExp.innerHTML = ''; 

    fetch(`/expedientes/nombre/${nDocumentoExp}`)
    .then(response => response.json())
    .then(data => {
    
        const documentos = data.documentos || [];  
        const userRole = data.rol || "usuario";   

        documentos.forEach(expediente => {
            const rowExp = document.createElement('tr');
            rowExp.id = `expediente-${expediente.id}`;

            // Celda de nombre
            const nameCellExp = document.createElement('td');
            nameCellExp.textContent = expediente.nombre;
            rowExp.appendChild(nameCellExp);

            // Celda de facultad
            const facultyCellExp = document.createElement('td');
            facultyCellExp.textContent = expediente.facultad;
            rowExp.appendChild(facultyCellExp);

            // Celda de fecha
            const dateCellExp = document.createElement('td');
            dateCellExp.textContent = expediente.fecha;
            rowExp.appendChild(dateCellExp);

            // Celda para los botones de acción
            const actionsCellExp = document.createElement('td');

            // Botón de ver
            const viewButtonExp = document.createElement('button');
            viewButtonExp.classList.add('btnListExp');
            viewButtonExp.textContent = 'Ver';
            viewButtonExp.addEventListener('click', () => verDetallesExp(expediente));
            actionsCellExp.appendChild(viewButtonExp);

            if (userRole === 'admin') {
                const editButtonExp = document.createElement('button');
                editButtonExp.classList.add('btnListExp');
                editButtonExp.textContent = 'Editar';
                editButtonExp.addEventListener('click', () =>abrirFormularioEdicionExp(expediente));
                actionsCellExp.appendChild(editButtonExp);

                const deleteButtonExp = document.createElement('button');
                deleteButtonExp.classList.add('btnListExp');
                deleteButtonExp.textContent = 'Eliminar';
                deleteButtonExp.addEventListener('click', () => eliminarExp(expediente.id));
                actionsCellExp.appendChild(deleteButtonExp);
            
            }
            rowExp.appendChild(actionsCellExp);  // Añadir la celda de acciones

            nombresListExp.appendChild(rowExp);
        
        });
    
    }).catch(error => console.error('Error al cargar los datos:', error));
}

// Asociar el evento click del botón con la función para cargar datos
document.getElementById('cargarDatosBtnExp').addEventListener('click', function() {
    const nDocumentoExp = document.getElementById('nombreDocumentoExp').value;
    if (nDocumentoExp) {
        cargarDatos(); 
    }else {
        alert("Por favor, introduce el nombre del documento.");
    }
});