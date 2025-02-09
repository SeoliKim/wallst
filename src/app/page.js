"use client";
import React, { useState } from "react";
import Import from "./pages/import"; // Importing the Import component
import Dash from "./pages/dash"; // Importing the Dash component
import SubmittedFile from "./components/submittedFile"; // Importing the SubmittedFile component
import { Button } from "@mui/material"; // Import Material UI Button
import { ThemeProvider } from '@mui/material/styles';
import theme from "./theme";
import Image from "next/image";
import { Box } from "@mui/system";

export default function Home() {
  const [isPageOneVisible, setPageOneVisible] = useState(true);
  const [file, setFile] = useState(false); // State to track the selected file
  const [extractedData, setExtractedData] = useState([]);

  // Function to switch pages, only if a file is uploaded
  const switchPage = () => {
    if (file === true) {
      setPageOneVisible(false); // Hide the import page and show the dash page
    } else {
      alert("Please upload a file first!"); // Notify the user to upload a file first
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Image
        src="/wall.jpg"
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        quality={100}
        style={{
          zIndex: -1, // Ensure the image is behind the content
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "90vh",
          margin: 5,
          padding: 5,
          backgroundColor: "rgba(251, 234, 211, 0.98)"
        }}
      >
        <div style={{ width: '200px', height: '40px', position: 'relative' }}>
          <Image
            src="/logo.png"
            alt="logo"
            width={175}
            height={37}
          />
        </div>

        {/* Main Content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}>
          {/* Page 1 */}
          {isPageOneVisible && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                {/* Pass the `file` state and `setFile` function to the Import component */}
                <Import file={file} setFile={setFile} setExtractedData={setExtractedData}/>
                {file &&
                  <Button
                    variant="contained"
                    onClick={switchPage}
                    disabled={!file}
                    sx={{
                      marginTop: "30px",
                      padding: "10px 20px",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    Submit
                  </Button>
                }

              </Box>
            </Box>
          )}

          {/* Page 2 */}
          {!isPageOneVisible && (
            
              <Dash csv={extractedData}/> 
          )}
        </Box>


      </Box>
    </ThemeProvider>
  );
}
