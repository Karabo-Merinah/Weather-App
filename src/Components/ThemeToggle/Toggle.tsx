import {useEffect, useState} from 'react'

export const Toggle = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme
    } else {
      return "light"
    }
  });
  
 useEffect(()=>{
  document.documentElement.id=theme
 },[theme])

  const toggleTheme = () => {
    let newTheme;
    if (theme === "light") {
      newTheme = "dark"
    } else {
      newTheme = "light"
    }
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }
  return {theme,toggleTheme}
}
