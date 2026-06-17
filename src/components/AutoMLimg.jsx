//

import { useRef } from "react";

// ----------------------------------------------

export default function AutoMLimg({ detections, image }) {
  const imageRef = useRef(null);

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

  return (
    <>
      {image?.url && detections?.length === 0 ? (
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
      ) : null}

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
    </>
  );
}
