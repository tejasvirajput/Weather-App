import { useEffect, useState } from "react";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import SunnyIcon from "@mui/icons-material/Sunny";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import FoggyIcon from "@mui/icons-material/Foggy";
import AirIcon from "@mui/icons-material/Air";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import { weatherBackgrounds } from "./weatherBackgrounds";
import SpeedIcon from "@mui/icons-material/Speed";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function InfoBox({ info }) {
  const [unit, setUnit] = useState("C");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const convertTemperature = (temp) => {
    if (unit === "C") {
      return Math.round(temp);
    }

    return Math.round((temp * 9) / 5 + 32);
  };

  const getWindDirection = (degree) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(degree / 45) % 8;

    return directions[index];
  };

  const getWeatherEmoji = (condition) => {
    switch (condition?.toLowerCase()) {
      case "clear":
        return "☀️";
      case "clouds":
        return "☁️";
      case "rain":
        return "🌧️";
      case "drizzle":
        return "🌦️";
      case "thunderstorm":
        return "⛈️";
      case "snow":
        return "❄️";
      case "mist":
      case "fog":
      case "haze":
        return "🌫️";
      default:
        return "🌤️";
    }
  };

  const getLocalDateTime = (timezone) => {
    if (timezone == null) return null;

    const utcTime =
      currentTime.getTime() + currentTime.getTimezoneOffset() * 60000;

    const cityTime = new Date(utcTime + timezone * 1000);

    return {
      date: cityTime.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
      time: cityTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
    };
  };

  const localDateTime = getLocalDateTime(info.timezone);

  const weatherCondition = info.condition?.toLowerCase();

  let imageUrl = weatherBackgrounds.clouds;
  let WeatherIcon = FoggyIcon;

  if (weatherCondition === "clear") {
    imageUrl = weatherBackgrounds.clear;
    WeatherIcon = SunnyIcon;
  } else if (weatherCondition === "clouds") {
    imageUrl = weatherBackgrounds.clouds;
    WeatherIcon = FoggyIcon;
  } else if (weatherCondition === "rain" || weatherCondition === "drizzle") {
    imageUrl = weatherBackgrounds.rain;
    WeatherIcon = WaterDropIcon;
  } else if (weatherCondition === "thunderstorm") {
    imageUrl = weatherBackgrounds.rain;
    WeatherIcon = ThunderstormIcon;
  } else if (weatherCondition === "snow") {
    imageUrl = weatherBackgrounds.snow;
    WeatherIcon = AcUnitIcon;
  } else if (
    weatherCondition === "mist" ||
    weatherCondition === "fog" ||
    weatherCondition === "haze"
  ) {
    imageUrl = weatherBackgrounds.fog;
    WeatherIcon = FoggyIcon;
  }

  return (
    <div className="mx-auto mt-4 w-full max-w-4xl">
      <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/95 shadow-2xl shadow-black/10">
        {/* Main Weather Section */}
        <div className="grid md:grid-cols-2">
          {/* Weather Image */}
          <div className="relative h-48 md:h-full md:min-h-[240px]">
            <img
              src={imageUrl}
              alt="Weather"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-white/50 bg-white/90 px-4 py-2.5 shadow-xl backdrop-blur-md">
              <WeatherIcon className="text-blue-600" />
              <span className="font-semibold text-slate-800">
                {info.city}
                {info.state ? `, ${info.state}` : ""}
              </span>
            </div>
          </div>

          {/* Main Weather Information */}
          <div className="relative flex flex-col justify-center p-5 sm:p-6">
            {/* Temperature Unit */}
            <div className="absolute right-6 top-6">
              <div className="inline-flex rounded-full border border-slate-200 bg-slate-100 p-1 shadow-sm">
                <button
                  type="button"
                  onClick={() => setUnit("C")}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${
                    unit === "C"
                      ? "bg-blue-600 text-white shadow"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  °C
                </button>

                <button
                  type="button"
                  onClick={() => setUnit("F")}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${
                    unit === "F"
                      ? "bg-blue-600 text-white shadow"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  °F
                </button>
              </div>
            </div>

            {/* Temperature */}
            <div className="pt-8 text-center md:text-left">
              <p className="text-6xl font-extrabold tracking-tight text-slate-900 sm:text-7xl">
                {convertTemperature(info.temp)}°{unit}
              </p>

              <p className="mt-3 flex items-center justify-center gap-2 text-base font-medium capitalize text-slate-500 md:justify-start">
                <span className="text-2xl">
                  {getWeatherEmoji(info.condition)}
                </span>
                <span>{info.weather}</span>
              </p>

              {localDateTime && (
                <div className="mt-4 text-sm text-slate-400">
                  <p>{localDateTime.date}</p>
                  <p className="mt-1 font-semibold text-slate-500">
                    {localDateTime.time}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Weather Details */}
        <div className="border-t border-slate-100 bg-slate-50/70 p-4 sm:p-5">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {/* Feels Like */}
            <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center justify-center gap-2">
                <ThermostatIcon className="text-orange-500" fontSize="small" />
                <p className="text-sm text-slate-500">Feels Like</p>
              </div>

              <p className="mt-2 text-lg font-bold text-slate-900">
                {convertTemperature(info.feelsLike)}°{unit}
              </p>
            </div>

            {/* Humidity */}
            <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center justify-center gap-2">
                <WaterDropIcon className="text-blue-500" fontSize="small" />
                <p className="text-sm text-slate-500">Humidity</p>
              </div>

              <p className="mt-2 text-lg font-bold text-slate-900">
                {info.humidity}%
              </p>
            </div>

            {/* Pressure */}
            <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center justify-center gap-2">
                <SpeedIcon className="text-purple-500" fontSize="small" />
                <p className="text-sm text-slate-500">Pressure</p>
              </div>

              <p className="mt-2 text-lg font-bold text-slate-900">
                {info.pressure} hPa
              </p>
            </div>

            {/* Visibility */}
            <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center justify-center gap-2">
                <VisibilityIcon className="text-green-500" fontSize="small" />
                <p className="text-sm text-slate-500">Visibility</p>
              </div>

              <p className="mt-2 text-lg font-bold text-slate-900">
                {(info.visibility / 1000).toFixed(1)} km
              </p>
            </div>
          </div>

          {/* Wind */}
          <div className="mt-3 rounded-2xl border border-slate-100 bg-white p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center justify-center gap-2">
              <AirIcon className="text-blue-600" fontSize="small" />
              <p className="text-sm text-slate-500">Wind</p>
            </div>

            <div className="mt-1 flex items-center justify-center gap-3">
              <p className="text-lg font-bold text-slate-900">
                {(info.windSpeed * 3.6).toFixed(1)} km/h
              </p>

              <span className="text-sm text-slate-500">
                {info.windDegree != null
                  ? `${getWindDirection(info.windDegree)} (${info.windDegree}°)`
                  : "Direction unavailable"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
