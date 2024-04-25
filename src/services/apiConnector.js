import axios from "axios";

export const axiosInstance = axios.create({});

// Add a response interceptor for handling successful responses
axiosInstance.interceptors.response.use(
  (response) => {
    // Return the response data on success
    return response.data;
  },
  (error) => {
    // Return a rejected promise with the error for centralized error handling
    return Promise.reject(error);
  }
);

export const apiConnector = async (method, url, bodyData, headers, params) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data: bodyData || null,
      headers: headers || null,
      params: params || null,
    });
    return response;
  } catch (error) {
    // Log the error for debugging
    console.error("API Error:", error);

    // Throw the error again to be caught by the caller
    throw error;
  }
};
