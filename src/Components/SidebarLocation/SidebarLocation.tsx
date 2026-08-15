import { useState, useEffect } from 'react'
import axios from 'axios'
import { Text } from '@/Components/Text/Text'
import { Plus } from 'lucide-react'
import { type LocationWeather } from '../WeatherTypes/WeatherTypes'
import { IoTrashBin } from 'react-icons/io5'
import { BiInfoSquare } from 'react-icons/bi'
type SidebarLocationProps = {
  currentLocation: string,
  selectedLocation: (name: string) => void,
  setNotification:(message:string,type:"info"| "warning")=>void
}

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

export const SidebarLocation: React.FC<SidebarLocationProps> = ({ currentLocation, selectedLocation,setNotification}) => {
  const [savedLocation, setSavedLocation] = useState<string[]>(() => {
    const stored = localStorage.getItem('savedLocation')
    if (stored) {
      return JSON.parse(stored)
    }
    return []
  })
  const [dismissed, setDismissed] = useState(false)
  const [locationsWeather, setLocationsWeather] = useState<LocationWeather[]>([])
  const [locationToRemove,setLocationToRemove]=useState<string |null>(null)
  function deleteLocation(e:React.MouseEvent,location:string){
    e.stopPropagation()
    setLocationToRemove(location)
  }
  function confirmDeleteLocation(){
    if(locationToRemove){
      removeLocation(locationToRemove)
    }
    setLocationToRemove(null)
  }
  function cancelDelete(){
    setLocationToRemove(null)
  }


  function findLocationData(name:string){
    return locationsWeather.find((loc)=> loc.name === name)
  }
  //Fetches weather for saved locations and cache it
  function loadLocationWeather (place:string){
    if(!navigator.onLine){
      const cachedData=localStorage.getItem(`forecast ${place}`)
      if(cachedData){
        const convertData=JSON.parse(cachedData)
        setLocationsWeather(prev=> [...prev,{name:place,forecast:convertData.forecast,updateTime:convertData.updateTime}])
      }
      return
    }
    axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${place}&days=3&aqi=no&alerts=yes`)
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
  function addLocation  ()  {
    if (currentLocation.trim().length === 0) return
    if (savedLocation.indexOf(currentLocation) !== -1) return
    const updated = savedLocation.slice()
    updated.push(currentLocation)
    setSavedLocation(updated)

    localStorage.setItem('savedLocation', JSON.stringify(updated))
    setDismissed(false)
    setNotification(`${currentLocation} has been added to saved locations`,"info")
  }
  function removeLocation  (name: string)  {
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
    setNotification(`${name} has been removed from saved locations.`,"warning")
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
        {/* Shows offline data (cached) and lets user know when it was last updated */}
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
                      <img src={forecast[0].day.condition.icon} className='weather-img'></img>
                    </div>
                  ) : (<Text variant={'p'}>Loading ...</Text>)}
                  <button className='delete' onClick={(e) => deleteLocation(e, location)}><IoTrashBin size={18} /></button>
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
      {locationToRemove && (
        <div className='confirm-window' onClick={cancelDelete}>
          <div className='confirm-box' onClick={(e)=> e.stopPropagation()}>
            <Text variant={'p'} className='info-icon'><BiInfoSquare/></Text>
            <Text variant={'span'}>Do you want to remove <b>{locationToRemove} </b>from your saved location?</Text>
            <div className='confirm-actions'>
              <button className='confirm-cancel' onClick={cancelDelete}>Cancel</button>
              <button className='confirm-delete' onClick={confirmDeleteLocation}>Delete</button>
            </div>
          </div>
          </div>
      )}
    </div>
  )
}