import { useState } from "react";
import PDFUploader from "../components/PDFUploader";
import PDFViewer from "../components/PDFViewer";
import SignaturePad from "../components/SignaturePad";
import { exportAnnotatedPDF } from "../utils/exportPDF";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function Home() {
  const [file, setFile] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [signatures, setSignatures] = useState([]);

  return (
    <div className="p-5 w-full max-w-4xl mx-auto outline-dashed" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="text-2xl font-bold text-center bg-blue-500">PDF Annotator</h1>
      <PDFUploader onFileUpload={(f) => { setFile(f); toast.success("File uploaded!"); }} />
      {file && <PDFViewer file={file} annotations={annotations} setAnnotations={setAnnotations} />}
      <SignaturePad onSave={(sig) => setSignatures([...signatures, { image: sig, page: 0, x: 50, y: 100 }])} />

      {file && (
        <button
          onClick={() => exportAnnotatedPDF(file, annotations, signatures)}
          className="mt-4 p-2 bg-green-500 text-white rounded-lg"
        >
          Export PDF
        </button>
      )}
    </div>
  );
}
