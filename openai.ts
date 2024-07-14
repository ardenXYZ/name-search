import { OpenAI, ClientOptions } from 'openai';

const openaiOptions: ClientOptions = {
  apiKey: process.env.OPENAI_API_KRY,
};
const proxyUrl = process.env.PROXY_URL;
if (proxyUrl) {
  openaiOptions.baseURL = proxyUrl;
}

export const openai = new OpenAI(openaiOptions);
