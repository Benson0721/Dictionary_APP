import axios from "axios";

const fetchWordData = async (data) => {
  try {
    const response = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${data}`
    );
    return response.data[0];
  } catch (err) {
    throw err;
  }
};

export { fetchWordData };
