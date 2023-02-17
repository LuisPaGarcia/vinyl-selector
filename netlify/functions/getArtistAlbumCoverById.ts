import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import axios from "axios";
// Get Album cover by ID
// Needs album ID to get album cover
const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const album_id = event?.queryStringParameters?.album_id || "";
  console.log("album_id", album_id);
  if (!album_id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ response: "No album_id provided" }),
    };
  }

  console.log("album_id", album_id);
  const urlServer = `https://coverartarchive.org/release/${album_id}`;
  console.log("urlServer", urlServer);
  const response = await axios.get(urlServer);
  const data = response.data;

  return {
    statusCode: 200,
    body: JSON.stringify({ response: { ...data, album_id }, statusCode: 200 }),
  };
};

export { handler };
