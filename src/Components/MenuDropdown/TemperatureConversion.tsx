
import { useState } from 'react'


export const TemperatureConversion = () => {
  const[tempUnits,setTempUnits]=useState("Celsius")
  return {tempUnits,setTempUnits}

}
export const unitSymbol = (tempUnits: string) => {
  if (tempUnits === "Celsius") {
    return "°C"
  } else {
    return "°F"
  }
}

export const displayTemp = (tempUnits: string, celsius: number, fahrenheit: number) => {
  if (tempUnits === "Celsius") {
    return Math.round(celsius);
  } else {
    return Math.round(fahrenheit);
  }
};

