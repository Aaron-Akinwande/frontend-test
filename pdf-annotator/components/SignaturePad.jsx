import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

const SignaturePad = ({ onSave }) => {
  const sigCanvas = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const saveSignature = () => {
    if (sigCanvas.current) {
      const dataUrl = sigCanvas.current.toDataURL();
      onSave(dataUrl);
      sigCanvas.current.clear();
    }
  };

  return (
    <div className="border p-3 mt-4 rounded-lg">
      <h3 className="text-lg font-bold">Draw Signature</h3>
      <SignatureCanvas
        ref={sigCanvas}
        penColor="black"
        canvasProps={{ width: 300, height: 100, className: "border" }}
        onBegin={() => setIsDrawing(true)}
        onEnd={() => setIsDrawing(false)}
      />
      <div className="mt-2">
        <button onClick={saveSignature} className="bg-blue-500 text-white px-3 py-1 rounded">Save</button>
        <button onClick={() => sigCanvas.current.clear()} className="ml-2 bg-gray-500 text-white px-3 py-1 rounded">
          Clear
        </button>
      </div>
    </div>
  );
};

export default SignaturePad;
