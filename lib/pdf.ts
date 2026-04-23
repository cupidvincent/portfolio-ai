import fs from "fs";
import pdf from "pdf-parse-new";

export async function readPDF(filePath: string) {
  console.log("Reading PDF file:", filePath);
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);

  return data.text;
}
