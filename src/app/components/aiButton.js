'use client'
import React, { useState} from 'react';
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Typography,
} from '@mui/material';
import { PieChart } from '@mui/x-charts';
import { gptAPI } from '../utils/gptAPI';
import Paper from '@mui/material/Paper';

const pallete = ['#f2ce8b', '#e5c697', '#d9bea2', '#cbb7ac', '#bcb0b7', '#aca8c1', '#9ba1cb', '#879ad4', '#6f94de']

export default function AIButton({ csv, setCSV }) {
  // State for form inputs
  const [risk, setRisk] = useState('moderate');
  const [interval, setInterval] = useState('5');
  const [focus, setFocus] = useState('Popular trend');

  // State for API call
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);


  // Function to handle the button click
  const handleClick = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      // Prepare the data to send to the API
      const parsedInterval = parseInt(interval, 10);

      // Call the API (replace `gptAPI` with your actual API call)
      const result = await gptAPI(csv, risk, parsedInterval, focus);
      console.log(result);

      // Find the index of the first '[' and the last ']'
      const startIndex = result.indexOf('[');
      const endIndex = result.lastIndexOf(']');

      // Extract the substring between the first '[' and the last ']'
      const cleanedJson = result.slice(startIndex, endIndex + 1);

      console.log("cleanedJson", cleanedJson);

      const dataArray = JSON.parse(cleanedJson);
      setResponse(dataArray);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    // Update the CSV data with the new recommendation
    setCSV(response);
    setResponse(null);
  }

  const handleCancel = () => {
    setResponse(null);
  };


  return (
    <Box sx={{ padding: '20px', maxWidth: 800, margin: 0 }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>

        {/* Risk Select */}
        <FormControl sx={{ minWidth: '120px' }}>
          <InputLabel id="risk-label">Risk</InputLabel>
          <Select
            labelId="risk-label"
            value={risk}
            label="Risk"
            onChange={(e) => setRisk(e.target.value)}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="moderate">Moderate</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>

        {/* Interval Input */}
        <TextField
          label="Hold Time (years)"
          type="number"
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
          sx={{ minWidth: '130px' }}
        />

        {/* Focus Select */}
        <FormControl sx={{ flexGrow: 1, minWidth: '400px' }}>
          <InputLabel id="focus-label">Focus</InputLabel>
          <Select
            labelId="focus-label"
            value={focus}
            label="Focus"
            onChange={(e) => setFocus(e.target.value)}
          >
            <MenuItem value="tech">AI/Tech</MenuItem>
            <MenuItem value="international market">International Market</MenuItem>
            <MenuItem value="energy">Energy</MenuItem>
            <MenuItem value="High risk, high profit">High risk, high profit</MenuItem>
            <MenuItem value="Popular trend">Popular trend</MenuItem>
            <MenuItem value="">Nothing in Particular</MenuItem>
          </Select>
        </FormControl>

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleClick}
          disabled={loading}
          sx={{ height: '56px', minWidth: '120px', flexShrink: 0 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Get Recommendation'}
        </Button>

      </Box>
      {/* Display Response */}
      {response && (
        <Paper
          sx={{
            marginLeft: '670px',
            marginTop: '20px',
            padding: '20px',
            zIndex: '1000',
            position: 'relative',
            backgroundColor: "rgba(251, 234, 211)",
            borderRadius: '10px',
            border: '1px solid black',
            width: '400px',
          }}>
          <Typography variant="h6" sx={{ marginBottom: '10px' }}>
            <strong>Recommendation:</strong>
          </Typography>
          <PieChart
            series={[
              {
                data: response.map((item, index) => ({
                  id: index,
                  value: item.amount * 100,
                  label: item.symbol,
                })),
                valueFormatter: (v) => {
                  return `has ${v.value}% `;
                },
              },
            ]}
            slotProps={{ legend: { hidden: true } }}
            width={400}
            height={200}
            colors={pallete}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleApply}
              sx={{ marginRight: '10px' }} // Add some margin between the buttons
            >
              Apply
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Box>
        </Paper>
      )}

      {/* Display Error */}
      {error && (
        <Box sx={{ marginTop: '20px' }}>
          <Typography variant="body1" color="error">
            <strong>Error:</strong> {error}
          </Typography>
        </Box>
      )}
    </Box>
  );
}