import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});

export default async function handler(req, res) {
  console.log('Simple endpoint hit');
  res.status(200).json({ message: 'Hello, world!' });
}

// export default async function handler(req, res) {
//   console.log('API call to evaluate-portfolio');
//   if (req.method === 'POST') {
//     try {
//       const response = await openai.chat.completions.create({
//         model: "gpt-4",
//         messages: [
//           { role: "system", content: "You are a financial advisor specializing in evaluating investment portfolios and offering actionable recommendations to improve profitability and robustness." },
//           { role: "user", content: `
//           Here is the investment portfolio for evaluation:
//           - Total Portfolio Value: $100,000
//           - Asset Allocation:
//             - 50% in U.S. stocks (S&P 500 Index Fund)
//             - 20% in international stocks (Emerging Markets ETF)
//             - 20% in bonds (U.S. Treasury Bonds)
//             - 5% in real estate (REITs)
//             - 5% in cash
//           - Goals: Long-term growth with moderate risk exposure.
          
//           Please evaluate the portfolio from 1 to 10, and provide specific recommendations to make it more robust and profitable.` },
//         ],
//         max_tokens: 50,
//         temperature: 0.7,
//       });

//       res.status(200).json({ answer: response.choices[0].message.content });
//     } catch (error) {
//       console.error('Error calling OpenAI API:', error);
//       res.status(500).json({ error: 'Failed to evaluate portfolio' });
//     }
//   } else {
//     res.status(405).json({ error: 'Method not allowed' });
//   }
// }