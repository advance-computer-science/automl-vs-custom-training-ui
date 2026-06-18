//

export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result.split(",")[1];
      resolve(result);
    };

    reader.onerror = reject;
  });
};
