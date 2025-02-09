'use client'
import React, { useState } from 'react';
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

export default function AIButton() {
  // State for form inputs
  const [risk, setRisk] = useState('moderate');
  const [interval, setInterval] = useState('5');
  const [focus, setFocus] = useState('popular trend');

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
      const result = await gptAPI(risk, parsedInterval, focus);
      const dataArray = JSON.parse(result);
      setResponse(dataArray);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };


  return (
    <Box sx={{ padding: '20px', maxWidth: 400, margin: 0 }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
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
          label="Interval"
          type="number"
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
          sx={{ minWidth: '100px' }}
        />

        {/* Focus Select */}
        <FormControl sx={{ flexGrow: 1, minWidth: '200px' }}>
          <InputLabel id="focus-label">Focus</InputLabel>
          <Select
            labelId="focus-label"
            value={focus}
            label="Focus"
            onChange={(e) => setFocus(e.target.value)}
          >
            <MenuItem value="tech">Tech</MenuItem>
            <MenuItem value="international market">International Market</MenuItem>
            <MenuItem value="popular trend">Popular Trend</MenuItem>
          </Select>
        </FormControl>


      </Box>
      {/* Display Response */}
      {response && (
        <Box sx={{ marginTop: '20px' }}>
          <Typography variant="h6" sx={{ marginBottom: '10px' }}>
            <strong>Recommendation:</strong>
          </Typography>
          <PieChart
            series={[
              {
                data: response.map((item, index) => ({
                  id: index,
                  value: item.quantity * 100,
                  label: item.symbol,
                })),
              },
            ]}
            slotProps={{ legend: { hidden: true } }}
            width={400}
            height={200}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <Button
              variant="contained"
              color="secondary"
              // onClick={handleApply}
              sx={{ marginRight: '10px' }} // Add some margin between the buttons
            >
              Apply
            </Button>
            <Button
              variant="outlined"
              color="primary"
            // onClick={handleCancel}
            >
              Cancel
            </Button>
          </Box>
        </Box>
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