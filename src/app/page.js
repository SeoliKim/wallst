"use client";
import React, { useState } from "react";
import Import from "./pages/import"; // Importing the Import component
import Dash from "./pages/dash"; // Importing the Dash component
import SubmittedFile from "./components/submittedFile"; // Importing the SubmittedFile component
import { Button } from "@mui/material"; // Import Material UI Button

export default function Home() {
  const [isPageOneVisible, setPageOneVisible] = useState(true); 
  const [file, setFile] = useState(false); // State to track the selected file

  // Function to switch pages, only if a file is uploaded
  const switchPage = () => {
    if (file === true) {
      setPageOneVisible(false); // Hide the import page and show the dash page
    } else {
      alert("Please upload a file first!"); // Notify the user to upload a file first
    }
  };

  return (
    <div>
      {/* Page 1 */}
      {isPageOneVisible && (
        <div>
          {/* Pass the `file` state and `setFile` function to the Import component */}
          <Import file={file} setFile={setFile} />
          
          {/* Disable the submit button if no file is uploaded */}
          <Button
            variant="contained"
            color="primary"
            onClick={switchPage}
            disabled={!file}
            sx={{
              margin: 20,
              padding: "10px 20px",
              fontSize: "16px",
              fontWeight: "bold",
              textTransform: "none",
              '&:hover': {
                backgroundColor: file ? '#1565c0' : '#ccc', // Darker blue on hover if file is selected, gray if disabled
              },
            }}
          >
            Submit
          </Button>
        </div>
      )}

      {/* Page 2 */}
      {!isPageOneVisible && (
        <div>
          <Dash /> {/* Dash component will be shown once file is uploaded */}
        </div>
      )}
    </div>
  );
}
