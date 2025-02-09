"use client";
import * as React from "react";
import { useState } from "react";
import { time_series_monthly } from "./apis.js";
import { Box, TextField, Typography, Paper } from "@mui/material";
import ProfolioPie from "../components/profolioPie";
import ReturnChart from "../components/returnChart";
import AIButton from "../components/aiButton";

let pieChartData = [];
let lineChartData = [];

export default function Dash({ csv}) {
  console.log(csv);
  const [result, setResult] = useState("");

  const csv2 = [
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
        <button onClick={() => monthlyInfo(csv2)}>Button</button>
        <AIButton />
        
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
            <ProfolioPie data={pieChartData} />
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
          <Box sx={{ width: "100%", flexGrow: 1, marginTop: 2 }}>
            <ReturnChart data={lineChartData} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}