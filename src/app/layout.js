import { Libre_Bodoni } from "next/font/google"; // Import Libre Bodoni
import "./globals.css";


// Configure Libre Bodoni
const libreBodoni = Libre_Bodoni({
  subsets: ["latin"],
  weights: [400, 700],
});

export const metadata = {
  title: "wallst",
  description: "Your personal investment portfolio manager",
};

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