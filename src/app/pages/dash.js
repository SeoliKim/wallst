"use client";
import * as React from "react";
import { useState } from "react";
import { time_series_monthly } from "./apis.js";
import { Box, TextField, Typography, Paper } from "@mui/material";
import ProfolioPie from "../components/profolioPie";
import ReturnChart from "../components/returnChart";

const pieChartData = [{ id: 0, value: 0, label: "IBM" }];

const lineChartData = [];

export default function Home() {
  const [result, setResult] = useState("");

  const monthlyInfo = async (company) => {
    const response = await time_series_monthly("IBM"); // Call the function
    //console.log(response);
    setResult(response["Monthly Time Series"]); // Store the result in state
    console.log(result);
    populate(result);
  };

  const populate = (result) => {
    console.log(result);
    for (const dateSt in result) {
      const closeValue = result[dateSt]["4. close"];
      console.log(dateSt);
      console.log(closeValue);
      lineChartData.push({ date: dateSt, returnRate: parseFloat(closeValue) });
      //change 100 to actual value
      pieChartData[0] = { id: 0, value: closeValue * 100, label: "IBM" };
    }
  };

  return (
    
    <Box sx={{ display: "flex", height: "100vh", padding: 2 }}>
      {/* Left Panel */}
      <Box
        sx={{ width: "30%", display: "flex", flexDirection: "column", gap: 2 }}
      >
        {/* Search Box */}
        <TextField label="Search" variant="outlined" fullWidth />

        <button onClick={() => monthlyInfo("IBM")}>Button</button>

        {}

        {/* Pie Chart */}
        <Paper elevation={3} sx={{ padding: 2 }}>
          <ProfolioPie data={pieChartData} />
        </Paper>
      </Box>

      {/* Right Panel */}
      <Box
        sx={{ width: "70%", display: "flex", flexDirection: "column", gap: 2 }}
      >
        {/* Return Chart */}
        <Paper elevation={3} sx={{ padding: 2 }}>
          <ReturnChart data={lineChartData} />
        </Paper>

        {/* Risk and Rating Section */}
        <Paper elevation={3} sx={{ padding: 2, flexGrow: 1 }}>
          <Typography variant="h6" gutterBottom>
            Risk and Rating
          </Typography>
          <Typography variant="body1">Risk Level: Medium</Typography>
          <Typography variant="body1">Rating: 4.5/5</Typography>
        </Paper>
      </Box>
    </Box>
  );
}
