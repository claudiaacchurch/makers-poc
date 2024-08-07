import * as dotenv from 'dotenv';
import OpenAI from 'openai';
dotenv.config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


const openAiClient = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
  organization: process.env.OPEN_AI_ORGANIZATION,
});

async function main(){
    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      messages: [{ role: 'user', content: 'Say this is a test.' }],
      model: 'gpt-4o',
    };
    const chatCompletion: OpenAI.Chat.ChatCompletion = await openAiClient.chat.completions.create(params);
    console.log(chatCompletion.choices[0])
    return chatCompletion;
  }
  
main();