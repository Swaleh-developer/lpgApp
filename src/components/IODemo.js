import React, { useState } from 'react';

const IODemo = () => {
  const [filename, setFilename] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleWriteFile = async (e) => {
    if (e) e.preventDefault();
    try {
      const response = await fetch('/api/io/write', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename, content }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(`Error: ${data.error || response.statusText}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleReadFile = async (e) => {
    if (e) e.preventDefault();
    if (!filename) {
      setMessage('Please enter a filename to read.');
      return;
    }
    try {
      const response = await fetch(`/api/io/read/${filename}`);
      const responseText = await response.text(); // Read as text first
      if (response.ok) {
        setMessage(responseText); // Display raw content or JSON string
      } else {
        // Try to parse as JSON if error, otherwise use text
        try {
          const errorData = JSON.parse(responseText);
          setMessage(`Error: ${errorData.error || response.statusText}`);
        } catch (parseError) {
          setMessage(`Error: ${response.statusText}`);
        }
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="io-demo-container">
      <h2>I/O Demo</h2>
      <div>
        <label htmlFor="filename">Filename: </label>
        <input
          id="filename"
          type="text"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          placeholder="Enter filename"
        />
      </div>
      <div>
        <label htmlFor="content">Content: </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter file content"
          rows="5"
        />
      </div>
      <button onClick={handleWriteFile}>Write to File</button>
      <button onClick={handleReadFile}>Read from File</button>
      <h3>Response/File Content:</h3>
      <pre>{message}</pre>
    </div>
  );
};

export default IODemo;
