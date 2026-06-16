//

import { useState } from "react";

// ----------------------------------------------

export default function ImageUpload() {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setImage(URL.createObjectURL(file));
  };

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
