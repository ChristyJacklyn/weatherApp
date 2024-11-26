import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "1d7db6c439d0be8eb2516075b9e5dd64";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";



export const useWeather = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const fetchWeather = async (city) => {
          try {
              const { data } = await axios.get(BASE_URL, {
              params: { q: city, units: "metric", appid: API_KEY },
            });
            console.log("Current weather data:", data);
            setCurrentWeather(data);

              const forecastRes = await axios.get("https://api.openweathermap.org/data/2.5/onecall", {
                params: {
                  lat: data.coord.lat,
                  lon: data.coord.lon,
                  exclude: "minutely,hourly",
                  units: "metric",
                  appid: API_KEY,
                },
              });
             
              setForecast(forecastRes.data);
              console.log("Forecast data:", forecastRes.data);
            } 
          catch (error) 
          {
            console.error("Error fetching weather data:", error);
          }
  };

  return { currentWeather, forecast, fetchWeather };

};

export default useWeather;