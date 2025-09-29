import { useEffect, useState } from 'react'
import './App.css'
import { getWeatherData } from './api/weather'
import WeatherVariableCard from './components/WeatherVariableCard'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from 'recharts';

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
  const currentDateandHour = now.toISOString().split(':')[0]
  
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

  const getCurrentHourIndex: () => number = () => {
    return weatherData?.hourly.time.findIndex(time => time.startsWith(currentDateandHour)) ?? -1
  }

  const forecast24h = () => {
    if (!weatherData) return [];
    const startIndex = getCurrentHourIndex();
    const endIndex = Math.min(startIndex + 24, weatherData.hourly.time.length);
    const forecast = [];
    for (let i = startIndex; i < endIndex; i++) {
      forecast.push({
        hour: weatherData.hourly.time[i].split('T')[1].slice(0, 5), // Extract time in HH:MM format
        temperature: weatherData.hourly.temperature_2m[i],
        precipitation_probability: weatherData.hourly.precipitation_probability[i],
        precipitation: weatherData.hourly.precipitation[i],
      });
    }
    return forecast;
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-slate-50">
        <div className="w-full max-w-6xl px-4">
          {/* Grid for first row of cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            <WeatherVariableCard weatherVariable={{
              label: "Location",
              value: "Melbourne, Australia"
            }} />
            <WeatherVariableCard weatherVariable={{
              label: "Date",
              value: todayDate
            }} />
            <WeatherVariableCard weatherVariable={{
              label: "Time",
              value: currentTime
            }} />
          </div>
          
          {/* Second row — centered single card + other info */}
          <div className="mt-6 flex flex-col items-center">
            <WeatherVariableCard weatherVariable={{
              label: "Max UV Index",
              value: weatherData?.daily.uv_index_max[getTodayIndex()] ?? null
            }} />
            <h3 className="mt-4 text-slate-700">
              Sun rise: {weatherData?.daily.sunrise[getTodayIndex()]?.split('T')[1]}
            </h3>
            <h3 className="text-slate-700">
              Sun set: {weatherData?.daily.sunset[getTodayIndex()]?.split('T')[1]}
            </h3>
            <LineChart width={800} height={300} data={forecast24h()}>
              <CartesianGrid />
              <Line dataKey="temperature" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Legend />
              <Tooltip />
            </LineChart>

            
          </div>
        </div>
      </div>
    </>
  )
}

export default App
