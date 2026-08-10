import searchIcon from '@/assets/Pictures/search.png'
import { useEffect, useState } from 'react'
import axios from 'axios'

type SearchProp = {
  value: string,
  onSearch: (value: string) => void,
  onSubmit: () => void,
}


export const LocationSearch: React.FC<SearchProp> = ({ value, onSearch, onSubmit }) => {
  const API_KEY=import.meta.env.VITE_WEATHER_API_KEY
  const [suggestion,setSuggestion]=useState([])
  const onEnter=(e:React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key === "Enter"){
      onSubmit()
    }
  }
  useEffect(()=>{
    if(value.length<3){
      setSuggestion([])
      return 
    }
    axios.get(`https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${value}`)
    .then((response)=>{
    setSuggestion(response.data)
    })},[value])

  return (
    <div className='location-search'>
      <input type="text" className='location-search-input' placeholder='Search for location' value={value} onChange={(e) => onSearch(e.target.value)} onKeyDown={onEnter}/>
      <button className='search-button' onClick={onSubmit}>
        <img src={searchIcon} className='search-icon'></img>
      </button>
    </div>
  )
}
