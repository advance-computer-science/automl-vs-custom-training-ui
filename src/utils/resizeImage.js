//

export const resizeImage = (file, maxWidth = 512, maxHeight = 512) => {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      let { width, height } = img;

      const ratio = Math.min(maxWidth / width, maxHeight / height);

      width *= ratio;
      height *= ratio;

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          const resizedFile = new File([blob], file.name, { type: file.type });

          resolve(resizedFile);
        },
        file.type,
        0.9,
      );
    };

    img.src = URL.createObjectURL(file);
  });
};
