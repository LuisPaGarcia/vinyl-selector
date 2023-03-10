import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import axios from "axios";
// Get artist Albums by ID
// Needs artist ID to get albums
const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const artist_id = event?.queryStringParameters?.artist_id || "";

  if (!artist_id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ response: "No artist_id provided" }),
    };
  }

  const urlServer = `https://musicbrainz.org/ws/2/release?artist=${artist_id}&inc=release-groups&status=official&type=album&limit=100&fmt=json`;
  const response = await axios.get(urlServer);
  const data = response.data;

  return {
    statusCode: 200,
    body: JSON.stringify({ response: data, statusCode: 200 }),
  };
};

export { handler };
