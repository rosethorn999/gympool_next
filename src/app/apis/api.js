import axios from "axios";

let host = process.env.REACT_APP_HOST;
const basicRequest = axios.create({
  baseURL: host,
});

basicRequest.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { host };
export default basicRequest;
