# 🌤️ Weather App

A responsive React weather dashboard that lets users search for cities, use their current location, and view live weather details with a polished glassmorphism-style UI.

## 🚀 Live Demo

https://weather-app-jbvl.onrender.com

## ✨ Features

- Search for any city using OpenWeatherMap geocoding data
- Use the browser's geolocation to fetch the weather for your current area
- Display real-time weather details such as:
  - current temperature
  - feels-like temperature
  - humidity
  - pressure
  - visibility
  - wind speed and direction
  - local date and time for the selected city
- Toggle between Celsius and Fahrenheit
- Dynamic weather background images based on the current condition
- Auto-suggest city results while typing
- Friendly error states for invalid searches or blocked geolocation access
- Fully responsive layout for desktop and mobile screens

## 🧩 Tech Stack

- React 19
- Vite
- JavaScript
- OpenWeatherMap API
- Material UI Icons
- Tailwind CSS utility classes
- ESLint

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Add your OpenWeatherMap API key

Create a `.env` file in the project root and add:

```bash
VITE_WEATHER_API_KEY=your_api_key_here
```

You can get a free API key from: https://openweathermap.org/api

### 3. Start the app

```bash
npm run dev
```

Then open the local URL shown in the terminal, usually:

```bash
http://localhost:5173
```

## 📁 Project Structure

```bash
src/
├── App.jsx               # App entry point
├── WeatherApp.jsx        # Main weather dashboard layout
├── SearchBox.jsx         # City search, suggestions, geolocation logic
├── InfoBox.jsx           # Weather card UI and data display
├── weatherBackgrounds.jsx# Weather-related background image URLs
├── App.css               # App styling
├── index.css             # Global styles
├── main.jsx              # React root bootstrap
└── assets/               # Static assets if added later
```

## 🔧 Available Scripts

```bash
npm run dev     # start the development server
npm run build   # create a production build
npm run preview # preview the production build locally
npm run lint    # run ESLint checks
```

## 🌍 API Usage

The project uses OpenWeatherMap endpoints for both location search and weather details:

- Geocoding lookup: `https://api.openweathermap.org/geo/1.0/direct`
- Reverse geocoding: `https://api.openweathermap.org/geo/1.0/reverse`
- Weather data: `https://api.openweathermap.org/data/2.5/weather`

The app requests data in metric units and converts the result for display in Celsius or Fahrenheit.

## 🎨 UI Highlights

- Glassmorphism panels and blurred overlays
- Dynamic backgrounds that change with weather conditions such as clear, cloud, rain, snow, and fog
- Temperature unit switcher for °C and °F
- City suggestion dropdown while typing
- Weather condition-specific icons and color accents

## 🧠 How It Works

1. The user enters a city name or clicks “Use My Location”.
2. The app fetches matching locations from the OpenWeatherMap geocoding API.
3. The selected city is used to fetch live weather data.
4. The returned data is mapped into a display-friendly structure and rendered in the weather card.
5. The background and icon styling adapt to the current weather condition.

## 🤝 Contributing

Feel free to fork this project, make improvements, and submit a pull request.

## 📝 License

This project is currently set up for personal learning and local development. No formal license file is included in the repository yet.

## 👨‍💻 Author

Tejasvi Rajput
