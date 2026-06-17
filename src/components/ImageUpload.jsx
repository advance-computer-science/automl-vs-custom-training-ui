//

import { useRef, useState } from "react";
import { predictImage } from "../utils/predictImage";
import { extractDetections } from "../utils/extractDetections";
import "./ImageUpload.css";
import AutoMLimg from "./AutoMLimg";

// ----------------------------------------------

export default function ImageUpload() {
  const [image, setImage] = useState(null);
  const [detections, setDetections] = useState([]);
  const fileInputRef = useRef(null);

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

      <div>
        <AutoMLimg
          detections={detections}
          image={image}
        />
      </div>
    </>
  );
}
