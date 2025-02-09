"use client";
import * as React from "react";
import { useState } from "react";
import { time_series_monthly } from "./apis.js";
import { Box, TextField, Typography, Paper } from "@mui/material";
import ProfolioPie from "../components/profolioPie";
import ReturnChart from "../components/returnChart";
import AIButton from "../components/aiButton";

const pieChartData = [
  { "symbol": "IBM", "price": 180 },
  { "symbol": "AAPL", "price": 150 },
  { "symbol": "GOOGL", "price": 2800 },
  { "symbol": "AMZN", "price": 3400 },
  { "symbol": "TSLA", "price": 700 },
  { "symbol": "MSFT", "price": 300 },
  { "symbol": "FB", "price": 350 },
  { "symbol": "NVDA", "price": 200 },
  { "symbol": "NFLX", "price": 600 },
  { "symbol": "INTC", "price": 50 }
];

const lineChartData = [];

export default function Dash() {
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
      <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', gap: 2 }}>
      
        <AIButton />
        {/* Pie Chart */}
        <Box sx={{ padding: 2, flexGrow: 1 }}>
          <ProfolioPie data={pieChartData} />
        </Box>
      </Box>
      {/* Right Panel */}
      <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Return Chart */}
        <Box sx={{ padding: 2 }}>
          <ReturnChart data={lineChartData} />
        </Box>

        {/* Risk and Rating Section */}
        <Box sx={{ padding: 2, flexGrow: 1 }}>
          <Typography variant="h6" gutterBottom>
            Risk and Rating
          </Typography>
          <Typography variant="body1">
            Risk Level: Medium
          </Typography>
          <Typography variant="body1">
            Rating: 4.5/5
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}