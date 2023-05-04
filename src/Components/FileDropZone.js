import React, { useState } from "react";

const UploadComponent = () => {
  const [files, setFiles] = useState([]);
  const [custodian, setCustodian] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = (event) => {
    event.preventDefault();
    const newFiles = [...event.target.files];
    setFiles(newFiles);
    setCustodian("");
    setProgress(0);
    setUploading(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const newFiles = [...event.dataTransfer.files];
    setFiles(newFiles);
    setCustodian("");
    setProgress(0);
    setUploading(false);
  };

  const handleCustodianChange = (event) => {
    setCustodian(event.target.value);
  };

  const handleUploadClick = () => {
    setUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress = Math.min(progress + Math.random() * 0.1, 1);
      setProgress(progress);
      if (progress === 1) {
        clearInterval(interval);
        setUploading(false);
        setFiles([]);
        setCustodian("");
      }
    }, 1000);
  };

  const fileNames = files.map((file) => file.name).join(", ");

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(event) => event.preventDefault()}
      style={{
        width: "100%",
        height: "300px",
        border: "2px dashed black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {uploading && <progress value={progress} max="1" />}
      {!files.length && !uploading && (
        <>
          <input type="file" multiple onChange={handleFileUpload} />
          <p>or</p>
          <p>Drag and drop files here</p>
        </>
      )}
      {!!files.length && !uploading && (
        <>
          <p>Selected files: {fileNames}</p>
          <input
            type="text"
            value={custodian}
            onChange={handleCustodianChange}
            placeholder="Enter custodian name"
          />
          <button onClick={handleUploadClick}>Upload</button>
        </>
      )}
    </div>
  );
};

export default UploadComponent;
