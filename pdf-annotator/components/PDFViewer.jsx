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
    <div className="border p-3 rounded-lg">
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
      {file && (
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
          <Viewer fileUrl={URL.createObjectURL(file)} plugins={[highlightPluginInstance]} />
        </Worker>
      )}
      {/* <div className="mt-5">
        <h3 className="text-lg font-bold">Draw Signature</h3>
        <SignatureCanvas
          ref={sigCanvas}
          penColor="black"
          canvasProps={{ className: "border w-full h-32" }}
        />
        <button onClick={clearSignature} className="mt-2 bg-gray-500 text-white p-2 rounded">
          Clear Signature
        </button>
      </div> */}
      <div className="mt-5">
        <h3 className="text-lg font-bold">Annotations</h3>
        <ul>
          {annotations.map((a, index) => (
            <li key={index} className="bg-gray-100 p-2 my-2 rounded">
              <strong>{a.text}</strong>: {a.comment}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PDFViewer;
