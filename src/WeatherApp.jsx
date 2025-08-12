import { useState } from "react";
import InfoBox from "./InfoBox";
import SearchBox from "./SearchBox";

export default function WeatherApp() {
  let [weatherInfo, setWeatherInfo] = useState({
    city: "Delhi",
    feelslike: 35.29,
    humidity: 65,
    temp: 30.63,
    tempMax: 30.63,
    tempMin: 30.63,
    weather: "scattered clouds",
  });

  let updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };

  return (
    <div style={{ textAlign: "center" }} className="weather-app-wrapper">
      <h1>Weather App By Tejasvi Rajput</h1>
      <SearchBox updateInfo={updateInfo} />
      <InfoBox info={weatherInfo} />
    </div>
  );
}
