import { useState, useRef } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { highlightPlugin } from "@react-pdf-viewer/highlight";
import SignatureCanvas from "react-signature-canvas";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/highlight/lib/styles/index.css";

const PDFViewer = ({ file }) => {
  const [annotations, setAnnotations] = useState([]);
  const [selectedColor, setSelectedColor] = useState("yellow");
  const sigCanvas = useRef(null);

  const highlightPluginInstance = highlightPlugin({
    renderHighlightTarget: (props) => (
      <button
        className="bg-yellow-500 text-white p-1 rounded"
        onClick={() =>
          props.highlightText({
            color: selectedColor,
          })
        }
      >
        Highlight
      </button>
    ),
  });

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection.toString().trim() !== "") {
      const comment = prompt("Enter your comment:");
      if (comment) {
        setAnnotations((prev) => [
          ...prev,
          { text: selection.toString(), comment, color: selectedColor },
        ]);
      }
    }
  };

  const clearSignature = () => sigCanvas.current.clear();

  return (
    <div className="relative w-full h-screen">
      {/* Fixed Toolbar */}
      <div className="fixed top-0 left-0 w-full bg-gray-900 text-white flex gap-4 p-3 shadow-md z-50">
        <button className="bg-yellow-500 p-2 rounded" onClick={() => setSelectedColor("yellow")}>
          Highlight
        </button>
        <button className="bg-red-500 p-2 rounded" onClick={() => setSelectedColor("red")}>
          Underline
        </button>
        <button className="bg-blue-500 p-2 rounded" onClick={handleTextSelection}>
          Add Comment
        </button>
      </div>

      {/* PDF Viewer */}
      <div className="mt-16 p-4"> {/* Adds spacing below the toolbar */}
        {file && (
          <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
            <Viewer fileUrl={URL.createObjectURL(file)} plugins={[highlightPluginInstance]} />
          </Worker>
        )}
      </div>
    </div>
  );
};

export default PDFViewer;
