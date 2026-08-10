import { useState, useEffect } from 'react'
import axios from 'axios'
import { Text } from '@/Components/Text/Text'
import { Plus, MoreVertical } from 'lucide-react'
import { type LocationWeather } from '../WeatherTypes/WeatherTypes'
import { IoTrashBin } from 'react-icons/io5'
type SidebarLocationProps = {
  currentLocation: string,
  selectedLocation: (name: string) => void,
}

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

export const SidebarLocation: React.FC<SidebarLocationProps> = ({ currentLocation, selectedLocation }) => {
  const [savedLocation, setSavedLocation] = useState<string[]>(() => {
    const stored = localStorage.getItem('savedLocation')
    if (stored) {
      return JSON.parse(stored)
    }
    return []
  })
  const [dismissed, setDismissed] = useState(false)
  const [locationsWeather, setLocationsWeather] = useState<LocationWeather[]>([])
  const [isMenuOpen, setIsMenuOpen] = useState<string | null>(null)

  function manageSavedMenu(e: React.MouseEvent, location: string) {
    e.stopPropagation()
    if (isMenuOpen === location) {
      setIsMenuOpen(null)
    }
    else {
      setIsMenuOpen(location)
    }
  }
  function manageSavedMenuDelete(e: React.MouseEvent, location: string) {
    e.stopPropagation()
    removeLocation(location)
    setIsMenuOpen(null)
  }

  const findLocationData=(name:string)=>{
    return locationsWeather.find((loc)=> loc.name === name)
  }
  const loadLocationWeather=(place:string)=>{
    if(!navigator.onLine){
      const cachedData=localStorage.getItem(`forecast ${place}`)
      if(cachedData){
        const convertData=JSON.parse(cachedData)
        setLocationsWeather(prev=> [...prev,{name:place,forecast:convertData.forecast,updateTime:convertData.updateTime}])
      }
      return
    }
    axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${place}&days=7&aqi=no&alerts=yes`)
          .then((response) => {
            const forecast = response.data.forecast.forecastday
            const updateTime = new Date().toISOString()
            setLocationsWeather(prev => [...prev, { name: place, forecast: response.data.forecast.forecastday, updateTime }])
            localStorage.setItem(`forecast ${place}`, JSON.stringify({ forecast, updateTime }))
          })
          .catch((error) => console.log("Error fetching saved location weather:", error))
      }
      useEffect(()=>{
        savedLocation.forEach((place)=>{
          const alreadyHasWeather=findLocationData(place)
          if(!alreadyHasWeather){
            loadLocationWeather(place)
          }
        })
      },[savedLocation])
  const addLocation = () => {
    if (currentLocation.trim().length === 0) return
    if (savedLocation.indexOf(currentLocation) !== -1) return
    const updated = savedLocation.slice()
    updated.push(currentLocation)
    setSavedLocation(updated)

    localStorage.setItem('savedLocation', JSON.stringify(updated))
    setDismissed(false)
  }
  const removeLocation = (name: string) => {
    const updated: string[] = []
    for (let i = 0; i < savedLocation.length; i++) {
      if (savedLocation[i] !== name) {
        updated.push(savedLocation[i])
      }
    }
    setSavedLocation(updated)
    localStorage.setItem('savedLocation', JSON.stringify(updated))

    const updatedWeather: LocationWeather[] = []
    for (let i = 0; i < locationsWeather.length; i++) {
      if (locationsWeather[i].name !== name) {
        updatedWeather.push(locationsWeather[i])
      }
    }
    setLocationsWeather(updatedWeather)
  }
  return (
    <div className='sidebar'>
      <Text variant={'h3'} className='title'>Saved Locations</Text>
      {savedLocation.length === 0 ? (
        <div className="empty-state">
          <Text variant="p" style={{ color: 'grey' }}>No saved locations yet.</Text>
          {currentLocation && !dismissed && (
            <div className='emptystate-actions'>
              <button className="add-location" onClick={addLocation}>
                Add location
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
        {!navigator.onLine &&(
         <div className='offline'>
          <Text variant={'p'}>Last Updated at {new Date(findLocationData(savedLocation[0])?.updateTime ?? "").toLocaleString()}</Text>
         </div>
        )}
          <div className="locations-list">
            {savedLocation.map((location) => {
              const locationData = findLocationData(location)
              const forecast=locationData?.forecast
              return (
                <div key={location} className='location-card' onClick={() => selectedLocation(location)}>
                  {forecast && forecast.length > 0 ? (
                    <div className='card-content'>
                      <Text variant={'p'} style={{ fontWeight: 'bold' }}>{location}</Text>
                      <Text variant={'p'}>{Math.round(forecast[0].day.maxtemp_c)}°</Text>
                      <img src={forecast[0].day.condition.icon} className='weather-img'></img>
                    </div>
                  ) : (<Text variant={'p'}>Loading ...</Text>)}
                  <button className='menu-btn' onClick={(e) => manageSavedMenu(e, location)}><MoreVertical size={16} /></button>
                  {isMenuOpen === location && (
                    <div className='delete-dropdown'>
                      <button className='delete' onClick={(e) => manageSavedMenuDelete(e, location)}><IoTrashBin /></button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          {currentLocation && !dismissed && savedLocation.indexOf(currentLocation) === -1 && (
            <div className='add-actions'>
              <button className='add-location' onClick={addLocation}><Plus size={14} /> {currentLocation}</button>
              <button className="dismiss-location" onClick={() => setDismissed(true)}>Dismiss</button>
            </div>
          )}
        </>
      )}
    </div>
  )
}