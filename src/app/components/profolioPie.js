import { PieChart } from '@mui/x-charts';
import { Box, Typography } from '@mui/material';

const pallete=["#002051","#0a326a","#2b446e","#4d566d","#696970","#7f7c75","#948f78","#ada476","#caba6a","#ead156","#fdea45"]

export default function ProfolioPie({ data }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Investment Profolio
      </Typography>
      {data.length > 0 ? (
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 180, label: 'IBM' },
                { id: 1, value: 150, label: 'AAPL' },
                { id: 2, value: 2800, label: 'GOOGL' },
                { id: 3, value: 3400, label: 'AMZN' },
                { id: 4, value: 700, label: 'TSLA' },
                { id: 5, value: 300, label: 'MSFT' },
                { id: 6, value: 350, label: 'FB' },
                { id: 7, value: 200, label: 'NVDA' },
                { id: 8, value: 600, label: 'NFLX' },
                { id: 9, value: 50, label: 'INTC' }
            ],
              innerRadius: 30,
              outerRadius: 200,
              paddingAngle: 5,
              cornerRadius: 5,
            },
          ]}
          width={500}
          height={500}
          slotProps={{ legend: { hidden: true } }}
          colors={pallete}
        />
      ) : (
        <Typography variant="body1">No data available</Typography>
      )}
    </Box>
  );
}