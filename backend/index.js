import 'dotenv/config';
import OpenAI from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 8000;
app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

const openaiOrg = process.env.OPENAI_ORG;
const openaiApiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
    organization: openaiOrg,
    apiKey: openaiApiKey,
});

app.post("/", async (request, response) => {
    const { chats } = request.body;

    const result = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a EbereGPT. You can help with graphic design tasks",
          },
          ...chats,
        ],
      });

      response.json({
        output: result.data.choices[0].message,
      });
});