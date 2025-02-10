![WALLST Logo](public/logo.png)

# WALLST - Investment Portfolio Review Tool

## Project Overview
WALLST is an advanced personal investment portfolio review tool designed to provide users with a comprehensive analysis of their investment portfolios. Leveraging artificial intelligence, WALLST offers tailored recommendations based on user-defined parameters such as risk tolerance, investment focus, and holding period. Additionally, the tool provides intuitive visual representations of portfolio data through interactive pie and line charts.

### Demo
Watch the demo video on YouTube: [WALLST Demo](https://youtu.be/jZs3sxqQ13E)

## Mission
WALLST is committed to democratizing access to personal finance tools, empowering individuals to make informed financial decisions without unnecessary complexity or cost. We believe that financial literacy and accessibility should be available to everyone, regardless of their background or expertise.

WALLST ensures that all user data remains confidential and secure. No data is stored on our servers, and all information is permanently deleted once the session concludes, providing users with peace of mind and complete control over their financial data.

## Get Started
1. Clone the repository
```git clone https://github.com/SeoliKim/wallst.git```
2. Navigate to the project directory
3. Install dependencies
```npm install```
4. Add your OpenAI API key to `src/app/next.config.js`
5. Start the server
```npm run dev```
6. Navigate to `http://localhost:3000/` to view the application


## Features:
### Landing Page
- *Upload Portfolio Data*: Export a CSV file of your investment portfolio from your brokerage account (e.g., Fidelity, Charles Schwab) and upload it to WALLST for analysis. A preview of the data would be displayed. 
- *Download CSV Template*: If you prefer to manually input your portfolio data, download the provided CSV template, fill in the required columns, and upload the file. 


### Portfolio Review
- *Portfolio Visualization*: The personal profoloio is visualized in a pie chart provides a clear breakdown of your portfolio's asset allocation, illustrating the distribution across various asset classes.
  - Hover over each section to see the percentage of your portfolio that each investment makes up
- *Monitor return rate*: A dynamic line chart displays the historical price and corresponding return rate of your investments over time, enabling users to assess risk and return trends.

### AI Recommendations
- *Tailored Insights*: WALLST utilizes advanced AI models to generate personalized investment recommendations based on user-defined parameters.
- *Customizable Preferences*: Users can adjust recommendations by specifying their risk tolerance, investment focus, and holding period to align with their financial goals.
- *Immediate Evluation*: Users can apply AI-recommended adjustments to their portfolio and immediately visualize the potential performance of the updated allocation.


## Technologies Used:
- Framework: Next.js
- Frontend: React, Material-UI, Chart.js
- Backend: Node.js
- AI Integration: OpenAI 
- API: Alpha Vantage, csv-parser

### Disclamer
the information provided by WALLST is for informational purposes only and does not constitute financial advice. Always consult with a licensed financial professional before making investment decisions.