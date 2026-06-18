//

export const extractDetections = (response, confidenceThreshold = 0.8) => {
  const prediction = response?.predictions?.[0];

  if (!prediction) return [];

  return prediction.confidences
    .map((confidence, index) => ({
      label: prediction.displayNames[index],
      confidence,
      bbox: prediction.bboxes[index],
    }))
    .filter((item) => item.confidence >= confidenceThreshold);
};
