import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#d5b271', // Replace with your desired color
        },
        secondary: {
            main: '#73586d', // Replace with your desired color
        },
        // Add more color customizations as needed
    },
    typography: {
        fontFamily: 'var(--font-libre-bodoni)', // Replace with your desired font variable
    },
});

export default theme;