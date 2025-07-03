
declare const html2canvas: any;
declare const jspdf: any;

const getCvHtml = (element: HTMLElement): string => {
    const styles = Array.from(document.styleSheets)
        .map(styleSheet => {
            try {
                return Array.from(styleSheet.cssRules)
                    .map(rule => rule.cssText)
                    .join('');
            } catch (e) {
                console.warn("Could not read stylesheet:", e);
                return '';
            }
        })
        .join('');

    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CV de ${element.querySelector('.candidate-name')?.textContent || 'Candidato'}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
        <style>
          body { font-family: 'Inter', sans-serif; background-color: #f3f4f6; }
          .cv-outer-wrapper { padding: 2rem; }
          ${styles}
        </style>
    </head>
    <body>
      <div class="cv-outer-wrapper">
        ${element.outerHTML}
      </div>
    </body>
    </html>
    `;
}

export const downloadAsHtml = (element: HTMLElement, name: string) => {
    const htmlContent = getCvHtml(element);
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CV_${name.replace(/\s/g, '_')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

export const downloadAsPdf = (element: HTMLElement, name: string) => {
    if (typeof html2canvas === 'undefined' || typeof jspdf === 'undefined') {
        alert('Las librerías para generar PDF no están cargadas. Por favor, refresca la página.');
        return;
    }
    
    // Temporarily increase resolution for better quality PDF
    const scale = 2;
    html2canvas(element, {
      scale: scale,
      useCORS: true,
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    }).then((canvas: HTMLCanvasElement) => {
        const { jsPDF } = jspdf;
        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4'
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / canvasHeight;

        let newCanvasWidth = pdfWidth;
        let newCanvasHeight = newCanvasWidth / ratio;
        
        if (newCanvasHeight > pdfHeight) {
            newCanvasHeight = pdfHeight;
            newCanvasWidth = newCanvasHeight * ratio;
        }

        const xOffset = (pdfWidth - newCanvasWidth) / 2;
        const yOffset = 0; // Start at the top

        // You need to define the variable imgData by converting the canvas to a data URL before calling pdf.addImage.
        const imgData = canvas.toDataURL('image/png');

        pdf.addImage(imgData, 'PNG', xOffset, yOffset, newCanvasWidth, newCanvasHeight);
        pdf.save(`CV_${name.replace(/\s/g, '_')}.pdf`);
    }).catch((error: any) => {
        console.error("Error generando el PDF:", error);
        alert("Hubo un error al generar el PDF. Revisa la consola para más detalles.");
    });
};