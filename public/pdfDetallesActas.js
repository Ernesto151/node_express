function exportarPDFDetalles(acta) {
    var doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Informe sobre el control de actas realizada por la Secretaría General a la", 10, 20);
    
    // Control de posición y margen
    let y = 30; // Posición vertical inicial
    const lineHeight = 10; // Altura entre líneas
    const pageHeight = doc.internal.pageSize.height; // Altura de la página
    const marginBottom = 20; // Margen inferior
    
    // Función para verificar si se necesita una nueva página
    function checkPageSpace(additionalHeight = lineHeight) {
        if (y + additionalHeight > pageHeight - marginBottom) {
            doc.addPage(); 
            y = 20; // Reiniciar la posición vertical en la nueva página
        }
    }
    
    // Añadir cada campo al PDF con verificación de espacio
    doc.setFontSize(12);
    doc.text(`Facultad: ${acta.facultad}`, 10, y);
    y += lineHeight;
    checkPageSpace();

    doc.text(`Fecha: ${acta.fecha}`, 10, y);
    y += lineHeight;
    checkPageSpace();

    doc.text(`Hora: ${acta.hora}`, 10, y);
    y += lineHeight;
    checkPageSpace();

    doc.text(`Etapa que se controla: ${acta.etapa}`, 10, y);
    y += lineHeight;
    checkPageSpace();

    doc.text(`Objetivo: ${acta.objetivo}`, 10, y);
    y += lineHeight;
    checkPageSpace();

    doc.text("Descripción:", 10, y);
    y += lineHeight;
    checkPageSpace();

    // Dividir texto en líneas si es necesario
    let descripcionLineas = doc.splitTextToSize(acta.descripcion, 180); // Ajusta el ancho de línea
    descripcionLineas.forEach(linea => {
        checkPageSpace();
        doc.text(linea, 10, y);
        y += lineHeight;
    });

    doc.text("Principales problemas detectados:", 10, y);
    y += lineHeight;
    checkPageSpace();

    let problemasLineas = doc.splitTextToSize(acta.problemas, 180); // Ajusta el ancho de línea
    problemasLineas.forEach(linea => {
        checkPageSpace();
        doc.text(linea, 10, y);
        y += lineHeight;
    });

    doc.text(`Inspector: ${acta.inspector}`, 10, y);
    y += lineHeight;
    checkPageSpace();

    doc.text(`Cargo: ${acta.cargo}`, 10, y);
    y += lineHeight;
    checkPageSpace();

    // doc.text(`Nombre del documento: ${acta.nombre}`, 10, y);
    // y += lineHeight;
    // checkPageSpace();

    // Guardar el PDF
    doc.save(`${acta.nombre}.pdf`);
}
