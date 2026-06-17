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

    const result = await predictImage(resizedFile);
    const customResult = await customTrainingPrediction(resizedFile);
    if (customResult?.mask_base64) {
      setCustomTrainedImage(customResult?.mask_base64);
    }

    const filteredDetections = extractDetections(result);

    setDetections(filteredDetections);
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <div className="upload-container">
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
              <>
                <p>📷 Click to upload an image</p>
              </>
            )}
          </label>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 32,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {detections?.length ? (
          <AutoMLimg
            detections={detections}
            image={image}
          />
        ) : null}

        {customTrainedImage?.length ? (
          <div>
            <img
              height={256}
              width={256}
              src={"data:image/jpg;base64," + customTrainedImage}
              alt="custom_trained_img"
            />
          </div>
        ) : null}
      </div>
    </>
  );
}
