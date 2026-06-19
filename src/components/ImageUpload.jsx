//

import { useRef, useState } from "react";
import { predictImage } from "../utils/predictImage";
import { extractDetections } from "../utils/extractDetections";
import "./ImageUpload.css";
import AutoMLimg from "./AutoMLimg";
import { customTrainingPrediction } from "../utils/customTrainingPrediction";
import { resizeImage } from "../utils/resizeImage";

// ----------------------------------------------

export default function ImageUpload() {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [detections, setDetections] = useState([]);
  const [customTrainedImage, setCustomTrainedImage] = useState("");

  const fileInputRef = useRef(null);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    const resizedFile = await resizeImage(file, 256, 256);

    setImage({
      resizeImage,
      url: imageUrl,
      width: 256,
      height: 256,
    });

    setIsLoading(true);
    const result = await predictImage(resizedFile);
    const customResult = await customTrainingPrediction(resizedFile);
    if (customResult?.mask_base64) {
      setCustomTrainedImage(customResult?.mask_base64);
    }

    const filteredDetections = extractDetections(result);

    setDetections(filteredDetections);
    setIsLoading(false);
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <div className="upload-container">
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            className="upload-box"
            onClick={handleImageClick}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />

            <label
              htmlFor="image-upload"
              className="upload-label"
            >
              {image?.url ? (
                <img
                  src={image.url}
                  alt="Preview"
                  className="preview-image"
                />
              ) : (
                <p>📷 Click to upload an image</p>
              )}
            </label>
          </div>

          <div>
            <button
              style={{
                border: "none",
                backgroundColor: "#3c3cb8",
                color: "white",
                padding: "8px 16px",
                borderRadius: 4,
                cursor: "pointer",
              }}
              onClick={handleImageClick}
            >
              Upload new MRI scan
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div>
          <p>Getting records from the Google API ... ⏳</p>
        </div>
      ) : null}

      {!isLoading && detections?.length ? (
        <div
          style={{
            display: "flex",
            gap: 48,
            justifyContent: "center",
            flexWrap: "wrap",
            border: "1px solid #ccc",
            borderRadius: 8,
            padding: 24,
            marginInline: "auto",
          }}
        >
          {detections?.length ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div
                style={{
                  border: "1px solid #ccc",
                  borderRadius: 16,
                  overflow: "hidden",
                  maxHeight: 256,
                }}
              >
                <AutoMLimg
                  detections={detections}
                  image={image}
                />
              </div>

              <div>
                <p>AutoML Result</p>
              </div>
            </div>
          ) : null}

          {detections?.length && customTrainedImage?.length ? (
            <hr style={{ border: "0.5px solid gray" }} />
          ) : null}

          {customTrainedImage?.length ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div
                style={{
                  border: "1px solid #ccc",
                  borderRadius: 16,
                  overflow: "hidden",
                  maxHeight: 256,
                }}
              >
                <img
                  height={256}
                  width={256}
                  src={"data:image/jpg;base64," + customTrainedImage}
                  alt="custom_trained_img"
                />
              </div>

              <div>
                <p>Custom Training Result</p>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
