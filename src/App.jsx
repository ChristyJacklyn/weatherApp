  {/*import React from "react";
import {useWeather} from "./hooks/useWeather";
import SearchCity from "./component/searchCity";
import CurrentWeather from "./component/currentWeather";
import Forecast from "./component/forecast";

const App = () => {
  const { currentWeather, forecast, fetchWeather } = useWeather();

  return (
    <div className="app">
      <SearchCity onSearch={fetchWeather}/>
      <CurrentWeather weather={currentWeather} />
      <Forecast forecast={forecast} />
    </div>
  );
};

export default App; */}




import React, { useState, useEffect } from "react";
import axios from "axios";
import sunimage from '/sun.png';

// Your OpenWeatherMap API key
const API_KEY = "391fa7134cd19e43ca4a8e51c7f22238"; // Replace with your API key

const WeatherApp = () => {
  const [city, setCity] = useState("London"); // Default city
  const [weather, setWeather] = useState(null); // To store weather data
  const [error, setError] = useState(null); // To store errors
  const [isMobile, setIsMobile] = useState(false);

// adjust to mobile design
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to fetch weather data
  const fetchWeather = async (city) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: city,            // City name
          appid: API_KEY,     // Your API key
          units: "metric",    // Optional: Use "metric" for Celsius, "imperial" for Fahrenheit
        }
      });

      setWeather(response.data); // Set weather data
      setError(null); // Clear any previous errors

    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
    }
  };


  // Fetch weather when the component mounts or city changes
  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const griddisplay = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",/* Column width adjusts to content */
    gridTemplateRows: "auto auto",   /* Row height adjusts to content */
    gap: "10px"  
  }

  const mobileGridDesign = {
    ...griddisplay,
    gridTemplateRows: "auto auto",
    gridTemplateColumns: "1fr",
  };
  
  return (
      <div className="bg-blue-900 flex flex-col  min-h-screen " >
        <div className="flex justify-start items-center w-2/3">
            <div className="">
              <img src={sunimage} alt="" className="object-cover "  style={{width:'200px'}}/>
            </div>
            <div className="animationtitile text-white lg:flex-1">
                <h1 style={{fontSize:'30px', fontStyle:'italic', fontWeight:'bolder'}} className="">Weather App</h1>
            </div>
            
              {weather &&(
                <div className="p-5 items-center flex-1">
                  <h2 style={{fontSize:'20px',color:'lightblue'}}>{weather.name}</h2> 
                  <p style={{fontSize:'50px',color:'lightblue'}}> {weather.main.temp}°C</p>
              </div> 
              )}  
        </div>
          <div className=" p-4 border-xl rounded-xl gap-3 w-full" style={isMobile ? mobileGridDesign : griddisplay}>
              
                <div className="text-center space-y-3 rounded-xl bg-blue-100 p-5 h-auto">
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)} // Update city on change
                          placeholder="Enter city"
                          style={{fontSize:'30px', borderRadius:'10px',margin:'5px'}}
                          className="w-full"
                        /> <br/>
                        <button onClick={() => fetchWeather(city)} style={{backgroundColor:'lightblue', padding:'5px', borderRadius:'10px',fontSize:'20px'}}> Search City Weather</button>
                  </div>
              <div>
            
                {weather && (
                  <div className="bg-red-100 rounded-xl p-5">
                    <h2 style={{fontSize:'30px'}}>{weather.name}</h2> <img src={sunimage} alt="" className="" />
                    <p>{weather.weather[0].description}</p>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                    <p>Wind Speed: {weather.wind.speed} m/s</p>
                  </div>
                )}
                 
              </div>
              {error && <p className="">{error}</p>} {/* Show error message if any */}
          </div>
  </div>
  
    
  );
};

export default WeatherApp;
