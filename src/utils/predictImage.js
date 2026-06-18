//

import { convertToBase64 } from "./base64";
import { LOCATION, PROJECT_ID, ENDPOINT_ID, STORAGE_KEY } from "../config";

// ----------------------------------------------

export const predictImage = async (file) => {
  const imageBytes = await convertToBase64(file);

  let storedKey = localStorage.getItem(STORAGE_KEY);

  if (!storedKey.startsWith("ya29.")) {
    const newKey = window.prompt("Please enter your Google API Key");

    if (newKey?.trim()) {
      localStorage.setItem(STORAGE_KEY, newKey.trim());
      storedKey = newKey.trim();
    }
  }

  const response = await fetch(
    `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/endpoints/${ENDPOINT_ID}:predict`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${storedKey}`,
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
    const newKey = window.prompt(
      "Unauthorized access. Please enter the new Google API Key",
    );
    localStorage.setItem(STORAGE_KEY, newKey.trim());
    window.location.reload();
  } else if (result?.error?.code === 404) {
    window.alert(
      "No end point found. Please check your endpoint ID and project configuration.",
    );
  } else if (result?.error?.code === 400) {
    window.alert("End point misconfiguration.");
  }

  return result;
};
