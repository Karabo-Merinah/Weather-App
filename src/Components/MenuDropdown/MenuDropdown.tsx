import  { useState } from 'react'
import { Text } from '../Text/Text'
import menu from '@/assets/Pictures/menu.png'
export const MenuDropdown = () => {
    const [isOpen,setIsOpen]=useState(false)

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
            <button className='menu-item'>Temperature units</button>
            </div>
        )}
        
        </div>
  )
}
