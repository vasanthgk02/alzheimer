import axios from "axios";

const AXIOS = axios.create({
  baseURL:
    "https://cc98-2405-201-e033-609e-315e-576e-1f40-df67.ngrok-free.app",
  timeout: 5000, // request timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default AXIOS;
