import axios from 'axios';
import { type WeatherData } from '../WeatherTypes/WeatherTypes';
import { useState ,useEffect} from 'react';
const emptyWeatherData: WeatherData = {
  location: { name: "", localtime: "", country: "" },
  current: {
    temp_c: 0,
    temp_f: 0,
    feelslike_c: 0,
    feelslike_f: 0,
    humidity: 0,
    wind_kph: 0,
    maxtemp_c: 0,
    maxtemp_f: 0,
    mintemp_c: 0,
    mintemp_f: 0,
    condition: { text: "", icon: "", code: 0 }, vis_km: 0, precip_mm: 0
  },
  forecast: {
    forecastday: [{
      date: "",
      day: {
        maxtemp_c: 0, mintemp_c: 0, maxtemp_f: 0, mintemp_f: 0,
        condition: { text: "", icon: "", code: 0 }, uv: 0
      },
      astro: { sunrise: "", sunset: "" },
      hour: [],
    }],
  },
};

export const SearchWeather = (apiKey: string) => {
  const [data, setData] = useState<WeatherData>(emptyWeatherData);
  const [notification,setNotification]=useState("")

  useEffect(()=>{
    if(notification){
      const timer=setTimeout(()=>{
        setNotification("")},3000)
        return ()=> clearTimeout(timer)
      }},[notification])
  const searchLocation = (place: string) => {
    if (!place.trim()) {
      setNotification("Please enter a location.");
      return;
    }
    
    axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${place}&days=3&aqi=no&alerts=yes`)
      .then((response) => {
        setData(response.data);
        console.log(response.data)
      })
      .catch((error) => {
      console.log("Error fetching weather data:", error)
      setNotification("Could not find the location")});
      }

  const getLocationWeather = () => {
    if (!navigator.geolocation) {
      setNotification("Geolocation is not supported by this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {

          const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=3&aqi=no&alerts=yes`
          );
          const locationData = await response.json();
          setData(locationData);
        } catch (error) {
          setNotification("Error fetching location weather data");
        }
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setNotification("Location access denied. Please allow location permissions.");
        } else {
          setNotification("Error getting location: " + error.message);
        }
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 60000 }
    );
  };
  return { data, searchLocation, getLocationWeather,notification};
}

