// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key

export async function time_series_monthly(company) {
  var symbol = company;
  var url =
    "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=" +
    symbol +
    "&apikey=demo";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}
