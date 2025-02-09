import { Libre_Bodoni } from "next/font/google"; // Import Libre Bodoni
import "./globals.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


// Configure Libre Bodoni
const libreBodoni = Libre_Bodoni({
  subsets: ["latin"],
  weights: [400, 700],
});

export const metadata = {
  title: "wallst",
  description: "Your personal investment portfolio manager",
};

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Change this to your desired primary color
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${libreBodoni.className} `}
      >
        {children}
      </body>
    </html>
  );
}