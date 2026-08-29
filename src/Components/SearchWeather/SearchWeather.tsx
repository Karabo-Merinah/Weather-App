import axios from 'axios'
import { type WeatherData } from '../WeatherTypes/WeatherTypes'
import {useEffect} from 'react'

const emptyWeatherData: WeatherData = {
  // Default empty weather data structure works as a fallback 
  location: { name: "", localtime: "", country: "" ,tz_id:""},
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
}
type SearchWeatherProps={
  apiKey:string,
  setNotification:(message:string,type:"info"|"warning")=>void,
  forecastdata:(data:WeatherData)=>void,
  setSearchLocation:(searchLocation:(place:string)=>void)=>void,
  setLocationDenied:(denied:boolean)=>void,
  setGetLocationWeather:(getLocationWeather:()=>void)=>void
}
// Search weather by city/place name
export const SearchWeather:React.FC<SearchWeatherProps> = ({apiKey,setNotification,forecastdata,setSearchLocation,setLocationDenied,setGetLocationWeather}) => {
  const searchLocation = (place: string) => {
    if (!place.trim()) {
      setNotification("Please enter a location.","warning")
      return
    }
    axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${place}&days=3&aqi=no&alerts=yes`)
      .then((response) => {
        forecastdata(response.data)
      
      })
      .catch(() => {
      setNotification("Could not find the location","warning")});
      }
//Get weather using browser geolocation
  const getLocationWeather = () => {
    if (!navigator.geolocation) {
      setNotification("Geolocation is not supported by this browser.","warning")
      return
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {

          const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=3&aqi=no&alerts=yes`
          );
          const locationData = await response.json()
          forecastdata(locationData)
          setLocationDenied(false)
        } catch (error) {
         
        }
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setNotification("Location access denied. Please allow location permissions.","warning")
          setLocationDenied(true) //// Mark location as denied
        } 
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0}
    );
  };
  //On mount: allow other components access  and fetch location weather
  useEffect(()=>{
    setSearchLocation(()=>searchLocation)
    setGetLocationWeather(()=>getLocationWeather)
    getLocationWeather()},[])
  
  return null
}
export {emptyWeatherData}
