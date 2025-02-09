import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.AI_API_KEY, // Replace with your actual OpenAI API key
  dangerouslyAllowBrowser: true   // Required to use the API in the browser
});

export const gptAPI = async (csv, risk, interval, notes) => {
    // Call the OpenAI GPT API
    const gptResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a financial advisor specializing in evaluating investment portfolios and offering actionable recommendations to improve profitability and robustness." },
        { role: "user", content: 
          `Here is the investment portfolio for evaluation:
          - Asset Allocation:
            ${csv}
          
          Please recommend a new portfolio and provide the output in the following format:
          Output:
          [
            { "symbol": "<asset>", "amount": <percentage> },
            { "symbol": "<asset>", "amount": <percentage> }
          ]

          Ensure the following restrictions are applied:
            1. The total percentage allocation must add up to exactly 1 (100%).
            2. Adjustments should align with the stated goal of a ${interval} interval and ${risk} risk profile, including ${notes}.
            3. Make 2 changes to the existing assets and add 3 new assets to the portfolio, no bonds.


          Example Output:
          [
            { "symbol": "SPDR", "amount": 0.5 },
            { "symbol": "VWO", "amount": 0.2 },
            { "symbol": "MSFT", "amount": 0.1 },
            { "symbol": "NVDA", "amount": 0.05 },
            { "symbol": "AAPL", "amount": 0.05 },
            { "symbol": "AI", "amount": 0.05 },
            { "symbol": "XLK", "amount": 0.05 }
          ]
            Only output the JSON string. Do not include any other text or explanation.`
        },
      ],
      max_tokens: 500,
      temperature: 0.5,
    });
  
    if (!gptResponse.choices || gptResponse.choices.length === 0) {
      throw new Error('Failed to get a response from OpenAI GPT');
    }
    console.log(gptResponse.choices[0].message.content)
    // Return the GPT response
    return gptResponse.choices[0].message.content;
};
