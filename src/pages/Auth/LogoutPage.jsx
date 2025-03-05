import axios from "axios";
import localforage from "localforage";
const baseURL = window.location.origin;

export const logoutAction = async ({ request }) => {
  try {
    await localforage.removeItem("user", () => {
      console.log("user removed");
    });
    const response = await axios.post(`${baseurl}/api/logout`, {
      withCredentials: true,
    });
    console.log(response);
    setUser(null);
    setIsLoggedIn(false);
  } catch (e) {
    console.error("Error in logout:", e.response?.data?.error || e.message);
    return { error: e.response?.data?.error || "登出發生錯誤!" };
  }
};
