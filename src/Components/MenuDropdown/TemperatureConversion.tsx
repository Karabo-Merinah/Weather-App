import { useState } from 'react'

export const TemperatureConversion = () => {
  const [tempUnits, setTempUnits] = useState("Celsius")
  const unitSymbol=()=>{
    if (tempUnits === "Celsius") {
    return "°C"
  } else {
    return "°F"
  }
  }
  const displayTemp=(celsius:number,fahrenheit:number)=>{
    if (tempUnits === "Celsius") {
    return Math.round(celsius)
  } else {
    return Math.round(fahrenheit)
  }
  }
  return {tempUnits,setTempUnits,unitSymbol,displayTemp}
}



