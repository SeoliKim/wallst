import * as React from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';
import ProfolioPie from '../components/profolioPie';
import ReturnChart from '../components/returnChart';
import AIButton from '../components/aiButton';

const pieChartData = [
  { id: 0, value: 400, label: 'Category A' },
  { id: 1, value: 300, label: 'Category B' },
  { id: 2, value: 300, label: 'Category C' },
  { id: 3, value: 200, label: 'Category D' },
];

const lineChartData = [
  { month: 'Jan', returnRate: 4.0 },
  { month: 'Feb', returnRate: 3.9 },
  { month: 'Mar', returnRate: 4.2 },
  { month: 'Apr', returnRate: 4.5 },
  { month: 'May', returnRate: 4.7 },
  { month: 'Jun', returnRate: 5.0 },
  { month: 'Jul', returnRate: 5.2 },
];



export default function Home() {
  return (
    <Box sx={{ display: 'flex', height: '100vh', padding: 2, gap: 2 }}>
      {/* Left Panel */}
      <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', gap: 2 }}>

        {/* Search Box */}
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
        />
        <AIButton/>
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