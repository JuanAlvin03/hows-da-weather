import { useEffect, useState } from 'react'
import './App.css'
import { getWeatherData } from './api/weather'

interface WeatherData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: {
    time: string;
    sunrise: string;
    sunset: string;
    uv_index_max: string;
  };
  daily: {
    time: string[];
    sunrise: string[];
    sunset: string[];
    uv_index_max: number[];
  };
  hourly_units: {
    time: string;
    temperature_2m: string;
    precipitation_probability: string;
    precipitation: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    precipitation_probability: number[];
    precipitation: number[];
  };
}

function App() {
  const [error, setError] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  const now = new Date()
  const todayDate = now.toISOString().split('T')[0]
  const currentTime = now.toISOString().split('T')[1].split('.')[0]
  
  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        const fetchedWeatherData = await getWeatherData()
        setWeatherData(fetchedWeatherData)
      } catch (err) {
        console.log(err)
        setError("Failed to load weather data...")
      }
      finally {
        setLoading(false)
      }
    }
    loadWeatherData()
  }, [])

  const getTodayIndex: () => number = () => {
    return weatherData?.daily.time.findIndex(date => date.startsWith(todayDate)) ?? -1
  }

  return (
    <>
      <h1>Location: Melbourne</h1>
      <h2>Local Time: {currentTime}</h2>
      <h2>Today's Date: {todayDate}</h2>
      <h3>Sun rise: {weatherData?.daily.sunrise[getTodayIndex()]?.split('T')[1]}</h3>
      <h3>Sun set: {weatherData?.daily.sunset[getTodayIndex()]?.split('T')[1]}</h3>
      <h3>Max UV Index: {weatherData?.daily.uv_index_max[getTodayIndex()]}</h3>
    </>
  )
}

export default App
