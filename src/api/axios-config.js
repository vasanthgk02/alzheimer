import axios from "axios";

const AXIOS = axios.create({
  baseURL:
    "https://0137-2402-3a80-1339-1ad3-b29e-eb91-fb7e-e722.ngrok-free.app",
  timeout: 5000, // request timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default AXIOS;
