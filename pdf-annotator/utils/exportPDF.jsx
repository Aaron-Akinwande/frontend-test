import { PDFDocument, rgb } from "pdf-lib";
import { saveAs } from "file-saver";

export const exportAnnotatedPDF = async (file, annotations, signatures) => {
  if (!file) return;

  try {
    const existingPdfBytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();

    // Embed text annotations (highlights, underlines, comments)
    annotations.forEach(({ text, page, x, y, color }) => {
      const { height } = pages[page].getSize();
      pages[page].drawText(text, {
        x,
        y: height - y, // Adjust y-coordinates
        size: 12,
        color: rgb(...color),
      });
    });

    // Embed signature images
    for (let { image, page, x, y } of signatures) {
      const pngImage = await pdfDoc.embedPng(image);
      const { height } = pages[page].getSize();
      pages[page].drawImage(pngImage, {
        x,
        y: height - y - 50, // Adjust y-coordinates
        width: 100,
        height: 50,
      });
    }

    // Save and download the annotated PDF
    const pdfBytes = await pdfDoc.save();
    saveAs(new Blob([pdfBytes], { type: "application/pdf" }), "annotated-document.pdf");
  } catch (error) {
    console.error("Error exporting PDF:", error);
  }
};
