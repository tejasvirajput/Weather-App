import { useEffect, useState } from "react";

export default function SearchBox({ updateInfo }) {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingType, setLoadingType] = useState("");

  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const GEO_URL = "https://api.openweathermap.org/geo/1.0/direct";
  const REVERSE_GEO_URL = "https://api.openweathermap.org/geo/1.0/reverse";
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const getDisplayCityName = (location, weatherData) => {
    if (location?.name === "Dehra Dun" || weatherData?.name === "Dehra Dun") {
      return "Dehradun";
    }

    return location?.name || weatherData?.name || "";
  };

  const formatWeatherData = (data, location) => {
    return {
      city: getDisplayCityName(location, data),
      state: location?.state || "",
      temp: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      visibility: data.visibility,
      condition: data.weather[0].main,
      weather: data.weather[0].description,
      windSpeed: data.wind.speed,
      windDegree: data.wind.deg,
      timezone: data.timezone,
    };
  };

  useEffect(() => {
    const searchLocations = async () => {
      const searchQuery = city.trim();

      if (!searchQuery || selectedLocation) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch(
          `${GEO_URL}?q=${encodeURIComponent(searchQuery)}&limit=5&appid=${API_KEY}`,
        );

        if (!response.ok) {
          setSuggestions([]);
          return;
        }

        const locations = await response.json();

        const uniqueLocations = locations.filter(
          (location, index, self) =>
            index ===
            self.findIndex(
              (item) =>
                item.name === location.name &&
                item.state === location.state &&
                item.country === location.country,
            ),
        );

        setSuggestions(uniqueLocations);

        setHighlightedIndex(-1);
      } catch (err) {
        console.error(err);
        setSuggestions([]);
      }
    };

    const timer = setTimeout(searchLocations, 400);

    return () => clearTimeout(timer);
  }, [city, selectedLocation, API_KEY]);

  const getWeatherInfo = async () => {
    let location;

    if (selectedLocation) {
      location = selectedLocation;
    } else {
      const searchQuery = city.trim();

      const geoResponse = await fetch(
        `${GEO_URL}?q=${encodeURIComponent(searchQuery)}&limit=5&appid=${API_KEY}`,
      );

      if (!geoResponse.ok) {
        throw new Error("Location search failed");
      }

      const locations = await geoResponse.json();

      if (!locations.length) {
        throw new Error("City not found");
      }

      location =
        locations.find((item) => item.country === "IN") || locations[0];
    }

    const response = await fetch(
      `${API_URL}?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=metric`,
    );

    if (!response.ok) {
      throw new Error("Weather data could not be fetched");
    }

    const weatherData = await response.json();

    return formatWeatherData(weatherData, location);
  };

  const getLocationWeather = () => {
    if (!navigator.geolocation) {
      setError("Your browser does not support location services.");
      return;
    }

    setLoading(true);
    setLoadingType("location");
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const response = await fetch(
            `${API_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`,
          );

          if (!response.ok) {
            throw new Error("Unable to fetch weather");
          }

          const jsonResponse = await response.json();

          const geoResponse = await fetch(
            `${REVERSE_GEO_URL}?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`,
          );

          const locations = await geoResponse.json();

          const location = locations[0];

          const newInfo = formatWeatherData(jsonResponse, location);

          updateInfo(newInfo);
        } catch (err) {
          console.error(err);
          setError("Unable to fetch weather. Please try again.");
        } finally {
          setLoading(false);
          setLoadingType("");
        }
      },
      (err) => {
        console.error(err);

        if (err.code === 1) {
          setError(
            "Location permission was denied. Please allow access to use this feature.",
          );
        } else if (err.code === 2) {
          setError("Your location could not be determined. Please try again.");
        } else {
          setError("Unable to get your location. Please try again.");
        }

        setLoading(false);
        setLoadingType("");
      },
    );
  };

  const handleChange = (evt) => {
    setCity(evt.target.value);
    setSelectedLocation(null);
    setError("");
  };

  const handleLocationSelect = (location) => {
    const fullLocationName = [location.name, location.state]
      .filter(Boolean)
      .join(", ");

    setCity(fullLocationName);
    setSelectedLocation(location);
    setSuggestions([]);
    setError("");
  };

  const handleKeyDown = async (evt) => {
    if (!suggestions.length) return;

    if (evt.key === "ArrowDown") {
      evt.preventDefault();

      setHighlightedIndex((current) =>
        current < suggestions.length - 1 ? current + 1 : 0,
      );

      return;
    }

    if (evt.key === "ArrowUp") {
      evt.preventDefault();

      setHighlightedIndex((current) =>
        current > 0 ? current - 1 : suggestions.length - 1,
      );

      return;
    }

    if (evt.key === "Enter") {
      evt.preventDefault();

      const index = highlightedIndex >= 0 ? highlightedIndex : 0;
      const location = suggestions[index];

      setSuggestions([]);
      setHighlightedIndex(-1);
      setSelectedLocation(location);

      try {
        setLoading(true);
        setLoadingType("search");
        setError("");

        const response = await fetch(
          `${API_URL}?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=metric`,
        );

        if (!response.ok) {
          throw new Error("Weather data could not be fetched");
        }

        const weatherData = await response.json();

        updateInfo(formatWeatherData(weatherData, location));

        // Keep the search box clean
        setCity("");
      } catch (err) {
        console.error(err);
        setError("Unable to fetch weather. Please try again.");
      } finally {
        setLoading(false);
        setLoadingType("");
      }
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (!city.trim()) return;

    try {
      setLoading(true);
      setLoadingType("search");
      setError("");

      const newInfo = await getWeatherInfo();

      updateInfo(newInfo);
      setCity("");
    } catch (err) {
      console.error(err);
      setError(
        "We couldn't find that city. Please check the spelling and try again.",
      );
    } finally {
      setLoading(false);
      setLoadingType("");
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* Search */}
      <div className="relative mx-auto w-full max-w-2xl">
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-3 sm:flex-row sm:items-center"
        >
          <input
            id="city"
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            required
            className="min-w-0 flex-1 rounded-2xl border border-white/50 bg-white/70 px-5 py-3.5 text-base font-medium text-slate-800 shadow-lg shadow-black/10 backdrop-blur-xl outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-blue-400 focus:bg-white/85 focus:ring-4 focus:ring-blue-400/20"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-blue-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loadingType === "search" ? "Searching..." : "Search"}
          </button>
        </form>

        {suggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-white/20 bg-slate-900/95 shadow-2xl backdrop-blur-xl">
            {suggestions.map((location, index) => (
              <button
                key={`${location.lat}-${location.lon}-${index}`}
                type="button"
                onClick={() => handleLocationSelect(location)}
                className={`flex w-full items-center gap-4 border-b border-white/10 px-5 py-4 text-left transition-colors last:border-b-0 ${
                  highlightedIndex === index
                    ? "bg-white/15"
                    : "hover:bg-white/10"
                }`}
              >
                <img
                  src={`https://flagcdn.com/w40/${location.country.toLowerCase()}.png`}
                  alt={location.country}
                  className="h-6 w-9 rounded-sm object-cover"
                />

                <span className="min-w-0">
                  <span className="block text-base font-semibold text-white">
                    {location.name}
                    {location.state ? `, ${location.state}` : ""}
                  </span>

                  <span className="mt-1 block text-sm text-slate-400">
                    {location.lat.toFixed(2)}, {location.lon.toFixed(2)}
                  </span>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Use My Location */}
      <div className="mt-4 flex justify-center">
        <button
          type="button"
          onClick={getLocationWeather}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/70 bg-white/75 px-5 py-2.5 text-sm font-medium text-blue-600 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          📍
          {loadingType === "location"
            ? "Getting location..."
            : "Use My Location"}
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <p className="mt-3 text-center text-sm text-blue-600">
          {loadingType === "location"
            ? "Getting your location and weather..."
            : "Searching for weather..."}
        </p>
      )}

      {/* Error */}
      {error && (
        <div className="mx-auto mt-4 max-w-2xl rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}
