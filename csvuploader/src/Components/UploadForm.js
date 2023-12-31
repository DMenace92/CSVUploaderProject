import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

const UploadForm = () => {
  const [file, setFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('csv', file);

    try {
      await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File uploaded successfully.');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.csv',
  });

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        <p>Drag &amp; drop a CSV file here, or click to select one</p>
      </div>
      <button onClick={handleSubmit}>Upload</button>
    </div>
  );
};

const dropzoneStyles = {
  border: '2px dashed #ccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default UploadForm;
