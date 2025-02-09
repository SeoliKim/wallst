import Papa from "papaparse";

export async function readCSV(filePath) {
  try {
    // Fetch the CSV file from the public folder
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch the file: ${filePath}`);
    }

    // Read the file's content
    const csvText = await response.text();

    // Parse the CSV content using PapaParse
    const result = Papa.parse(csvText, {
      header: true, // Set to false if your CSV doesn't have headers
      skipEmptyLines: true,
    });

    // Return the parsed data as a list
    return result.data;
  } catch (error) {
    console.error("Error reading the CSV file:", error);
    return [];
  }
}
