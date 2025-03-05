import axios from "axios";
import localforage from "localforage";
const baseURL = window.location.origin;

async function login(url, userData) {
  try {
    console.log(userData);
    const { username, password } = userData;
    const response = await axios.post(
      `${url}/api/login`,
      {
        username,
        password,
      },
      { withCredentials: true }
    );
    return { id: response.data._id, username: response.data.username };
  } catch (e) {
    console.error("Error in login:", e.response?.data?.error || e.message);
    return { error: e.response?.data?.error || "帳號或密碼輸入錯誤!" };
  }
}

export const loginAction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const userData = Object.fromEntries(formData);
    const response = await login(baseURL, userData);

    if (response.error) {
      return { error: response.error };
    }
    await localforage.setItem("user", response);
    return { id: response.id, username: response.username };
  } catch (e) {
    console.error("Error in login:", e.response?.data?.error || e.message);
    return { error: e.response?.data?.error || "帳號或密碼輸入錯誤!" };
  }
};
