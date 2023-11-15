import axios from "axios";

const API_BASE_URL = "https://api.whatagpt.com/api/";
const USERNAME = "25467de9b807178";
const PASSWORD = "11b1f9ae1716079";

export function gptApiCall(url, temp) {
  return axios.post(`${API_BASE_URL}${url}`, temp, {
    auth: {
      username: USERNAME,
      password: PASSWORD,
    },
  });
}
