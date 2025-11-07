// utils/apiClient.ts
import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://10.230.249.221:3001/api/v1", // must match backend
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

export default apiClient;