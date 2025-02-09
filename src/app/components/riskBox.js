import { Box, Typography } from '@mui/material';

const pallete=['#d1af6e', '#a4896c', '#786668', '#494463', '#00275c', '#c1c1b7', '#8d8d9f', '#5e6396', '#17439b']

export default function RiskBox({ data }) {
  return (
    <Box>
        <Box sx={{ padding: 2 }}>
        <Typography variant="h6" gutterBottom>
            Risk Level
            </Typography>
            <Typography variant="body1">Risk Level: Medium</Typography>
            <Typography variant="body1">Rating: 4.5/5</Typography>
        </Box>
    </Box>
  );
}