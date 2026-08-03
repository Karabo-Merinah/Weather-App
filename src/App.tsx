import './App.css'
import { useState ,useEffect} from 'react';
import {Text} from './Components/Text/Text'
import { MenuDropdown } from './Components/MenuDropdown/MenuDropdown';
import { LocationSearch } from './Components/LocationSearching/LocationSearch';
import {WindIcon,ThermometerIcon} from 'lucide-react'
import humidity from '@/assets/Pictures/humidity_mild.png'
import { WeatherDisplay } from './Components/WeatherDisplay/WeatherDisplay'
import { SearchWeather } from './Components/SearchWeather/SearchWeather';



function App() {
const [theme, setTheme] = useState(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    return savedTheme;
  } else {
    return "light";
  }
});

const toggleTheme = () => {
  let newTheme;
  if (theme === "light") {
    newTheme = "dark";
  } else {
    newTheme = "light";
  }
  setTheme(newTheme);
  localStorage.setItem("theme", newTheme);
}
const handleSubmit = () => {
  if (searchPlace.trim() === "") {
    console.log("Please enter a location to search for");
    return;
  }
  searchLocation(searchPlace);
};
useEffect(()=>{
  searchLocation(searchPlace)
})
  const [searchPlace,setSearchPlace]=useState("Polokwane")
  const [tempUnits, setTempUnits] = useState("Celsius");
  const unitSymbol =()=>{
  if(tempUnits === "Celsius"){
    return "°C"
  }
  else{
    return "°F"
  }
 } 
  const convertTemp = (celsius:number) => {
  if (tempUnits === "Celsius") {
    return Math.round(celsius);
  } else {
    return Math.round((celsius * 9/5) + 32);
  }
};

  const API_KEY=import.meta.env.VITE_WEATHER_API_KEY;
  const END_POINT=`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchPlace}&days=7&aqi=no&alerts=no`;
  
  const {data,searchLocation,getLocationWeather}=SearchWeather(API_KEY)

  return (
    <div className='app' id={theme}>
       <div className='page-container'>
      <div className='content'>
     <Text variant='h1'>Weather forecast </Text>
     </div>
    <div className='header-row'>
  <MenuDropdown tempUnits={tempUnits} setTempUnits={setTempUnits} theme={theme} toggleTheme={toggleTheme}/>
  <LocationSearch value={searchPlace} onSearch={setSearchPlace} onSubmit={handleSubmit} />
   <button onClick={getLocationWeather} className="location-btn">Use My Location
  </button>
</div>

      <div className='top'>
      <div className='location'>
      <Text variant={'h2'}>{data.location.name},{data.location.country}</Text>
      </div>
      <Text variant={'h3'}> {data.location.localtime}</Text>
     <img className='weather-icon' src={`https:${data.current.condition.icon}`} alt={data.current.condition.text || 'weather icon'}/>
       <Text variant={'h3'} className='temperature'>{convertTemp(data.current.temp_c)}{unitSymbol()}</Text>
        <Text variant={'p'} className='description'>{data.current.condition.text}</Text>
        <Text variant={'p'} className='low-high'>
          H:{convertTemp(data.forecast.forecastday[0].day.maxtemp_c)} {unitSymbol()} | L:{convertTemp(data.forecast.forecastday[0].day.mintemp_c)}{unitSymbol()}
        </Text>
        </div>
  
     <div className='bottom'>
  <div className='card'>
    <Text variant={'p'} className='card-label'>Feels Like</Text>
    <Text variant={'span'}>
      <ThermometerIcon/>
    </Text>
    <Text variant={'p'} className='card-value'>{convertTemp(data.current.feelslike_c)}{unitSymbol()}</Text>
  </div>
  <div className='card'>
    <Text variant={'p'} className='card-label'>Humidity</Text>
    <Text variant={'span'}>
    <img src={humidity} className='humidity-img'/>
    </Text>
    <Text variant={'p'} className='card-value'>{data.current.humidity}%</Text>
  </div>
  <div className='card'>
    <Text variant={'p'} className='card-label'>Wind Speed</Text>
    <Text variant={'span'}>
      <WindIcon/>
      </Text>
      <Text variant={'h3'}>Daily forecast{}</Text>
    <Text variant={'p'} className='card-value'>{data.current.wind_kph} km/h</Text>
  </div>
     </div>
     <WeatherDisplay
    hourlyData={data.forecast.forecastday[0].hour}
    dailyData={data.forecast.forecastday}/>
     </div>
     </div>
  )
  
}

export default App