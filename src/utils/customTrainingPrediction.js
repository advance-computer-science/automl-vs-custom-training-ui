//

import { CUSTOM_TRAINING_ENDPOINT } from "../config";

// ----------------------------------------------

export const customTrainingPrediction = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${CUSTOM_TRAINING_ENDPOINT}/predict`, {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  return result;
};
