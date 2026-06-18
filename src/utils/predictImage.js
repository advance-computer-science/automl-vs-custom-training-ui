//

import { convertToBase64 } from "./base64";
import { LOCATION, PROJECT_ID, ENDPOINT_ID, ACCESS_TOKEN } from "../config";

// ----------------------------------------------

export const predictImage = async (file) => {
  const imageBytes = await convertToBase64(file);

  const response = await fetch(
    `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/endpoints/${ENDPOINT_ID}:predict`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        instances: [
          {
            content: imageBytes,
          },
        ],
      }),
    },
  );

  const result = await response.json();

  if (result?.error?.code === 401) {
    window.alert("Unauthorized access. Please check your access token.");
  } else if (result?.error?.code === 404) {
    window.alert(
      "No end point found. Please check your endpoint ID and project configuration.",
    );
  } else if (result?.error?.code === 400) {
    window.alert("End point misconfiguration.");
  }

  return result;
};
