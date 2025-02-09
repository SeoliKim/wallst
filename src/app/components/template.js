import React from 'react';
import { Button } from '@mui/material';
import Papa from 'papaparse'; // We can use PapaParse for CSV generation or just manual creation

const CSVDownload = () => {
  // Template data (header and example rows)
  const csvTemplateData = [
    ["Symbol", "Quantity"]
  ];

  // Function to download the CSV template
  const downloadCSVTemplate = () => {
    // Use PapaParse to convert data to CSV format
    const csv = Papa.unparse(csvTemplateData); // converts 2D array to CSV string

    // Create a Blob from the CSV string
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    // Create a link element to trigger the download
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'portfolio_template.csv'); // Set the download file name
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={downloadCSVTemplate}>
        Download CSV Template
      </Button>
    </div>
  );
};

export default CSVDownload;