import axios from "axios";
const setAuthToken = (token) => {
  if (token) {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common["authenticated"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["authenticated"];
  }
};
export default setAuthToken;
