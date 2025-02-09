"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { time_series_monthly } from "./apis.js";
import { Box, TextField, Typography, Paper } from "@mui/material";
import ProfolioPie from "../components/profolioPie";
import ReturnChart from "../components/returnChart";
import AIButton from "../components/aiButton";


export default function Dash({ csv, setCSV }) {
  console.log("csv", csv);
  const [result, setResult] = useState(null);

  const monthlyInfo = async () => {
    const response = await time_series_monthly(); // Call the function
    console.log("response", response);
    setResult(response["Monthly Time Series"]); // Store the result in state
    console.log("result", result);
  };

  useEffect(() => {
    console.log("useeffect");
    monthlyInfo();
    console.log("useEffect", csv);
  }, [csv, setCSV]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
      }}
    >
      {/* AI Button Row */}
      <Box
        sx={{
          marginTop: 2,
          width: "100%",
          height: "100px", // Set a fixed height for the AI button row
          display: "flex",
        }}
      >
        <AIButton csv={csv} setCSV={setCSV}/>

      </Box>

      {/* Panels Row */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexGrow: 1, // This will make the panels grow to fill the remaining space
          width: "100%",
        }}
      >
        {/* Left Panel */}
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            padding: 2,
          }}
        >

          {/* Pie Chart */}
          <Box sx={{ flexGrow: 1 }}>
            <ProfolioPie csv={csv}/>
          </Box>

          {/* Search Box
          <TextField label="Search" variant="outlined" fullWidth /> */}
        </Box>

        {/* Right Panel */}
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            padding: 2,
            justifyContent: "center", // Center vertically
            alignItems: "center", // Center horizontally
            marginLeft: 5, // Add some space between the
          }}
        >
          {/* Return Chart */}
          {result && (
            <Box sx={{ width: "100%", flexGrow: 1, marginTop: 2 }}>
            <ReturnChart inputData={result} />
          </Box>
          )}
          
        </Box>
      </Box>
    </Box>
  );
}