import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.AI_API_KEY, // Replace with your actual OpenAI API key
  dangerouslyAllowBrowser: true   // Required to use the API in the browser
});

export const gptAPI = async (risk, interval, notes) => {
    // Call the OpenAI GPT API
    const gptResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a financial advisor specializing in evaluating investment portfolios and offering actionable recommendations to improve profitability and robustness." },
        { role: "user", content: 
          `Here is the investment portfolio for evaluation:
          - Asset Allocation:
            [
            { "symbol": "SPDR", "quantity": 0.5 },
            { "symbol": "VWO", "quantity": 0.2 },
            { "symbol": "10 year bonds", "quantity": 0.2 },
            { "symbol": "NVDA", "quantity": 0.05 },
            { "symbol": "AAPL", "quantity": 0.05 },
          ] 
          
          Please recommend a new portfolio and provide the output in the following format:
          Output:
          [
            { "symbol": "<asset>", "quantity": <percentage> },
            { "symbol": "<asset>", "quantity": <percentage> }
          ]

          Ensure the following restrictions are applied:
            1. The total percentage allocation must add up to exactly 1 (100%).
            2. Adjustments should align with the stated goal of a ${interval} interval and ${risk} risk profile, including ${notes}.
            3. Make 2 changes to the existing assets and add 3 new assets to the portfolio.


          Example Output:
          [
            { "symbol": "SPDR", "quantity": 0.5 },
            { "symbol": "VWO", "quantity": 0.2 },
            { "symbol": "10 year bonds", "quantity": 0.1 },
            { "symbol": "NVDA", "quantity": 0.05 },
            { "symbol": "AAPL", "quantity": 0.05 },
            { "symbol": "AI", "quantity": 0.05 },
            { "symbol": "XLK", "quantity": 0.05 }
          ]
            Only output the JSON array. Do not include any other text or explanation.`
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
