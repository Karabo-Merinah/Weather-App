import './App.css'
import { useState, useEffect } from 'react'
import { Text } from './Components/Text/Text'
import { MenuDropdown } from './Components/MenuDropdown/MenuDropdown'
import { LocationSearch } from './Components/LocationSearching/LocationSearch'
import { WindIcon, ThermometerIcon, EyeIcon, Droplet, Sunrise, SunsetIcon, Sun } from 'lucide-react'
import { WiHumidity } from 'react-icons/wi'
import humidity from '@/assets/Pictures/humidity_mild.png'
import { WeatherDisplay } from './Components/WeatherDisplay/WeatherDisplay'
import { SearchWeather } from './Components/SearchWeather/SearchWeather'
import { Toggle } from './Components/ThemeToggle/Toggle'
import { TemperatureConversion, unitSymbol, displayTemp } from './Components/MenuDropdown/TemperatureConversion'


function App() {
  const { theme, toggleTheme } = Toggle()
  const { tempUnits, setTempUnits } = TemperatureConversion()
  const handleSubmit = () => {
    if (searchPlace.trim() === "") {
      console.log("Please enter a location to search for");
      return;
    }
    searchLocation(searchPlace);

  };
  useEffect(() => {
    searchLocation(searchPlace)
  }, []);
  const [searchPlace, setSearchPlace] = useState("Polokwane")


  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const END_POINT = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchPlace}&days=7&aqi=no&alerts=no`;

  const { data, searchLocation, getLocationWeather } = SearchWeather(API_KEY);
  return (
    <div className='app' id={theme}>
      <div className='page-container'>
        <div className='content'>
          <Text variant='h1'>Weather forecast </Text>
        </div>
        <div className='header-row'>
          <MenuDropdown tempUnits={tempUnits} setTempUnits={setTempUnits} theme={theme} toggleTheme={toggleTheme} />
          <LocationSearch value={searchPlace} onSearch={setSearchPlace} onSubmit={handleSubmit} />
          <button onClick={getLocationWeather} className="location-btn">Use My Location
          </button>
        </div>
        <div className='top'>
          <div className='location'>
            <Text variant={'h2'}>{data.location.name}</Text>
          </div>
          <Text variant={'h3'}>{new Date(data.location.localtime).toLocaleDateString(undefined, { month: "short", day: "numeric" })},{data.location.localtime.substring(10)}</Text>
          <img className='weather-icon' src={`https:${data.current.condition.icon}`} alt={data.current.condition.text || 'weather icon'} />
          <Text variant={'h3'} className='temperature'>{displayTemp(tempUnits, data.current.temp_c, data.current.temp_f)}{unitSymbol(tempUnits)}</Text>
          <Text variant={'p'} className='description'>{data.current.condition.text}</Text>
          <Text variant={'p'} className='low-high'>
            H:{displayTemp(tempUnits, data.forecast.forecastday[0].day.maxtemp_c, data.forecast.forecastday[0].day.maxtemp_f)} {unitSymbol(tempUnits)} | L:{displayTemp(tempUnits, data.forecast.forecastday[0].day.mintemp_c, data.forecast.forecastday[0].day.mintemp_f)}{unitSymbol(tempUnits)}
          </Text>
        </div>
        <WeatherDisplay dailyData={data.forecast.forecastday} tempUnits={tempUnits} />
        <div className='bottom'>
          <div className='card-container'>
            <div className='card'>
              <div className='card-header'>
                <ThermometerIcon className='card-icon' />
                <Text variant={'p'} className='card-label'>Feels Like</Text>
              </div>
              <Text variant={'p'} className='card-value'>{displayTemp(tempUnits, data.current.feelslike_c, data.current.feelslike_f)}{unitSymbol(tempUnits)}</Text>
            </div>
            <div className='card'>
              <div className='card-header'>
                <WiHumidity className='card-icon' />
                <Text variant={'p'} className='card-label'>Humidity</Text>
              </div>
              <Text variant={'p'} className='card-value'>{data.current.humidity}%</Text>
            </div>
            <div className='card'>
              <div className='card-header'>
                <WindIcon className='card-icon' />
                <Text variant={'p'} className='card-label'>Wind Speed</Text>
              </div>
              <Text variant={'p'} className='card-value'>{data.current.wind_kph} km/h</Text>
            </div>
            <div className='card'>
              <div className='card-header'>
                <EyeIcon className='card-icon' />
                <Text variant={'h3'} className='card-label'>Visibility</Text>
              </div>
              <Text variant={'p'} className='card-value'>{data.current.vis_km}km</Text>
            </div>
            <div className='card'>
              <div className='card-header'>
                <Droplet className='card-icon' />
                <Text variant={'h3'} className='card-label'>Preception</Text>
              </div>
              <Text variant={'p'} className='card-value'>{data.current.precip_mm} mm</Text>
            </div>
            <div className='card'>
              <div className='card-header'>
                <Sunrise className='card-icon' />
                <Text variant={'h3'} className='card-label'>Sunrise</Text>
              </div>
              <Text variant={'p'} className='card-value'>{data.forecast.forecastday[0].astro.sunrise}</Text>
            </div>
            <div className='card'>
              <div className='card-header'>
                <SunsetIcon className='card-icon' />
                <Text variant={'h3'} className='card-label'>Sunset</Text>
              </div>
              <Text variant={'p'} className='card-value'>{data.forecast.forecastday[0].astro.sunset}</Text>
            </div>
            <div className='card'>
              <div className='card-header'>
                <Sun className='card-icon' />
                <Text variant={'h3'} className='card-label'>UV Index</Text>
              </div>
              <Text variant={'p'} className='card-value'>{data.forecast.forecastday[0].day.uv}</Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App