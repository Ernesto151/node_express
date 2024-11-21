       
async function eliminarActa(id) {
    try {
        const response = await fetch(`/actas/${id}`, { method: 'DELETE' });

            if (response.ok) {
                console.log(`Acta con ID ${id} eliminada correctamente.`);
                document.getElementById(`acta-${id}`).remove();  // Eliminar el elemento del DOM
            }else {
                console.error("Error al eliminar el acta.");
            }
            }catch (error) {
                console.error("Error al realizar la solicitud de eliminación:", error);
            }
        }

function abrirFormularioEdicion(acta) {

    const actaElementEdit = document.getElementById(`acta-${acta.id}`);
    
    if (actaElementEdit) {
        // Crear un contenedor 
        let edicionContainer = document.getElementById(`editarActa-container-${acta.id}`);
        if (!edicionContainer) {
            edicionContainer = document.createElement('div');
            edicionContainer.id = `editarActa-container-${acta.id}`;
            edicionContainer.style.display = 'none';
            actaElementEdit.appendChild(edicionContainer);
        }

        edicionContainer.innerHTML = `
            <form id="form-${acta.id}">
                <h1 class="encabezadoAct">Informe sobre el control de actas realizada por la Secretaría General a la</h1>
                <label for="facultadAct" id="lfacultadAct">Facultad:</label>
                <input type="text" class="input" name="facultad" value="${acta.facultad}" />
                <label for="fechaAct" id="lfechaAct">Fecha:</label>
                <input type="date" class="input" name="fecha" value="${acta.fecha}" />
                <label for="horaAct" id="lhoraAct">Hora:</label>
                <input type="time" class="input" name="hora" value="${acta.hora}" />
                <label for="etapaAct" id="letapaAct">Etapa que se controla:</label>
                <input type="text" class="input" name="etapa" value="${acta.etapa}" />
                <label for="objetivoAct" id="lobjetivoAct">Objetivo:</label>
                <input type="text" class="input" name="objetivo" value="${acta.objetivo}" />
                <label for="descripcionAct" id="ldescripcionAct">Descripción:</label>
                <textarea name="descripcion" readonly>${acta.descripcion}</textarea>
                <label for="problemasAct" id="lproblemasAct">Principales problemas detectados:</label>
                <textarea name="problemas" readonly>${acta.problemas}</textarea>
                <label for="inspectorAct" id="linspectorAct">Inspector:</label>
                <input type="text" class="input" name="inspector" value="${acta.inspector}" />
                <label for="cargoAct" id="lcargAct">Cargo:</label>
                <input type="text" class="input" name="cargo" value="${acta.cargo}" />
                <label for="nombredoc" name="lnombredoc" id="lnombredoc">Nombre del documento:</label>
                <input type="text" class="input" name="nombre" value="${acta.nombre}" />
                <div>
                <button class="btn-cerrarEditar" type="button" onclick="guardarCambios(${acta.id})">Guardar</button>
                <button class="btn-pdfEditar" type="button" onclick="cancelarEdicion(${acta.id})">Cancelar</button>
                </div>
            </form>`; 

        edicionContainer.style.display = 'block';
    }else {
            console.error(`El elemento con ID acta-${acta.id} no se encontró en el DOM.`);
    }
}
        
function cancelarEdicion(id) {
    const edicionContainer = document.getElementById(`editarActa-container-${id}`);
    
    if (edicionContainer) {
        edicionContainer.style.display = 'none';
    }
}
        
function verDetallesActa(acta) {

    const actaElement = document.getElementById(`acta-${acta.id}`);
    
    if (actaElement) {
        // Crear un contenedor si no existe
        let detallesContainer = document.getElementById(`detallesActa-container-${acta.id}`);
        if (!detallesContainer) {
            detallesContainer = document.createElement('div');
            detallesContainer.id = `detallesActa-container-${acta.id}`;
            detallesContainer.style.display = 'none';
            actaElement.appendChild(detallesContainer);
        }
            
        detallesContainer.innerHTML = `
            <form id="detalles-form-${acta.id}">
                <h1 class="encabezadoAct">Informe sobre el control de actas realizada por la Secretaría General a la</h1>
                <label for="facultadAct" id="lfacultadAct">Facultad:</label>
                <input type="text" class="input" name="facultad" value="${acta.facultad}" readonly />
                <label for="fechaAct" id="lfechaAct">Fecha:</label>
                <input type="date" class="input" name="fecha" value="${acta.fecha}" readonly />
                <label for="horaAct" id="lhoraAct">Hora:</label>
                <input type="time" class="input" name="hora" value="${acta.hora}" readonly />
                <label for="etapaAct" id="letapaAct">Etapa que se controla:</label>
                <input type="text" class="input" name="etapa" value="${acta.etapa}" readonly />
                <label for="objetivoAct" id="lobjetivoAct">Objetivo:</label>
                <input type="text" class="input" name="objetivo" value="${acta.objetivo}" readonly />
                <label for="descripcionAct" id="ldescripcionAct">Descripción:</label>
                <textarea name="descripcion" readonly>${acta.descripcion}</textarea>
                <label for="problemasAct" id="lproblemasAct">Principales problemas detectados:</label>
                <textarea name="problemas" readonly>${acta.problemas}</textarea>
                <label for="inspectorAct" id="linspectorAct">Inspector:</label>
                <input type="text" class="input" name="inspector" value="${acta.inspector}" readonly />
                <label for="cargoAct" id="lcargAct">Cargo:</label>
                <input type="text" class="input" name="cargo" value="${acta.cargo}" readonly />
                <label for="nombredoc" name="lnombredoc" id="lnombredoc">Nombre del documento:</label>
                <input type="text" class="input" name="nombre" value="${acta.nombre}" readonly />
                <div>
                <button id="cerrar-btnActa-${acta.id}" class="btn-cerrarDetalles btnActa" type="button" onclick="cerrarDetalles(${acta.id})">Cerrar</button>
                <button class="btn-pdfDetalles btnActa" type="button" onclick="exportarPDFDetalles(${JSON.stringify(acta).replace(/"/g, '&quot;')})">Exportar PDF</button>
                </div>
            </form>`;

        detallesContainer.style.display = 'block';
    }else {
        console.error(`El elemento con ID acta-${acta.id} no se encontró en el DOM.`);
    }
   
}
 
function cerrarDetalles(id) {
    const detallesContainer = document.getElementById(`detallesActa-container-${id}`);
    
    if (detallesContainer) {
        detallesContainer.style.display = 'none';
    }
}

async function guardarCambios(id) {
    const form = document.getElementById(`form-${id}`);
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch(`/actas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            console.log(`Acta con ID ${id} actualizada correctamente.`);
            // Recargar los nombres para reflejar los cambios
            document.getElementById("fetch-nombres").click();
        }else {
            console.error("Error al actualizar el acta.");
        }
    }catch (error) {
            console.error("Error al realizar la solicitud de actualización:", error);
        }
}


// Cargar los nombres de las actas
document.getElementById("fetch-nombres").addEventListener("click", async function() {
    try {
        const response = await fetch('/actas/nombre');

        if (response.ok) {
            const data = await response.json();
            const nombres = data.documentos;
            const userRole = data.rol; 

            const nombresList = document.getElementById("nombres-list");
            nombresList.innerHTML = '';  // Limpiar el contenido

            nombres.forEach(acta => {
                const row = document.createElement("tr");
                row.id = `acta-${acta.id}`;

                const nameCell = document.createElement("td");
                nameCell.textContent = acta.nombre;
                row.appendChild(nameCell);

                const facultyCell = document.createElement("td");
                facultyCell.textContent = acta.facultad;
                row.appendChild(facultyCell);

                const dateCell = document.createElement("td");
                dateCell.textContent = acta.fecha;
                row.appendChild(dateCell);

                // Celda para los botones de acción
                const actionsCell = document.createElement("td");

                // Botón de ver
                const viewButton = document.createElement("button");
                viewButton.classList.add("btnList");
                viewButton.textContent = "Ver";
                viewButton.addEventListener("click", () => verDetallesActa(acta));
                actionsCell.appendChild(viewButton);

                // Botón de editar
                const editButton = document.createElement("button");
                editButton.classList.add("btnList");
                editButton.textContent = "Editar";
                
                if (userRole === 'admin') {
                    editButton.addEventListener("click", () => abrirFormularioEdicion(acta));
                } else {
                    editButton.disabled = true; 
                }
                actionsCell.appendChild(editButton);

                // Botón de eliminar
                const deleteButton = document.createElement("button");
                deleteButton.classList.add("btnList");
                deleteButton.textContent = "Eliminar";
                
                if (userRole === 'admin') {
                    deleteButton.addEventListener("click", () => eliminarActa(acta.id));
                } else {
                    deleteButton.disabled = true;  
                }
                actionsCell.appendChild(deleteButton);

                row.appendChild(actionsCell);  // Añadir la celda de acciones

                nombresList.appendChild(row);  // Añadir la fila a la tabla
            });
        } else {
            console.error("Error en la respuesta del servidor.");
        }
    } catch (error) {
        console.error("Error al obtener los nombres:", error);
    }
});
        
function cargarDatos() {
    const nDocumento = document.getElementById('nombreDocumento').value;
    const nombresList = document.getElementById("nombres-list");
          nombresList.innerHTML = ''; 

    fetch(`/actas/nombre/${nDocumento}`)
        .then(response => response.json()) 
        .then(data => {
            const documentos = data.documentos || [];  
            const userRole = data.rol || "usuario";  

            documentos.forEach(acta => {
                const row = document.createElement('tr');
                row.id = `acta-${acta.id}`;

                const nameCell = document.createElement('td');
                nameCell.textContent = acta.nombre;
                row.appendChild(nameCell);

                const facultyCell = document.createElement('td');
                facultyCell.textContent = acta.facultad;
                row.appendChild(facultyCell);

                const dateCell = document.createElement('td');
                dateCell.textContent = acta.fecha;
                row.appendChild(dateCell);

                const actionsCell = document.createElement('td');

                const viewButton = document.createElement('button');
                viewButton.classList.add("btnList");
                viewButton.textContent = 'Ver';
                viewButton.addEventListener('click', () => verDetallesActa(acta));
                actionsCell.appendChild(viewButton);

                if (userRole === 'admin') {
                    const editButton = document.createElement('button');
                    editButton.classList.add("btnList");
                    editButton.textContent = 'Editar';
                    editButton.addEventListener('click', () => abrirFormularioEdicion(acta));
                    actionsCell.appendChild(editButton);

                    const deleteButton = document.createElement('button');
                    deleteButton.classList.add("btnList");
                    deleteButton.textContent = 'Eliminar';
                    deleteButton.addEventListener('click', () => eliminarActa(acta.id));
                    actionsCell.appendChild(deleteButton);
                }

                row.appendChild(actionsCell);
                nombresList.appendChild(row);
            });
        })
        .catch(error => console.error('Error al cargar los datos:', error));
}

// Asociar el evento click del botón con la función para cargar datos
document.getElementById('cargarDatosBtn').addEventListener('click', function() {
    const nDocumento = document.getElementById('nombreDocumento').value;
    if (nDocumento) {
        cargarDatos(); 
    } else {
        alert("Por favor, introduce el nombre del documento.");
    }
});
