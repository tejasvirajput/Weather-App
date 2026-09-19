import { useState } from "react";
import InfoBox from "./InfoBox";
import SearchBox from "./SearchBox";
import { weatherBackgrounds } from "./weatherBackgrounds";

export default function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState(null);

  const updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };

  const getBackground = () => {
    if (!weatherInfo?.condition) {
      return weatherBackgrounds.default;
    }

    const condition = weatherInfo.condition.toLowerCase();

    if (condition === "clear") {
      return weatherBackgrounds.clear;
    }

    if (condition === "clouds") {
      return weatherBackgrounds.clouds;
    }

    if (condition === "rain" || condition === "drizzle") {
      return weatherBackgrounds.rain;
    }

    if (condition === "thunderstorm") {
      return weatherBackgrounds.rain;
    }

    if (condition === "snow") {
      return weatherBackgrounds.snow;
    }

    if (condition === "mist" || condition === "fog" || condition === "haze") {
      return weatherBackgrounds.fog;
    }

    return weatherBackgrounds.default;
  };

  const backgroundImage = getBackground();

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Dynamic Background */}
      <div
        className="weather-background absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("${backgroundImage}")`,
        }}
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-slate-950/25" />

      {/* Main Content */}
      <div className="relative z-10 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/30 bg-white/15 px-5 py-5 shadow-2xl shadow-black/10 backdrop-blur-xl sm:px-8 sm:py-5">
          {/* Header */}
          <div className="mb-6 text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.25em] text-blue-600">
              Weather Dashboard
            </p>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-5xl">
              Check the weather
            </h1>

            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
              Search for a city and get the latest weather conditions at a
              glance.
            </p>
          </div>

          {/* Search */}
          <SearchBox updateInfo={updateInfo} />

          {/* Weather Card */}
          {weatherInfo ? (
            <InfoBox info={weatherInfo} />
          ) : (
            <div className="mx-auto mt-6 max-w-lg rounded-3xl border border-white/40 bg-white/20 px-6 py-10 text-center shadow-xl shadow-black/5 backdrop-blur-xl sm:px-10">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/40 text-5xl shadow-lg backdrop-blur-sm">
                🌤️
              </div>

              <h2 className="mt-6 text-2xl font-bold tracking-tight text-slate-900">
                Ready to check the weather?
              </h2>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-600">
                Search for a city above or use your location to get the latest
                weather information.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
