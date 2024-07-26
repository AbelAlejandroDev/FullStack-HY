import axios from "axios";

const WEATHER_API = import.meta.env.VITE_WEATHER_API
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const getCapitalWeather = async (capital) => {
  try {
    const resp = await axios.get(
      `${baseUrl}?q=${capital}&appid=${WEATHER_API}&units=metric`
    );
    return resp.data;
  } catch (error) {
    console.log("error fetching data", error);
    return;
  }
};

export { getCapitalWeather };
