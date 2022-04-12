import { Platform } from "react-native";

export const HttpRequest = async (url: string, method: string) => {
  const headers = {
    "content-type": "application/json;charset=utf-8",
    platform: Platform.OS === "ios" ? "iOS" : "Android",
  };

  const fetchRequest = fetch(url, {
    method,
    headers,
  });

  const timeOut = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("Server timed out")), 10000);
  });

  const response = await Promise.race([fetchRequest, timeOut]);

  if (response.status === 200) {
    const data = await response.json();

    if (data.status && data.status !== "success") {
      if (data.message) {
        return data.message;
      }
      return data.message;
    }
    return data;
  }

  if (response.status !== 200) {
    return response;
  }
};
