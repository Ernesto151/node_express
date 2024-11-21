function exportarPDFDetallesExp(expediente) {
    const doc = new jsPDF();
    let cursorY = 20; // Controla la posición actual en Y
    const pageHeight = doc.internal.pageSize.height;

    doc.setFontSize(16);
    
    // Define el ancho máximo permitido para el texto
    const pageWidth = doc.internal.pageSize.width; // Ancho total de la página
    const margin = 10; // Margen a ambos lados
    const maxWidth = pageWidth - margin * 2; // Ancho disponible para el texto
    
    // Divide el texto largo en líneas
    const headerText = "Registro y Control de las Inspecciones realizadas por la Secretaría General según la Resolución Ministerial 119/21 capítulo XIV.";
    const headerLines = doc.splitTextToSize(headerText, maxWidth);
    
    // Añade cada línea al documento, incrementando `cursorY` entre líneas
    headerLines.forEach((line) => {
        doc.text(line, margin, cursorY);
        cursorY += 10; // Espaciado entre líneas
    });

    // Añadir contenido y manejar salto de página si es necesario
    function addTextWithPageBreak(text, x, y) {
        if (y > pageHeight - 20) {
            doc.addPage();
            y = 20;
        }
        doc.text(text, x, y);
        return y + 10;
    }

    doc.setFontSize(12);
    // cursorY = addTextWithPageBreak(`Nombre: ${expediente.nombre}`, 10, cursorY);
    cursorY = addTextWithPageBreak(`Facultad: ${expediente.facultad}`, 10, cursorY);
    cursorY = addTextWithPageBreak(`Curso: ${expediente.curso}`, 10, cursorY);
    cursorY = addTextWithPageBreak(`Tipo de Curso: ${expediente.t_curso}`, 10, cursorY);
    cursorY = addTextWithPageBreak(`Carrera: ${expediente.carrera}`, 10, cursorY);
    cursorY = addTextWithPageBreak(`Fecha: ${expediente.fecha}`, 10, cursorY);
    cursorY = addTextWithPageBreak("Participantes:", 10, cursorY);
    cursorY = addTextWithPageBreak(expediente.participantes, 10, cursorY);
    cursorY = addTextWithPageBreak(`Objetivo: ${expediente.objetivo}`, 10, cursorY);
    cursorY = addTextWithPageBreak("Señalamiento General:", 10, cursorY);
    cursorY = addTextWithPageBreak(expediente.señ_general, 10, cursorY);

    cursorY = addTextWithPageBreak("Hoja de Matrícula:", 10, cursorY);
    cursorY = addTextWithPageBreak(expediente.hoja_matricula, 10, cursorY);

    cursorY = addTextWithPageBreak("Títulos Expedidos:", 10, cursorY);
    cursorY = addTextWithPageBreak(expediente.titulos_e, 10, cursorY);

    doc.addPage();
    cursorY = 20;
    cursorY = addTextWithPageBreak("Documentos SM:", 10, cursorY);
    cursorY = addTextWithPageBreak(expediente.doc_SM, 10, cursorY);
    cursorY = addTextWithPageBreak("Evaluación Integral:", 10, cursorY);
    cursorY = addTextWithPageBreak(expediente.eval_integ, 10, cursorY);
    cursorY = addTextWithPageBreak("Hoja de Resultados:", 10, cursorY);
    cursorY = addTextWithPageBreak(expediente.hoja_result, 10, cursorY);

    doc.autoTable({
        head: [['Facultad', 'Cifras matrícula inicial', '# Expedientes revisados', 'Infracciones', 'Señalamientos', 'Observaciones']],
        body: [[
            expediente.num_facultad,
            expediente.cifra_mat_ini,
            expediente.num_exp_revisados,
            expediente.num_infracciones,
            expediente.num_señalamientos,
            expediente.num_observaciones
        ]],
        startY: cursorY + 10,
        styles: { fontSize: 10, halign: 'center' }
    });

    cursorY = doc.lastAutoTable.finalY + 20;

    // Posiciones fijas para los títulos
    doc.text("Inspectora Sec. General:", 20, 130);
    doc.text("Secretaria General:", 140, 130);
    doc.text("Secretaria Docente:", 80, 160);

    // Añadir imágenes de firma en posiciones fijas
    function addSignatureImage(file, x, y, callback) {
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const img = new Image();
                img.src = event.target.result;
                img.onload = function () {
                    const imgWidth = 40;
                    const imgHeight = (img.height * imgWidth) / img.width;
                    doc.addImage(img, 'PNG', x, y, imgWidth, imgHeight);
                    callback();
                };
            };
            reader.readAsDataURL(file);
        } else {
            callback();
        }
    }

    const inspectoraFileExp = document.getElementById('inspectoraExp').files[0];
    const secGeneralFileExp = document.getElementById('sec-generalExp').files[0];
    const secDocenteFileExp = document.getElementById('sec-docenteExp').files[0];

    addSignatureImage(inspectoraFileExp, 20, 140, () => {
        addSignatureImage(secGeneralFileExp, 140, 140, () => {
            addSignatureImage(secDocenteFileExp, 80, 170, () => {
                doc.save(`${expediente.nombre}.pdf`);
            });
        });
    });
}
