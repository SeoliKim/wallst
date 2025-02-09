import { LineChart } from "@mui/x-charts";
import { Box, Typography } from "@mui/material";

export default function ReturnChart({ data }) {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h6" gutterBottom>
        Return Rate Over Time
      </Typography>
      <LineChart
        xAxis={[
          {
            dataKey: "date",
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
        dataset={data}
        width={400}
        height={300}
      />
    </Box>
  );
}
