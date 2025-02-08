"use client";
import * as React from "react";
import { time_series_monthly } from "./apis.js";
import { Box, TextField, Typography } from "@mui/material";
import { PieChart, LineChart } from "@mui/x-charts";

const pieChartData = [
  { id: 0, value: 400, label: "Category A" },
  { id: 1, value: 300, label: "Category B" },
  { id: 2, value: 300, label: "Category C" },
  { id: 3, value: 200, label: "Category D" },
];

const lineChartData = [
  { month: "Jan", returnRate: 4.0 },
  { month: "Feb", returnRate: 3.9 },
  { month: "Mar", returnRate: 4.2 },
  { month: "Apr", returnRate: 4.5 },
  { month: "May", returnRate: 4.7 },
  { month: "Jun", returnRate: 5.0 },
  { month: "Jul", returnRate: 5.2 },
];

export default function Home() {
  return (
    <Box sx={{ display: "flex", height: "100vh", padding: 2 }}>
      {/* Left Panel */}
      <Box
        sx={{ width: "30%", display: "flex", flexDirection: "column", gap: 2 }}
      >
        {/* Search Box */}
        <TextField label="Search" variant="outlined" fullWidth />
        {/* Button*/}
        <button onClick={() => time_series_monthly("IBM")}>Button</button>

        {/* Pie Chart */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Distribution
          </Typography>
          <PieChart
            series={[
              {
                data: pieChartData,
                innerRadius: 30,
                outerRadius: 100,
                paddingAngle: 5,
                cornerRadius: 5,
              },
            ]}
            width={400}
            height={200}
          />
        </Box>
        {/* Line Chart */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Return Rate Over Time
          </Typography>
          <LineChart
            xAxis={[
              {
                dataKey: "month",
                scaleType: "point",
              },
            ]}
            series={[
              {
                dataKey: "returnRate",
                label: "Return Rate",
                color: "#8884d8",
              },
            ]}
            dataset={lineChartData}
            width={400}
            height={300}
          />
        </Box>
      </Box>
    </Box>
  );
}
