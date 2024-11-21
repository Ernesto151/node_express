function pdfexportExp() {
    // Encabezado
    var encabezadoExp = document.querySelector('.encabezadoExp').innerText,
        nota_final= document.querySelector('.nota-final').innerText;

    // Inputs del formulario
    var nombreDoc = document.getElementById('nombreDoc').value,
        facultadExp = document.getElementById('facultadExp').value,
        curso = document.getElementById('curso').value,
        tipoCurso = document.getElementById('tipoCurso').value,
        carrera = document.getElementById('carrera').value,
        fechaExp = document.getElementById('fechaExp').value,
        participantes = document.getElementById('participantes').value,
        objetivoExp = document.getElementById('objetivoExp').value,
        general = document.getElementById('general').value,
        h_matricula = document.getElementById('h_matricula').value,
        titulos = document.getElementById('titulos').value,
        s_militar = document.getElementById('s_militar').value,
        ev_integradas = document.getElementById('ev_integradas').value,
        h_resultado = document.getElementById('h_resultado').value,
        convalidaciones = document.getElementById('convalidaciones').value,
        r_matricula = document.getElementById('r_matricula').value,
        reingresos = document.getElementById('reingresos').value,
        licencia = document.getElementById('licencia').value,
        ingles = document.getElementById('ingles').value,
        otra = document.getElementById('otra').value,
        indicaciones = document.getElementById('indicaciones').value,
        observaciones = document.getElementById('observaciones').value,
        clasif_aspectos = document.getElementById('clasif_aspectos').value,
        val_cualitativa = document.getElementById('val_cualitativa').value,
        plan_docente = document.getElementById('plan_docente').value;
        num_facultad = document.getElementById('num_facultad').value,
        cif_mat_ini = document.getElementById('cif_mat_ini').value,
        exp_revisados = document.getElementById('exp_revisados').value,
        num_infracciones = document.getElementById('num_infracciones').value,
        num_señalamientos = document.getElementById('num_señalamientos').value,
        num_observaciones = document.getElementById('num_observaciones').value;
        // inspectora = document.getElementById('inspectora').value,
        // sec_general = document.getElementById('sec-general').value,
        // sec_docente = document.getElementById('sec-docente').value;

        var tableData = [
            [ num_facultad, cif_mat_ini, exp_revisados,
               num_infracciones, num_señalamientos, num_observaciones,]
        ];

    // jsPDF configuración
    var doc = new jsPDF();

    var pageWidth = doc.internal.pageSize.width;
    var headerLines = doc.splitTextToSize(encabezadoExp, pageWidth - 20); // Dividir en varias líneas si es necesario
    doc.setFontSize(16);
    
    // Centrar cada línea del encabezado
    headerLines.forEach((line, index) => {
        var textWidth = doc.getTextWidth(line);
        var xPosition = (pageWidth - textWidth) / 2;
        var yPosition = 20 + (index * 8); // Posición Y ajustada
        doc.text(line, xPosition, yPosition);
    });

    // Documento principal
    doc.setFontSize(12);
    // doc.text("Nombre del Documento: " + nombreDoc, 10, 40);
    doc.text("Facultad: " + facultadExp, 10, 50);
    doc.text("Curso: " + curso, 10, 60);
    doc.text("Tipo de Curso: " + tipoCurso, 10, 70);
    doc.text("Carrera: " + carrera, 10, 80);
    doc.text("Fecha: " + fechaExp, 10, 90);
    doc.text("Participantes: " + participantes, 10, 100);
    doc.text("Objetivo: Revisar expedientes de " + objetivoExp + " año.", 10, 110);

    // Secciones del informe
    doc.text("I. General:", 10, 120);
    doc.text(general, 10, 130);
    doc.text("Hoja de matrícula:", 10, 140);
    doc.text(h_matricula, 10, 150);
    doc.text("Títulos de enseñanza precedente:", 10, 160);
    doc.text(titulos, 10, 170);
    doc.text("Documentación del servicio militar:", 10, 180);
    doc.text(s_militar, 10, 190);
    doc.text("Evaluaciones Integradas:", 10, 200);
    doc.text(ev_integradas, 10, 210);
    doc.text("Hojas de resultados:", 10, 220);
    doc.text(h_resultado, 10, 230);
    doc.text("Convalidaciones:", 10, 240);
    doc.text(convalidaciones, 10, 250);
    doc.text("Ratificación de matrícula:", 10, 260);
    doc.text(r_matricula, 10, 270);
    doc.text("Reingresos:", 10, 280);
    doc.text(reingresos, 10, 290);
    doc.text("Alta de licencia de matrícula:", 10, 300);
    doc.text(licencia, 10, 310);

    // Segunda página
    doc.addPage();
    doc.text("Requisito de Inglés:", 10, 10);
    doc.text(ingles, 10, 20);
    doc.text("Otra:", 10, 30);
    doc.text(otra, 10, 40);
    doc.text("II. Indicaciones:", 10, 50);
    doc.text(indicaciones, 10, 60);
    doc.text("III. Observaciones:", 10, 70);
    doc.text(observaciones, 10, 80);
    doc.text("IV. Clasificación de los aspectos detectados:", 10, 90);
    doc.text(clasif_aspectos, 10, 100);
    doc.text("V. Valoración Cualitativa:", 10, 110);
    doc.text(val_cualitativa, 10, 120);
    doc.text("VI. Cumplimiento del plan del proceso docente:", 10, 130);
    doc.text(plan_docente, 10, 140);

    // Tabla cuantitativa
    doc.text("VII. Valoración Cuantitativa:", 10, 150);
    doc.autoTable({
        head: [['Facultad', 'Cifras matrícula inicial', '# Expedientes revisados', 'Infracciones', 'Señalamientos', 'Observaciones']],
        body: tableData,
        startY: 160,
        styles: { fontSize: 10, halign: 'center' }
    });

    // Nota final
    doc.text(nota_final, 10, 200);

    // Firmas
    doc.text("Inspectora Sec. General: " , 10, 220);
    doc.text("Secretaria General: " , 140, 220);
    doc.text("Secretaria Docente: " , 80, 260);

     // Guardar documento
     //doc.save('expediente.pdf');

        // Obtener archivos de imagen para las firmas
        var inspectoraFile = document.getElementById('inspectora').files[0];
        var secGeneralFile = document.getElementById('sec-general').files[0];
        var secDocenteFile = document.getElementById('sec-docente').files[0];

         // Función para agregar imágenes de firma al PDF
    function addSignatureImageToPDF(file, x, y) {
        if (file) {
            var reader = new FileReader();
            reader.onload = function(event) {
                var img = new Image();
                img.src = event.target.result;
                img.onload = function() {
                    var imgWidth = 50; // Ajustar tamaño de la firma
                    var imgHeight = (img.height * imgWidth) / img.width;
                    doc.addImage(img, 'PNG', x, y, imgWidth, imgHeight);
                    if (file === secDocenteFile) {
                        doc.save(nombreDoc+'.pdf');  // Guardar el PDF al procesar la última imagen
                    }
                }
            }
            reader.readAsDataURL(file);
        }
    }

    // Posiciones y tamaño para las firmas en el PDF
    addSignatureImageToPDF(inspectoraFile, 10, 230); // Firma Inspectora
    addSignatureImageToPDF(secGeneralFile, 140, 230); // Firma Secretaria General
    addSignatureImageToPDF(secDocenteFile, 80, 270); // Firma Secretaria Docente
}

function previewImage(inputId, previewId) {
    var fileInput = document.getElementById(inputId);
    var preview = document.getElementById(previewId);

    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            preview.src = e.target.result; // Establece el src de la imagen de vista previa
            preview.style.display = 'block'; // Muestra la imagen
        };

        reader.readAsDataURL(fileInput.files[0]); // Lee el archivo como DataURL para vista previa
    } else {
        preview.style.display = 'none'; // Oculta la imagen si no hay archivo
    }

}
   

