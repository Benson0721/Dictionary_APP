import axios from "axios";
import localforage from "localforage";
const baseURL = window.location.origin;

async function signUp(url, userData) {
  try {
    const { email, username, password } = userData;
    console.log(userData);
    console.log("前端api 接收ok");
    const response = await axios.post(`${url}/api/register`, {
      email,
      username,
      password,
    });
    return { id: response.data._id, username: response.data.username };
  } catch (e) {
    console.error("Error in signUp:", e.response?.data?.error || e.message);
    return { error: e.response?.data?.error || "註冊錯誤，請重新操作" };
  }
}

export const registerAction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const userData = Object.fromEntries(formData);
    const response = await signUp(baseURL, userData);
    if (response.error) {
      return { error: response.error };
    }
    await localforage.setItem("user", response);
    return { id: response.id, username: response.username };
  } catch (e) {
    console.error("Error in signUp:", e.response?.data?.error || e.message);
    return { error: e.response?.data?.error || "註冊錯誤，請重新操作" };
  }
};
