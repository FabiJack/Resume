// Version completa y sin errores

function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const container = document.querySelector('.container');
    const marginTop = 5; // Margen superior en píxeles

    html2canvas(container, {
        backgroundColor: null, // Elimina el fondo del canvas
        scale: 2, // Mejora la calidad
        useCORS: true // Habilitar carga de imágenes externas
    }).then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg', 0.8); // Convertir a JPEG con calidad del 80%
        
        // Tamaño de la página PDF
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();
        
        // Tamaño de la imagen generada por html2canvas
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        
        // Escalar la imagen para ajustarla al ancho del PDF
        const scaledHeight = (imgHeight * pdfWidth) / imgWidth;

        if (scaledHeight <= pdfHeight) {
            // Si cabe en una sola página, agregar directamente
            doc.addImage(imgData, 'JPEG', 0, marginTop, pdfWidth, scaledHeight);
        } else {
            // Si el contenido excede una página, dividir en páginas
            let yPosition = marginTop;
            let remainingHeight = imgHeight;
            const pageHeight = pdfHeight - marginTop;

            while (remainingHeight > 0) {
                const portion = canvas.getContext('2d').getImageData(
                    0,
                    imgHeight - remainingHeight,
                    imgWidth,
                    Math.min(pageHeight * (imgWidth / pdfWidth), remainingHeight)
                );

                const portionCanvas = document.createElement('canvas');
                portionCanvas.width = imgWidth;
                portionCanvas.height = portion.height;

                portionCanvas.getContext('2d').putImageData(portion, 0, 0);

                const portionData = portionCanvas.toDataURL('image/jpeg', 0.8);
                doc.addImage(portionData, 'JPEG', 0, marginTop, pdfWidth, (portion.height * pdfWidth) / imgWidth);

                remainingHeight -= portion.height;
                if (remainingHeight > 0) {
                    doc.addPage();
                }
            }
        }

        doc.save('Fabian_Jaque_Villalobos.pdf');
    }).catch((error) => {
        console.error('Error generating PDF:', error);
    });
}

// Version Simple con linea abajo

// function exportToPDF() {
//     const { jsPDF } = window.jspdf;
//     const doc = new jsPDF();
//     const container = document.querySelector('.container');
//     const marginTop = 5; // Margen superior en píxeles

//     html2canvas(container, {
//         backgroundColor: null, // Elimina el fondo del canvas
//         scale: 2 // Mejora la resolución
//     }).then((canvas) => {
//         const imgData = canvas.toDataURL('image/jpeg', 0.8); // JPEG con calidad del 80%
//         const imgProps = doc.getImageProperties(imgData);
//         const pdfWidth = doc.internal.pageSize.getWidth();
//         const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//         doc.addImage(imgData, 'PNG', 0, marginTop, pdfWidth, pdfHeight);
//         doc.save('Fabian_Jaque_Villalobos.pdf');
//     });
// }

// Version sin linea abajo, pero imprime con zoom

// function exportToPDF() {
//     const { jsPDF } = window.jspdf;
//     const doc = new jsPDF();
//     const container = document.querySelector('.container');
//     const marginTop = 5; // Margen superior en píxeles

//     html2canvas(container, {
//         backgroundColor: null, // Elimina el fondo del canvas
//         scale: 1, // Mejora la resolución
//         useCORS: true // Permite cargar imágenes externas correctamente
//     }).then((canvas) => {
//         // Recorta los bordes innecesarios y asegura el tamaño correcto
//         const imgData = canvas.toDataURL('image/jpeg', 0.8); // JPEG con calidad del 80%
//         const pdfWidth = doc.internal.pageSize.getWidth();
//         const imgWidth = canvas.width / 2; // Ajusta escala
//         const imgHeight = canvas.height / 2; // Ajusta escala proporcional

//         const xOffset = 0; // Centrado horizontal
//         const yOffset = marginTop; // Centrado vertical con margen

//         doc.addImage(imgData, 'JPEG', xOffset, yOffset, imgWidth, imgHeight);
//         doc.save('Fabian_Jaque_Villalobos.pdf');
//     }).catch((error) => {
//         console.error('Error generating PDF:', error);
//     });
// }
