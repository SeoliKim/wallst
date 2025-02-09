"use client";
import * as React from "react";
import { useState } from "react";
import { time_series_monthly } from "./apis.js";
import { Box, TextField, Typography, Paper } from "@mui/material";
import ProfolioPie from "../components/profolioPie";
import ReturnChart from "../components/returnChart";

let pieChartData = [];
let lineChartData = [];

export default function Home() {
  const [result, setResult] = useState("");

  const csv = [
    { symbol: "SPDR", amount: 0.5 },
    { symbol: "VWO", amount: 0.2 },
    { symbol: "10 year bonds", amount: 0.2 },
    { symbol: "NVDA", amount: 0.05 },
    { symbol: "AAPL", amount: 0.05 },
    { symbol: "IBM", amount: 0.05 },
  ];

  const monthlyInfo = async (company) => {
    pieChartData = [];
    lineChartData = [];

    for (var i = 0; i < company.length; i++) {
      pieChartData.push({ id: i, value: 0, label: "" });
    }

    for (var i = 0; i < company.length; i++) {
      const response = await time_series_monthly(company[i].symbol); // Call the function
      setResult(response["Monthly Time Series"]); // Store the result in state
      populate(result, company[i].symbol, company[i].amount, i);
    }
  };

  const populate = (result, symbol, amount, i) => {
    var j = 0;
    for (const dateSt in result) {
      const closeValue = result[dateSt]["4. close"];

      if (j == 0) {
        pieChartData[i].value = parseFloat(closeValue * amount);
        pieChartData[i].label = symbol;
      }

      // if the dates have not yet been set, we first set dates
      if (i == 0) {
        lineChartData.push({
          date: dateSt,
          returnRate: parseFloat(closeValue * amount),
        });
      } else {
        lineChartData[j].returnRate += parseFloat(closeValue * amount);
      }

      j++;
    }
  };

  return (
    
    <Box sx={{ display: "flex", height: "100vh", padding: 2 }}>
      {/* Left Panel */}
      <Box
        sx={{ width: "50%", display: "flex", flexDirection: "column", gap: 2 }}
      >
        {/* Search Box */}
        <TextField label="Search" variant="outlined" fullWidth />

        <AIButton />
        <button onClick={() => monthlyInfo(csv)}>Button</button>

        {/* Pie Chart */}
        <Box sx={{ padding: 2, flexGrow: 1 }}>
          <ProfolioPie data={pieChartData} />
        </Box>
      </Box>
      {/* Right Panel */}
      <Box
        sx={{ width: "50%", display: "flex", flexDirection: "column", gap: 2 }}
      >
        {/* Return Chart */}
        <Box sx={{ padding: 2 }}>
          <ReturnChart data={lineChartData} />
        </Box>

        {/* Risk and Rating Section */}
        <Box sx={{ padding: 2, flexGrow: 1 }}>
          <Typography variant="h6" gutterBottom>
            Risk and Rating
          </Typography>
          <Typography variant="body1">Risk Level: Medium</Typography>
          <Typography variant="body1">Rating: 4.5/5</Typography>
        </Box>
      </Box>
    </Box>
  );
}
