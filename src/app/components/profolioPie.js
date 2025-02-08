import { PieChart } from '@mui/x-charts';
import { Box, Typography } from '@mui/material';

export default function ProfolioPie({ data }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Distribution
      </Typography>
      {data.length > 0 ? (
        <PieChart
          series={[
            {
              data: data,
              innerRadius: 30,
              outerRadius: 100,
              paddingAngle: 5,
              cornerRadius: 5,
            },
          ]}
          width={400}
          height={200}
        />
      ) : (
        <Typography variant="body1">No data available</Typography>
      )}
    </Box>
  );
}