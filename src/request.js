import axios from "axios";
const BASE_URL = "https://api.exchangeratesapi.io/latest";
export const getDataFromApi = async () => {
  const data = await axios.get(BASE_URL);
  return data;
};

export const calculateExchangeValue = async (from, to) => {
  const {
    data: { rates },
  } = await axios.get(`${BASE_URL}?base=${from}&symbols=${to}`);
  return rates;
};
