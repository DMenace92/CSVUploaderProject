import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('csvfile', selectedFile);
//http://localhost:3000/
    try {
      await axios.post('http://localhost:9000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  return (
    <div className="App">
      <div className="ProjectTitle">
      CSV Uploader
      </div>

           <input type="file" accept=".csv" onChange={handleFileUpload} />
      <button onClick={handleUpload}>Upload</button>

    </div>
  );
}

export default App;
