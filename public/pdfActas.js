function pdfexport() {
    // Labels
    var encabezadoAct = document.querySelector('.encabezadoAct').innerText,
        lfacultadAct = document.getElementById('lfacultadAct').innerText,
        lfechaAct = document.getElementById('lfechaAct').innerText,
        lhoraAct = document.getElementById('lhoraAct').innerText,
        letapaAct = document.getElementById('letapaAct').innerText,
        lobjetivoAct = document.getElementById('lobjetivoAct').innerText,
        ldescripcionAct = document.getElementById('ldescripcionAct').innerText,
        lproblemasAct = document.getElementById('lproblemasAct').innerText,
        linspectorAct = document.getElementById('linspectorAct').innerText;
        lcargAct = document.getElementById('lcargAct').innerText;
        lnombreDoc = document.getElementById('lnombredoc').innerText;
    
    // Inputs
    var facultadAct = document.getElementById('facultadAct').value,
        fechaAct = document.getElementById('fechaAct').value,
        horaAct = document.getElementById('horaAct').value,
        etapaAct = document.getElementById('etapaAct').value,
        objetivoAct = document.getElementById('objetivoAct').value,
        descripcionAct = document.getElementById('descripcionAct').value,
        problemasAct = document.getElementById('problemasAct').value,
        inspectorAct = document.getElementById('inspectorAct').value;
        cargAct = document.getElementById('cargoAct').value;
        nombreDoc = document.getElementById('nombredoc').value;

    // Crear documento jsPDF
    var doc = new jsPDF();

    // Posición inicial
    var cursorY = 35;
    const margin = 10;
    const pageHeight = doc.internal.pageSize.height; // Altura de la página

    // Función para verificar y agregar nueva página si es necesario
    function checkPageSpace(increment) {
        if (cursorY + increment > pageHeight - margin) {
            doc.addPage(); // Añadir nueva página
            cursorY = margin; // Reiniciar cursor al inicio de la nueva página
        }
    }

    // Encabezado
    doc.setFontSize(16);
    const headerLines = doc.splitTextToSize(encabezadoAct, doc.internal.pageSize.width - 2 * margin);
    headerLines.forEach(line => {
        checkPageSpace(10); // Verificar espacio
        doc.text(line, margin, cursorY);
        cursorY += 10;
    });

    // Facultades
    checkPageSpace(10);
    doc.text(lfacultadAct + ' ' + facultadAct, margin, cursorY);
    cursorY += 10;

    // Fecha y Hora
    checkPageSpace(10);
    doc.text(lfechaAct + ' ' + fechaAct, margin, cursorY);
    doc.text(lhoraAct + ' ' + horaAct, 80, cursorY); // Posiciona la hora a la derecha
    cursorY += 10;

    // Etapa
    checkPageSpace(10);
    doc.text(letapaAct + ' ' + etapaAct, margin, cursorY);
    cursorY += 10;

    // Objetivo
    checkPageSpace(10);
    doc.text(lobjetivoAct + ' ' + objetivoAct, margin, cursorY);
    cursorY += 10;

    // Descripción
    checkPageSpace(10);
    doc.text(ldescripcionAct, margin, cursorY);
    cursorY += 10;
    const descripcionLines = doc.splitTextToSize(descripcionAct, doc.internal.pageSize.width - 2 * margin);
    descripcionLines.forEach(line => {
        checkPageSpace(10);
        doc.text(line, margin, cursorY);
        cursorY += 10;
    });

    // Problemas
    checkPageSpace(10);
    doc.text(lproblemasAct, margin, cursorY);
    cursorY += 10;
    const problemasLines = doc.splitTextToSize(problemasAct, doc.internal.pageSize.width - 2 * margin);
    problemasLines.forEach(line => {
        checkPageSpace(10);
        doc.text(line, margin, cursorY);
        cursorY += 10;
    });

    // Inspector
    checkPageSpace(10);
    doc.text(linspectorAct + ' ' + inspectorAct, margin, cursorY);
    cursorY += 10;

    // Cargo
    checkPageSpace(10);
    doc.text(lcargAct + ' ' + cargAct, margin, cursorY);
    cursorY += 10;

      // Cargo
    // checkPageSpace(10);
    // doc.text(lnombreDoc + ' ' + nombreDoc, margin, cursorY);
    // cursorY += 10;

    // Guardar PDF
    doc.save(nombreDoc+'.pdf');
}
