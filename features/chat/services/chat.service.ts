import { ABOUT_ME } from "../../../constants/answers";
import { openai } from "../../../lib/openai";

let cachedResume: string | null = null;

export async function sendMessageToAI(message: string) {
  console.log("Sending message to AI:", message);

  // cache so we don’t read file every request
  //   if (!cachedResume) {
  //     cachedResume = await readPDF("data/resume.pdf");
  //   }
  const response = await openai.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      {
        role: "system",
        content: `
            You are an AI assistant that represents Vincent.

            You must ONLY answer questions based on the information below.

            === ABOUT VINCENT ===
            ${ABOUT_ME}

            RULES:
            - Do NOT make up information
            - If the answer is not in the data, say:
              "I'm not sure, but you can ask him directly."
            - If the question is NOT about Vincent, say:
              "I can only answer questions about Vincent."
            - Keep answers clear and professional
            - Answer like in a middle of technical and laymans term, not too technical but not too simple either.
          `,
      },
      {
        role: "user",
        content: message,
      },
    ],
  });

  return response.choices[0]?.message?.content || "";
}
