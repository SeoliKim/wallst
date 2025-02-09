"use client";
import { ScatterChart } from "@mui/x-charts/ScatterChart";
import { Box, Slider, Typography } from "@mui/material";
import { useState, useMemo } from "react";

export default function ReturnChart({ inputData }) {
  const data = Object.keys(inputData).map(date => ({
    date: date,
    returnRate: parseFloat(inputData[date]["4. close"]) // Use the closing price as the return rate
  }));

  // Parse date strings into Date objects and find the earliest and latest dates
  const { parsedData, earliestDate, latestDate } = useMemo(() => {
    if (!data || data.length === 0) {
      return {
        parsedData: [],
        earliestDate: new Date(),
        latestDate: new Date(),
      };
    }

    // Parse dates and find min/max
    const parsed = data.map((item) => ({
      x: new Date(item.date).getTime(), // Convert date string to timestamp
      y: item.returnRate,
    }));

    const dates = parsed.map((item) => item.x);
    const earliest = Math.min(...dates);
    const latest = Math.max(...dates);

    return {
      parsedData: parsed,
      earliestDate: earliest,
      latestDate: latest,
    };
  }, [data]);

  // Define start and end dates dynamically
  const startDate = earliestDate;
  const endDate = latestDate;
  const minDistance = 30 * 24 * 60 * 60 * 1000; // Minimum distance of 30 days in milliseconds

  // State for the slider value
  const [xvalue, setXvalue] = useState([earliestDate, latestDate]);
  const [priceleft, setPriceleft] = useState(0.0);
  const [priceright, setPriceright] = useState(0.0);

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (newValue[0] > newValue[1]) {
      setXvalue([newValue[1], newValue[0]]);
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], endDate - minDistance);
        setXvalue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], startDate + minDistance);
        setXvalue([clamped - minDistance, clamped]);
      }
    } else {
      setXvalue(newValue);
    }
    let left = parsedData.find(
      (item) => Math.abs(item.x - newValue[0]) < 1000000000
    );
    let right = parsedData.find(
      (item) => Math.abs(item.x - newValue[1]) < 1000000000
    );

    // Find the prices corresponding to the left and right slider positions
    setPriceleft(left?.y || priceleft);
    setPriceright(right?.y || priceright);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Return Rate: {(((priceright - priceleft) / priceleft) * 100).toFixed(2)}
        %
      </Typography>
      <ScatterChart
        xAxis={[
          {
            label: "Date",
            min: xvalue[0],
            max: xvalue[1],
            type: "time",
            valueFormatter: (value) => {
              // Format the timestamp into a readable date string
              return new Date(value).toLocaleDateString();
            },
          },
        ]}
        yAxis={[
          {
            label: "Price",
          },
        ]}
        series={[
          {
            data: parsedData.filter(
              (item) => item.x >= xvalue[0] && item.x <= xvalue[1]
            ),
            dataKey: "y",
            color: "#b291b5",
            valueFormatter: (v) => {
              const x = new Date(v.x).toLocaleDateString();
              return `Date ${x} Price ${v.y}`;
            },
          },
        ]}
        width={600}
        height={400}
      />

      <Box sx={{ width: 600 }}>
        <Slider
          value={xvalue}
          onChange={handleChange}
          valueLabelDisplay="auto"
          min={startDate}
          max={endDate}
          valueLabelFormat={(value) => new Date(value).toLocaleDateString()}
          sx={{ mt: 2 }}
        />
      </Box>

      <Typography variant="body1" sx={{ mt: 2 }}>
        Price over time
      </Typography>
    </Box>
  );
}
