import './App.css'
import { useState, useEffect } from 'react'
import { Text } from './Components/Text/Text'
import { MenuDropdown } from './Components/MenuDropdown/MenuDropdown'
import { LocationSearch } from './Components/LocationSearching/LocationSearch'
import { WindIcon, ThermometerIcon, EyeIcon,MapPin, SunsetIcon, SunriseIcon,CloudSun} from 'lucide-react'
import { WiHumidity } from 'react-icons/wi'
import { WeatherDisplay } from './Components/WeatherDisplay/WeatherDisplay'
import { SearchWeather,emptyWeatherData } from './Components/SearchWeather/SearchWeather'
import { Toggle } from './Components/ThemeToggle/Toggle'
import { TemperatureConversion, unitSymbol, displayTemp } from './Components/MenuDropdown/TemperatureConversion'
import { SidebarLocation } from './Components/SidebarLocation/SidebarLocation'
import { WeatherAlerts } from './Components/WeatherAlert/WeatherAlerts'
import { Notifications } from './Components/Notifications/Notifications'
import {type PlaceSuggestions} from './Components/LocationSearching/LocationSearch'
import { type WeatherData } from './Components/WeatherTypes/WeatherTypes'

function App() {
  const { theme, toggleTheme } = Toggle()
  const { tempUnits, setTempUnits } = TemperatureConversion()
  const [notifications,setNotifications]=useState<{message:string,type:"info"|"warning"}|null>(null)
    const [showSearch,setShowSearch]=useState(false)
useEffect(()=>{
  if(notifications){
    const notificationsTimer=setTimeout(()=>setNotifications(null),3000)
    return ()=> clearTimeout(notificationsTimer)
  }
},[notifications])
useEffect(()=>{
  if(showSearch){
   const input_search=document.getElementById('location-search-input')
   if(input_search){
    input_search.focus()
   }
  }
},[showSearch])

  const handleSubmit = () => {
    searchLocation(searchPlace)
    setSearchPlace("")
  }
  useEffect(() => {
    searchLocation(searchPlace)
    setSearchPlace("")
  }, []);

 const suggestionSelected=(place:PlaceSuggestions)=>{
  searchLocation(place.name)
  setSearchPlace("")
 }
  const [locationDenied,setLocationDenied]=useState(false)
  const [searchPlace, setSearchPlace] = useState("Polokwane")
  const [searchLocation,setSearchLocation]=useState<(place:string)=>void>(()=>()=>{})
  const [data,setData]=useState<WeatherData>(emptyWeatherData)
  const [getLocationWeather,setGetLocationWeather]=useState<()=>void>(()=>()=>{})
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  let timezone:string
  if(data.location.tz_id === "Africa/Johannesburg"){
    timezone="Local Time"
  }
  else{
    timezone=data.location.tz_id
  }
  return (
    <div className='app'>
      <SearchWeather apiKey={API_KEY} setNotification={(message,type)=>setNotifications({message:message,type})} forecastdata={(weatherData)=>setData(weatherData)} setSearchLocation={setSearchLocation} setLocationDenied={setLocationDenied} setGetLocationWeather={setGetLocationWeather}/>
    <WeatherAlerts alerts={data.alerts?.alert||[]}/>
      <Notifications message={notifications?.message || ""} type={notifications?.type}/>
      <div className='app-layout'>
        <div className='sidebar-container'>
          <SidebarLocation currentLocation={data.location.name} selectedLocation={(name) => searchLocation(name)} setNotification={(message,type)=> setNotifications({message,type})}/>
        </div>
      <div className='page-container'>
        {!data.location.name && locationDenied && !showSearch?(
          <div className='location-empty-state'>
            <Text variant={'p'} className='empty-state-text'>
              Could not access your location.Please allow permission.
            </Text>
            <div className='header-location'>
              <div className='empty-buttons'>
            <button onClick={()=>getLocationWeather()} className='empty-state-btn-primary'>
              <MapPin size={14}/>Use My location </button>
              <button onClick={()=>setShowSearch(true)} className='empty-state-btn-secondary'>Search for location</button>
              </div>
              </div>
              </div>
        ):(
          <>
        <div className='header'>
        <div className='content'>
          <CloudSun className='title-icon'/>
          <Text variant='h1'>Weather forecast </Text>
        </div>
        <div className='header-row'>
          <MenuDropdown tempUnits={tempUnits} setTempUnits={setTempUnits} theme={theme} toggleTheme={toggleTheme} />
          <div className='header-search'>
          <LocationSearch value={searchPlace} onSearch={setSearchPlace} onSubmit={handleSubmit} onSelect={(place)=>{setSearchPlace(place.name)
            suggestionSelected(place)}} apiKey={API_KEY}/>
          </div>
          <div className='header-location'>
          <button onClick={()=>getLocationWeather()} className="location-btn"><MapPin size={14}/>My Location</button>
          </div>
        </div>
        </div>
        <div className='top'>{data.location.name && data.location.localtime && data.current.condition.icon ? (
       <>
    <div className='location'>
      <Text variant={'h2'}>{data.location.name}</Text>
    </div>
    <Text variant={'h3'}>{new Date(data.location.localtime).toLocaleDateString(undefined, { month: "short", day: "numeric" })},{data.location.localtime.substring(10)} {timezone}</Text>
    <img className='weather-icon' src={data.current.condition.icon} alt={data.current.condition.text || 'weather icon'} />
     </>
      ) : (
     <Text variant={'p'} className='top-loading'>Loading data...</Text>
         )}
          <Text variant={'h3'} className='temperature'>{displayTemp(tempUnits, data.current.temp_c, data.current.temp_f)}{unitSymbol(tempUnits)}</Text>
          <Text variant={'p'} className='description'>{data.current.condition.text}</Text>
          <Text variant={'p'} className='low-high'>
            H:{displayTemp(tempUnits, data.forecast.forecastday[0].day.maxtemp_c, data.forecast.forecastday[0].day.maxtemp_f)} {unitSymbol(tempUnits)} | L:{displayTemp(tempUnits, data.forecast.forecastday[0].day.mintemp_c, data.forecast.forecastday[0].day.mintemp_f)}{unitSymbol(tempUnits)}
          </Text>
        </div>
        <WeatherDisplay dailyData={data.forecast.forecastday} tempUnits={tempUnits} />
        <div className='bottom'>
          <div className='bottom-title'>
            <Text variant={'h3'} className='condition-title'>Weather Conditions</Text>
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
                <SunriseIcon className='card-icon' />
                <Text variant={'h3'} className='card-label'>Sunrise</Text>
              </div>
              <Text variant={'p'} className='card-value'>{data.forecast.forecastday[0].astro.sunrise}</Text>
            </div>
            <div className='card'>
              <div className='card-header'>
                <SunsetIcon className='card-icon' />
                <Text variant={'h3'} className='card-label'>Sunset</Text>
              </div>
              <Text variant={'h3'} className='card-value'>{data.forecast.forecastday[0].astro.sunset}</Text>
            </div>
            </div>
            </div>
            </div>
      </>
        )}
        </div>
    </div>
    </div>
  )
}

export default App