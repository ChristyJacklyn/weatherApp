

import React, { useState, useEffect } from "react";
import axios from "axios";
import sunimage from '/sun.png';
import rain from './assets/rain.png';
import clouds from './assets/clouds.png';
import sunrain from './assets/sunrain.png';
import graycloud from './assets/graycloud.png';

// Your OpenWeatherMap API key
const API_KEY = "391fa7134cd19e43ca4a8e51c7f22238"; // Replace with your API key

const WeatherApp = () => {
  const [city, setCity] = useState(""); // Default city
  const [weather, setWeather] = useState(null); // To store weather data
  const [error, setError] = useState(null); // To store errors
  const [isMobile, setIsMobile] = useState(false);

  //user's location
  const getuserCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
  
          try {
            // Call a reverse geocoding API to get the city name
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
  
            if (!response.ok) {
              throw new Error("Failed to fetch city name.");
            }
  
            const data = await response.json();
            const cityName = data.city || data.locality || "Unknown location";
  
            // Update the city state
            setCity(cityName);
  
            // Optionally fetch weather data after updating the city
            fetchWeather(latitude, longitude);
          } catch (error) {
            setError("Failed to fetch city name: " + error.message);
          }
        },
        (err) => {
          setError("Error getting location: " + err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };
  

  //fetch data on component mount
  useEffect(() =>{
    getuserCurrentLocation();
  },[])

// adjust to mobile design
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to fetch weather data
 {/* const fetchWeather = async (location) => {
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
  };*/}
  const fetchWeather = async (location) => {
    try {
      let params = {};
      if (typeof location === "string") {
        params = { q: location, appid: API_KEY, units: "metric" };
      } else {
        const { latitude, longitude } = location;
        params = { lat: latitude, lon: longitude, appid: API_KEY, units: "metric" };
      }

      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, { params });

      setWeather(response.data);
      setError(null); // Clear any errors
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
    }
  };

// fetch userlocation on mount
useEffect (() =>{
  getuserCurrentLocation();
}, [])

  // Fetch weather when the component mounts or city changes
  useEffect(() => {
    if (city){
    fetchWeather(city);
    }
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
            <div className="animationtitile text-white text-center p-10">
                  <h1 style={{fontSize:'40px', fontStyle:'italic', fontWeight:'bolder'}} className="">Weather App</h1>
              </div>
        <div className="flex flex-col lg:flex-row justify-center items-center ">
            
            <div className="flex-1 justify-center flex items-center">
              {weather && (
                <img src={
                  weather.weather[0].description === "clear sky" ? sunimage
                    : weather.weather[0].description === "moderate rain" ? sunrain
                    : weather.weather[0].description === "light rain" ? sunrain
                    : weather.weather[0].description === "overcast clouds" ? clouds
                    : weather.weather[0].description === "cloudy" ? clouds 
                    : weather.weather[0].description === "broken clouds" ? clouds
                    : weather.weather[0].description === "smoke" ? graycloud 
                    : weather.weather[0].description === "few clouds" ? clouds 
                    :weather.weather[0].description === "heavy intensity rain" ? rain 
                    : clouds // Default image
                }
                alt={weather.weather[0].description}
                className="object-cover"
                style={{ width: '200px' }}/>
              )}
             {/*} <img src={sunimage} alt="" className="object-cover "  style={{width:'200px'}}/>*/}
            </div>

         
              {weather &&(
                <div className="p-5 items-center flex-1 ">
                      <h2 style={{fontSize:'30px',color:'lightblue'}}>{weather.name}</h2> 
                      <p style={{fontSize:'50px',color:'lightblue'}}> {weather.main.temp}°C</p>
                      <p style={{fontSize:'20px',color:'lightblue'}}>        
                           {weather.weather[0].description === "clear sky" ? ("It's a beautiful sunny day!") 
                              : weather.weather[0].description === "moderate rainn" ? ("Don't forget your umbrella; it's drizzling outside.") 
                              : weather.weather[0].description === "heavy intensity rain" ? ("It's heavy intensity rain. Stay dry!") 
                              : weather.weather[0].description === "snow" ? ("It's snowing! Stay warm!") 
                              : weather.weather[0].description === "smoke" ? ("Quite smokey and hot. Stay hydrated!") 
                              : weather.weather[0].description === "few clouds" ? ("A few cloud with warm temperature!!!") 
                              : 'It is normal weather'
                            }
                      </p>
              
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
                        <button onClick={() => fetchWeather(city)} style={{backgroundColor:'lightblue', padding:'10px', borderRadius:'10px',fontSize:'20px',fontWeight:'bold'}}> Search City Weather</button>
                  </div>
              <div>
            
                {weather && (
                  <div className="bg-red-100 rounded-xl p-5 space-y-3" style={{fontSize:'20px'}}>
                    <h2 style={{fontSize:'30px',fontWeight:'bold'}}>{weather.name}</h2> 
                    <p>{weather.weather[0].description }</p>
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
