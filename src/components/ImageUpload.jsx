//

import { useState } from "react";
import { predictImage } from "../utils/predictImage";

// ----------------------------------------------

export default function ImageUpload() {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setImage(URL.createObjectURL(file));

    const result = await predictImage(file);

    setPrediction(result);
  };

  console.log(prediction);

  return (
    <div>
      {!image && (
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      )}

      {image && (
        <img
          src={image}
          alt="MRI"
          width="500"
        />
      )}
    </div>
  );
}
