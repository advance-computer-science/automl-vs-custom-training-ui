//

import { useRef, useState } from "react";
import { predictImage } from "../utils/predictImage";
import { extractDetections } from "../utils/extractDetections";

// ----------------------------------------------

export default function ImageUpload() {
  const [image, setImage] = useState(null);
  const [detections, setDetections] = useState([]);
  const imageRef = useRef(null);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    const img = new Image();

    img.onload = () => {
      setImage({
        file,
        url: imageUrl,
        width: img.width,
        height: img.height,
      });
    };

    img.src = imageUrl;

    const result = await predictImage(file);

    const filteredDetections = extractDetections(result);

    setDetections(filteredDetections);
  };

  const getBoundingBoxPixels = (bbox, imageWidth, imageHeight) => {
    const [xMin, yMin, xMax, yMax] = bbox;

    return {
      x: xMin * imageWidth,
      y: yMin * imageHeight,
      width: (xMax - xMin) * imageWidth,
      height: (yMax - yMin) * imageHeight,
      left: Math.round(xMin * imageWidth),
      top: Math.round(yMin * imageHeight),
      boxWidth: Math.round((xMax - xMin) * imageWidth),
      boxHeight: Math.round((yMax - yMin) * imageHeight),
    };
  };

  console.log(image);
  console.log(detections);

  return (
    <div>
      {!image && (
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      )}

      {image?.url && detections?.length === 0 && (
        <div
          style={{
            color: "#fff",
            padding: "10px 20px",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            fontSize: "18px",
          }}
        >
          No tumor detections for MRI on above 0.8 confidence threshold.
        </div>
      )}

      {detections?.length ? (
        <div
          style={{
            position: "relative",
            display: "inline-block",
          }}
        >
          <img
            ref={imageRef}
            src={image?.url}
            alt="MRI"
          />

          {detections?.map((detection, index) => {
            const box = getBoundingBoxPixels(
              detection.bbox,
              image.width,
              image.height,
            );

            return (
              <div
                key={index}
                style={{
                  position: "absolute",
                  left: box.left,
                  top: box.top,
                  width: box.boxWidth,
                  height: box.boxHeight,
                  border: "3px solid red",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: Math.max(25, box.top - 10),
                    left: box.left,
                    color: "#fff",
                    padding: "2px 6px",
                    fontSize: "12px",
                  }}
                >
                  {detection.label} ({(detection.confidence * 100).toFixed(1)}
                  %)
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
