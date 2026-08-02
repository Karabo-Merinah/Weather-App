import './App.css'
import { use, useState } from 'react';
import {Text} from './Components/Text/Text'
import { ThemeToggle } from './Components/ThemeToggle/ThemeToggle';
import { MenuDropdown } from './Components/MenuDropdown/MenuDropdown';
import { LocationSearch } from './Components/LocationSearching/LocationSearch';
import axios from 'axios'
import location from '@/assets/Pictures/location.png'
import {Sun,CloudyIcon,Sunset,CloudSunRainIcon,CloudSun,Sunrise,Cloud,WindIcon,CloudRainIcon,ThermometerIcon} from 'lucide-react'
import humidity from '@/assets/Pictures/humidity.png'

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
  searchLocation();
};
  const [searchPlace,setSearchPlace]=useState("")
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
  const [data,setData]=useState({name: "", main: {temp: 0,feels_like: 0,humidity: 0,temp_max:0,temp_min:0},wind: {speed: 0,},weather: [
    {
      main: "",
      description: "",
      icon: "01d",
    },
  ],
  });
  const searchLocation=()=>{
    axios.get( `https://api.openweathermap.org/data/2.5/weather?q=${searchPlace}&appid=${API_KEY}&units=metric`)
    .then((response)=>{
       setData(response.data);
       console.log(response.data);
    })
    .catch((error)=>{
       console.log("Error fetching weather data:", error);
    })
  }

async function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const BASE_URL = "https://api.openweathermap.org/data/2.5";

          const currentResponse = await fetch(
            `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
          );
          const currentData = await currentResponse.json();
          setData(currentData);

          const forecastResponse = await fetch(
            `${BASE_URL}/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
          );
          const forecastData = await forecastResponse.json();
          console.log("Forecast:", forecastData);
        } catch (error) {
          alert("Error fetching location weather data");
        }
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          alert("Location access denied. Please allow location permissions.");
        } else {
          alert("Error getting location: " + error.message);
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 60000,
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

  return (
    <div className='app' id={theme}>
       <div className='page-container'>
      <div className='content'>
     <Text variant='h1'>Weather forecast </Text>
     </div>
    <div className='header-row'>
  <MenuDropdown tempUnits={tempUnits} setTempUnits={setTempUnits} theme={theme} toggleTheme={toggleTheme}/>
  <LocationSearch value={searchPlace} onSearch={setSearchPlace} onSubmit={handleSubmit} />
   <button onClick={getLocation} className="location-btn">Use My Location
  </button>
</div>

      <div className='top'>
      <div className='location'>
      <Text variant={'h2'}>{data.name}</Text>
      </div>
      <div className='current-weather'>
      <img className='weather-icon' src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`} alt={'weather icon'}/>
      <Text variant={'h3'} className='temperature'>{convertTemp(data.main.temp)}{unitSymbol()}</Text>
      </div>
      <div className='description'>
        <Text variant={'p'} style={{fontWeight:'bold',fontSize:20}}>{data.weather[0].description}</Text>
      </div>
       <div className='low-high'>
        <div className='card-top'>
        <Text variant={'h3'} className='card-label'>Low: </Text>
        <Text variant={'span'} className='card-value'> {convertTemp(data.main.temp_min)} {unitSymbol()}</Text>
        </div>
        <div className='card-top'>
        <Text variant={'h3'} className='card-label'>High:</Text>
        <Text variant={'span'} className='card-value'>{convertTemp(data.main.temp_max)} {unitSymbol()}</Text>
        </div>
        </div>
      </div>
     <div className='bottom'>
  <div className='card'>
    <Text variant={'p'} className='card-label'>Feels Like</Text>
    <Text variant={'span'}>
      <ThermometerIcon/>
    </Text>
    <Text variant={'p'} className='card-value'>{convertTemp(data.main.feels_like)}{unitSymbol()}</Text>
  </div>
  <div className='card'>
    <Text variant={'p'} className='card-label'>Humidity</Text>
    <Text variant={'span'}>
    <img src={humidity} className='humidity-img'/>
    </Text>
    <Text variant={'p'} className='card-value'>{data.main.humidity}%</Text>
  </div>
  <div className='card'>
    <Text variant={'p'} className='card-label'>Wind Speed</Text>
    <Text variant={'span'}>
      <WindIcon/>
      </Text>
    <Text variant={'p'} className='card-value'>{data.wind.speed} km/h</Text>
  </div>
</div>
     </div>
     </div>
  )
  
}

export default App