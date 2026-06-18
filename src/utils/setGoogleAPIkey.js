//

import { useEffect, useState } from "react";
import { STORAGE_KEY } from "../config";

// ----------------------------------------------

export const useGoogleApiKey = () => {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    let storedKey = localStorage.getItem(STORAGE_KEY);

    if (!storedKey) {
      storedKey = window.prompt("Please enter your Google API Key");

      if (storedKey?.trim()) {
        localStorage.setItem(STORAGE_KEY, storedKey.trim());
      }
    }

    setApiKey(storedKey || "");
  }, []);

  const updateApiKey = (newKey) => {
    localStorage.setItem(STORAGE_KEY, newKey.trim());

    setApiKey(newKey.trim());
  };

  return {
    apiKey,
    updateApiKey,
  };
};
