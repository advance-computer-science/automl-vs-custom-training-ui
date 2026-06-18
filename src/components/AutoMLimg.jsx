//

import { useRef } from "react";

// ----------------------------------------------

export default function AutoMLimg({ detections, image }) {
  const imageRef = useRef(null);

  const getBoundingBoxPixels = (bbox, imageWidth, imageHeight) => {
    const [xMin, xMax, yMin, yMax] = bbox;

    const box = {
      left: Math.round(xMin * imageWidth),
      top: Math.round(yMin * imageHeight),
      boxWidth: Math.round((xMax - xMin) * imageWidth),
      boxHeight: Math.round((yMax - yMin) * imageHeight),
    };

    return box;
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
            style={{ display: "block" }}
            height={256}
            width={256}
          />

          {detections?.map((detection, index) => {
            const box = getBoundingBoxPixels(
              detection.bbox,
              image?.width,
              image?.height,
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
                  border: "2px solid red",
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: -30,
                    top: -30,
                    color: "#fff",
                    padding: "2px 6px",
                    fontSize: "12px",
                    width: 120,
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
