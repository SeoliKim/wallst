import React from 'react';

export default function SubmittedFile({ file }) {
  return (
    <div>
      <h2>File State:</h2>
      <p>{file ? "File Selected" : "No File Selected"}</p>
    </div>
  );
}
