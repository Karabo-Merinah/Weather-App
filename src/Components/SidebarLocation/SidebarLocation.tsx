import { useState } from 'react'
import { Text } from '@/Components/Text/Text'
import { DeleteIcon, Plus } from 'lucide-react'

type SidebarLocationProps = {
  currentLocation: string,
  selectedLocation: (name: string) => void
}


export const SidebarLocation: React.FC<SidebarLocationProps> = ({ currentLocation, selectedLocation }) => {
  const [savedLocation, setSavedLocation] = useState<string[]>(() => {
    const stored = localStorage.getItem('savedLocation')
    if (stored) {
      return JSON.parse(stored)
    }
    return []
  })
  const [dismissed, setDismissed] = useState(false)
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
  }
  return (
    <div className='sidebar'>
      <Text variant={'h3'} className='title'>Saved Locations</Text>
      {savedLocation.length === 0 ? (
        <div className="empty-state">
          <Text variant="p">No saved locations yet.</Text>
          {currentLocation && !dismissed && (
            <div className='emptystate-actions'>
              <button className="add-location" onClick={addLocation}>
                + Add location
              </button>
              <button className='dismiss-location' onClick={() => setDismissed(true)}></button>
            </div>

          )}
        </div>
      ): (
        <>
          <ul className="locations-list">
            {savedLocation.map((location) => (
              <li key={location} className="location-item">
                <button className='location-name' onClick={() => selectedLocation(location)}>{location}</button>
                <button className='remove-btn'
                  onClick={() => removeLocation(location)}><DeleteIcon size={14} /></button>
              </li>
            ))}
          </ul>
          {currentLocation && !dismissed && savedLocation.indexOf(currentLocation) === -1 && (
            <div className='add-actions'>
              <button className='add-location' onClick={addLocation}><Plus size={14} /> {currentLocation}</button>
              <button className="dismiss-location" onClick={() => setDismissed(true)}>
                Dismiss
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
