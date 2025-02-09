import { PieChart } from '@mui/x-charts';
import { Box, Typography } from '@mui/material';

const pallete=['#d1af6e', '#a4896c', '#786668', '#494463', '#00275c', '#c1c1b7', '#8d8d9f', '#5e6396', '#17439b']

export default function ProfolioPie({csv}) {
  console.log("ProfolioPie", csv);
  // Process data
  const data = csv.map(item => {
    const symbol = item.symbol;
    const amount = parseFloat(item.amount);
    const value = amount;

    return {
      id: symbol,
      label: symbol,
      value: value,
    };
  });
  
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Investment Portfolio
      </Typography>
      {data.length > 0 ? (
        <PieChart
          series={[
            {
              data: data,
              innerRadius: 30,
              outerRadius: 200,
              paddingAngle: 2,
              cornerRadius: 3,
            },
          ]}
          width={700}
          height={500}
          colors={pallete}
          slotProps={{
            legend: {
              direction: 'column',
              position: { vertical: 'middle', horizontal: 'right' },
              padding: -20,
            },
          }}
        />
      ) : (
        <Typography variant="body1">No data available</Typography>
      )}
    </Box>
  );
}