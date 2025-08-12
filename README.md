# 🌤️ Weather App

A modern, responsive weather application built with React that provides real-time weather information for cities around the world. The app features a clean Material-UI design with dynamic background images based on weather conditions.

## ✨ Features

- **Real-time Weather Data**: Get current weather information for any city worldwide
- **Dynamic Background Images**: Background changes based on weather conditions (hot, cold, rainy, cloudy, foggy)
- **Weather Icons**: Visual weather indicators using Material-UI icons
- **Comprehensive Weather Info**:
  - Current temperature
  - Minimum and maximum temperature
  - Humidity levels
  - "Feels like" temperature
  - Weather description
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Error Handling**: User-friendly error messages for invalid city names
- **Modern UI**: Built with Material-UI components for a polished look

## 🚀 Live Demo

[https://weather-app-jbvl.onrender.com]

## 🛠️ Technologies Used

- **React 19.1.0** - Frontend framework
- **Vite** - Build tool and development server
- **Material-UI (MUI)** - UI component library
  - @mui/material
  - @mui/icons-material
  - @emotion/react
  - @emotion/styled
- **OpenWeatherMap API** - Weather data provider
- **CSS3** - Custom styling
- **ESLint** - Code linting

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/weather-app-react.git
   cd weather-app-react
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up API Key**

   - Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
   - Replace the API key in `src/SearchBox.jsx`:

   ```javascript
   const API_KEY = "your_api_key_here";
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 🎯 Usage

1. **Search for a City**: Enter any city name in the search box
2. **Get Weather Info**: Click the "Search" button or press Enter
3. **View Results**: The app will display:
   - City name with weather icon
   - Current temperature
   - Humidity percentage
   - Minimum and maximum temperatures
   - "Feels like" temperature
   - Weather description
   - Dynamic background image based on conditions

## 📁 Project Structure

```
src/
├── App.jsx              # Main app component
├── WeatherApp.jsx       # Weather app container
├── SearchBox.jsx        # Search functionality and API calls
├── InfoBox.jsx          # Weather information display
├── App.css              # Main app styles
├── SearchBox.css        # Search box styles
├── InfoBox.css          # Info box styles
└── main.jsx             # App entry point
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🌍 API Integration

The app uses the OpenWeatherMap API to fetch weather data:

- **Endpoint**: `https://api.openweathermap.org/data/2.5/weather`
- **Parameters**: City name, API key, and metric units
- **Response**: JSON with temperature, humidity, weather description, etc.

## 🎨 Design Features

- **Dynamic Backgrounds**: Background images change based on:

  - Hot weather (>15°C)
  - Cold weather (<15°C)
  - Cloudy conditions (80-90% humidity)
  - Rainy conditions (>90% humidity)
  - Foggy conditions (default)

- **Weather Icons**: Material-UI icons that represent:
  - ☀️ Sunny (hot weather)
  - ❄️ Snowflake (cold weather)
  - ⚡ Thunderstorm (cloudy)
  - 💧 Water drop (rainy)
  - 🌫️ Fog (foggy)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Tejasvi Rajput**

- GitHub: [@tejasvirajput](https://github.com/tejasvirajput)

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for providing weather data
- [Material-UI](https://mui.com/) for the beautiful UI components
- [Unsplash](https://unsplash.com/) for the background images
- [Vite](https://vitejs.dev/) for the fast build tool

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact me directly.

---

⭐ **Star this repository if you found it helpful!**
