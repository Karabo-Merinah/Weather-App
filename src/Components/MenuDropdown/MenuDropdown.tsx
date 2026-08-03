import  { useState } from 'react'
import { Text } from '../Text/Text'
import menu from '@/assets/Pictures/menu.png'
import ReactSwitch from 'react-switch'
import { ThemeToggle } from '../ThemeToggle/ThemeToggle'

type MenuDropdownProps={
    tempUnits:string,
    setTempUnits:(value:string)=>void;
    theme:string,
    toggleTheme:()=>void
}


export const MenuDropdown:React.FC<MenuDropdownProps> = ({tempUnits,setTempUnits,theme,toggleTheme}) => {
    const [isOpen,setIsOpen]=useState(false)
     
     const toggleTemperature=()=>{
          if(tempUnits === "Celsius"){
            setTempUnits("Fahrenheit")
          }
          else{
            setTempUnits("Celsius")
          }
     }
    const togglemenu=()=>{
        if(isOpen){
            setIsOpen(false)
        }
        else{
            setIsOpen(true)
         }
    }
  return (
    <div className='menu-dropdown'>
        <button className='menu-button' onClick={togglemenu}>
           <img src={menu} className='menu-toggle'/>
        </button>

        {isOpen && (
            <div className='menu-section'>
            <Text variant={'p'} className='menu-section-title'>Locations</Text>
            <button className='menu-item'>Add new location</button>
            <Text variant={'p'} className='menu-section-title'>Settings</Text>
            <button className='menu-item'>Push notifications</button>
            <div>
             <Text variant={'h3'} className='menu-section-title'>Temperature units:</Text>
             <ReactSwitch onChange={toggleTemperature} checked={tempUnits === "Celsius"} 
             checkedIcon={
                <div className='icon-style'>°C</div>
             }
             uncheckedIcon={
                <div className='icon-style'>°F</div>
             }
            
             />
            </div>
            <div>
                <Text variant={'h3'} className='menu-section-title'>Theme</Text>
                <ThemeToggle theme={theme} toggleTheme={toggleTheme}/>
                </div>
            </div>
        )}
        
        </div>
  )
}
