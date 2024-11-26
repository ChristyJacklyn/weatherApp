import React from "react";

const Forecast = ({ forecast }) => {

  if (!forecast) return null;

  return (
    <div className="forecast">

      <h3>7-Day Forecast</h3>

      <div className="forecast-grid">

        {forecast.daily.map((day, index) => (
          <div key={index} className="forecast-item">
            <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>

            <p>High: {day.temp.max}°</p>
            
            <p>Low: {day.temp.min}°</p>

            <img
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
