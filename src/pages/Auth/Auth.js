import axios from "axios";
const baseURL = window.location.origin;

export const signUp = async (userData) => {
  try {
    const { email, username, password } = userData;
    console.log(userData);
    console.log("前端api 接收ok");
    const response = await axios.post(`${baseURL}/auth/register`, {
      email,
      username,
      password,
    });
    return response.data;
  } catch (e) {
    console.error("Error in signUp:", e.response?.data?.error || e.message);
    return { error: e.response?.data?.error || "註冊錯誤，請重新操作" };
  }
};
export const login = async (userData) => {
  try {
    const { username, password } = userData;
    console.log(userData);
    console.log("前端api 接收ok");
    const response = await axios.post(`${baseURL}/auth/login`, {
      username,
      password,
    });
    return response.data;
  } catch (e) {
    console.error("Error in login:", e.response?.data?.error || e.message);
    return { error: e.response?.data?.error || "帳號或密碼輸入錯誤!" };
  }
};


