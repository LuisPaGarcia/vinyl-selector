import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import axios from "axios";
// Search Artist By Query
// Needs query param to search for artist
const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const query = event?.queryStringParameters?.query || "";

  if (!query) {
    return {
      statusCode: 400,
      body: JSON.stringify({ response: "No query provided" }),
    };
  }

  const urlServer = `https://musicbrainz.org/ws/2/artist/?query=${query}fmt=json`;
  const response = await axios.get(urlServer);
  const data = response.data;

  return {
    statusCode: 200,
    body: JSON.stringify({ response: data, statusCode: 200 }),
  };
};

export { handler };
