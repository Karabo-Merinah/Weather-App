import { useState, useEffect } from 'react'
import axios from 'axios'
import { Text } from '@/Components/Text/Text'
import { Plus } from 'lucide-react'
import { type LocationWeather } from '../WeatherTypes/WeatherTypes'

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

  const findWeather= (name: string) => {
    for (let i = 0; i < locationsWeather.length; i++) {
      if (locationsWeather[i].name === name) {
        return locationsWeather[i].forecast
      }
    }
    return null
  }
useEffect(() => {
  for (let i = 0; i < savedLocation.length; i++) {
    const place = savedLocation[i]
    const alreadyHasWeather = findWeather(place)

    if (!alreadyHasWeather) {
      axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${place}&days=7&aqi=no&alerts=yes`)
        .then((response) => {
          setLocationsWeather(prev => {
            const updated = [...prev, { name: place, forecast: response.data.forecast.forecastday }]
            return updated
          })
        })
        .catch((error) => console.log("Error fetching saved location weather:", error))
    }
  }
}, [savedLocation])


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
          <Text variant="p" style={{color:'grey'}}>No saved locations yet.</Text>
          {currentLocation && !dismissed && (
            <div className='emptystate-actions'>
              <button className="add-location" onClick={addLocation}>
                 Add location
              </button>
            </div>
          )}
        </div>
      ): (
        <>
          <div className="locations-list">
            {savedLocation.map((location) => {
              const forecast = findWeather(location)
              return (
                <div key={location} className="location-item">
                  <div className='location-header'>
                  <button className='location-name' onClick={() => selectedLocation(location)}>{location}</button>
                  <button className='remove-btn'onClick={() => removeLocation(location)}>X</button>
                  </div>
                  {forecast && forecast.length > 0 ?(
                    <>
                    <div className='add-location'>
                      <div className='location-condition'>
                      <button className='location-name' onClick={() => selectedLocation(location)}> 
                      <Text variant={'p'} style={{fontWeight:'bold'}}>{location}</Text>
                      </button>
                      <Text variant={'p'} style={{fontWeight:'light'}}>{forecast[0].day.condition.text}</Text>
                      </div>
                      <div className='min-max'>
                         <Text variant={'p'}>{Math.round(forecast[0].hour[0].temp_c)}</Text>
                      <Text variant={'p'}>H:{Math.round(forecast[0].day.maxtemp_c)}  L:{Math.round(forecast[0].day.mintemp_c)}</Text>
                      
                      </div>
                      
                    </div>
                    </>
                  ):(<Text variant={'p'}>Loading ...</Text>)}
                  
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