"use client";
import React, { useState } from "react";
import Papa from "papaparse";
import { Button, Typography, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Box } from "@mui/material";
import CSVDownload from "../components/template";

const CSVImport = () => {
  const [csvData, setCsvData] = useState(null);
  const [extractedData, setExtractedData] = useState([]); // This will store the filtered data (e.g., name and city)
  // Mapping possible variations of column names to a standard name
  const columnMapping = {
    "Qty (Quantity)": "Quantity",
    "Quantity": "Quantity", // Ensure we account for both exact matches and variations
    "Symbol": "Symbol",
    // Add more mappings if necessary
  };

  // Handle file input change
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      parseCSV(file);
    }
  };

  // Function to parse the CSV file
  const parseCSV = (file) => {
    Papa.parse(file, {
      complete: (result) => {
        setCsvData(result.data); // Store parsed CSV data in state
        extractSpecificData(result.data);
      },
      header: true, // If your CSV file has a header row
    });
  };

  const extractSpecificData = (data) => {
    const newSpecificData = data.map((row) => {
        // Normalize column names based on mapping
        const normalizedRow = {};
  
        // Iterate over the row and apply the mapping to normalize headers
        Object.keys(row).forEach((key) => {
          const normalizedKey = columnMapping[key] || key; // If no mapping found, use the key as it is
          normalizedRow[normalizedKey] = row[key]; // Assign the value under the normalized column name
        });
  
        if (normalizedRow.Symbol && normalizedRow.Quantity) {
            return {
            symbol: normalizedRow.Symbol, // Extract the "Symbol" column
            amount: normalizedRow.Quantity, // Extract the "Quantity" column (normalized)
            };
        }
      });
    
    setExtractedData(newSpecificData); // Store the specific data in state

    console.log(newSpecificData);
  };

  // Render the CSV data in a table format
  const renderTable = () => {
    if (!csvData || csvData.length === 0) return null;

    const headers = Object.keys(csvData[0]);

    return (
      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header} sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {csvData.map((row, index) => (
              <TableRow key={index} sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}>
                {headers.map((header) => (
                  <TableCell key={header} align="center">
                    {row[header]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 5 }}>
      <Paper sx={{ padding: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Typography variant="h5" gutterBottom>
            Import Your Investment Portfolio as a CSV:
            </Typography>
            <CSVDownload/>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Button
            variant="contained"
            component="label"
            sx={{
              backgroundColor: "#1976d2",
              color: 'white',
              padding: "10px 20px",
              '&:hover': { backgroundColor: '#1565c0' },
            }}
          >
            Choose CSV File
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              hidden
            />
          </Button>
          <Typography variant="body2" sx={{ marginTop: 2, color: "#888" }}>
            Upload a CSV file containing your portfolio data. The file should have a header row.
          </Typography>
        </Box>

        <div style={{ marginTop: '20px' }}>
          {renderTable()}
        </div>

      </Paper>
    </Container>
  );
};

export default CSVImport;