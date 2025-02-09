# WALLST - Investment Portfolio Review

# Project Overview:
WALLEST is a personal investment portfolio review tool that provides a comprehensive analysis of your investment portfolio. WALLST uses AI to provide recommendations based on your risk tolerance, investment focus, and hold time. WALLST also provides a visual representation of your investment portfolio through pie and line charts.

## Get Started
- Clone the repository
- Run `npm install` to install all dependencies
- Run `npm run dev` to start the server
- Navigate to `http://localhost:3000/` to view the application


## Featues:
### Landing Page
- [Choose CSV File] Export a CSV of your investment portfolio from your account on your investment company's page (ex. Fidelity, Charles Schwab, etc.).
- [Download CSV Template] If you'd like to manually input investment portfolio data, download the CSV template and fill out the columns, then submit this file.
- Once a CSV file has been selected, a preview will pop up of the CSV table so you can check if you've chosen the right one.
- [Submit] Once a CSV file has been chosen, click submit to move on to the portfolio review page.

### Portfolio Review
- Pie Chart: Visual representation of your investment portfolio
  - Hover over each section to see the percentage of your portfolio that each investment makes up
  - Click on a section to see the details of that investment
- Line Chart: Visual representation of the return rate of your investment portfolio over time
  - [Price over Time] Adjust the slider for Price over Time to see the return rate at each date
- Fine-tune AI Recommendations based on your preferences including risk, hold time, and focus

## Technologies Used:
- Framework: Nextjs
- Frontend: React, Material-UI, Chart.js
- Backend: Node.js
- AI:OpenAI GPT-3

## Demo
Watch the demo video on YouTube: [WALLST Demo](https://youtu.be/jZs3sxqQ13E)

   
### Please note, the information provided by WALLST is for informational purposes only and does not constitute financial advice. Always consult with a licensed financial professional before making investment decisions.
