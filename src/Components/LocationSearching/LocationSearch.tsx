import searchIcon from '@/assets/Pictures/search.png'
import axios from 'axios'
import { useState } from 'react'

type SearchProp = {
  value: string,
  onSearch: (value: string) => void,
  onSubmit: () => void,
  apiKey:string,
  onSelect:(name:string)=>void
}

type PlaceSuggestions={
  name:string
}

export const LocationSearch: React.FC<SearchProp> = ({ value, onSearch, onSubmit ,apiKey,onSelect}) => {
  const [suggestions,setSuggestions]=useState<string[]>([])

  const showSuggestions=(value:string)=>{
    onSearch(value)
    if(value.trim().length<3){
      setSuggestions([])
      return 
    }
    axios.get(`https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${value}`)
    .then((response)=>{
      const names=response.data.map((place:PlaceSuggestions)=>place.name)
      setSuggestions(names)
    })
  }
  const selectingPlace=(name:string)=>{
    setSuggestions([])
      onSelect(name)
  }
  const onEnter=(e:React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key === "Enter"){
      onSubmit()
    }
  }


  return (
    <div className='location-search'>
      <input type="text" className='location-search-input' placeholder='Search for location' value={value} onChange={(e) => showSuggestions(e.target.value)} onKeyDown={onEnter}/>
      <button className='search-button' onClick={onSubmit}>
        <img src={searchIcon} className='search-icon'></img>
      </button>
      {suggestions.length>0 &&(
        <ul className='suggestions'>
          {suggestions.map((name)=>(
        <li key={name} className='suggested-place' onClick={()=>selectingPlace(name)}>{name}</li>
      ))}
      </ul>
      )}
    </div>
  )
}
