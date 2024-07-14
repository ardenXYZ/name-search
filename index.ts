import {
  APIGatewayEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from 'aws-lambda';
import { names } from './names';
import { openai } from './openai';

const nameList = names;

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);
  const params = event.queryStringParameters || {};
  const name = params.name;
  console.log(name);
  if (!name) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: 'There is no given name',
      }),
    };
  }

  const result = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    temperature: 0,
    messages: [
      {
        role: 'system',
        content: 'You are a text search engine',
      },
      {
        role: 'user',
        content: `Find the best match for the name "${name}" in the list: ${nameList}`,
      },
    ],
  });
  return {
    statusCode: 200,
    body: JSON.stringify({
      match: result.choices[0].message.content || 'No match found',
    }),
  };
};
