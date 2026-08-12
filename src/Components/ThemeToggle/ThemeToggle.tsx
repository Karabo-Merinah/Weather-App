import React from 'react'
import light from '@/assets/Pictures/light_mode.png'
import dark from '@/assets/Pictures/moon.png'

type ThemeToggleProps={
    theme:string,
    toggleTheme:()=> void
}


export const ThemeToggle:React.FC<ThemeToggleProps> = ({theme,toggleTheme}) => {
  let icon
  if (theme === "light") {
    icon = <img src={light} alt="Light mode" className="light-icon" />
  } else {
    icon = <img src={dark} alt="Dark mode" className="dark-icon" />
  }
  return (
   <div className='toggle-label'>
    <div className='toggle'>
      <button  id="theme-switch" onClick={toggleTheme}>
       {icon}
      </button>
    </div>
   </div>
  )
}
