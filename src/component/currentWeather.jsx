//Displays the current weather information.

import React from "react";


const CurrentWeather = ({ weather }) => {

    if (!weather) return null;


    //destructuring of the weather prop 
  
    const { name, main, weather: details, wind } = weather;
  
    return (
      <div className="current-weather">
        <h2>{name}</h2>
        <p>{details[0].description}</p>
        <p>Temperature: {main.temp}°</p>
        <p>Humidity: {main.humidity}%</p>
        <p>Wind: {wind.speed} m/s</p>
      </div>
    );
  };

  export default CurrentWeather;
  