import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";

const PDFUploader = ({ onFileUpload }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "application/pdf",
    onDrop: (acceptedFiles) => onFileUpload(acceptedFiles[0]),
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed p-5 rounded-lg text-center cursor-pointer hover:bg-gray-100 transition"
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
    >
      <input {...getInputProps()} />
      <p className="text-gray-600 outline-dashed bg-blue-400">Drag & drop a PDF here, or click to select one</p>
    </div>
  );
};

export default PDFUploader;
