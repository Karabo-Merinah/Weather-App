import searchIcon from '@/assets/Pictures/search.png'

type SearchProp = {
  value: string,
  onSearch: (value: string) => void,
  onSubmit: () => void,
}


export const LocationSearch: React.FC<SearchProp> = ({ value, onSearch, onSubmit }) => {
  const onEnter=(e:React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key === "Enter"){
      onSubmit()
    }
  }
  return (
    <div className='location-search'>
      <input type="text" className='location-search-input' placeholder='Search for location' value={value} onChange={(e) => onSearch(e.target.value)} onKeyDown={onEnter}/>
      <button className='search-button' onClick={onSubmit}>
        <img src={searchIcon} className='search-icon'></img>
      </button>
    </div>
  )
}
