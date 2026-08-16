import { useState } from 'react'
import {  type ForecastData } from '@/Components/WeatherTypes/WeatherTypes'
import { HourlyWeather } from '@/Components/HourlyWeather/HourlyWeather'
import { DailyForecast } from '@/Components/DailyForecast/DailyForecast'

type WeatherDisplayProps = {
  dailyData: ForecastData[],
  tempUnits:string,
  unitSymbol:()=>string,
  displayTemp:(celsius:number,fahrenheit:number)=>number

}

export const WeatherDisplay:React.FC<WeatherDisplayProps> = ({dailyData,tempUnits,unitSymbol,displayTemp }) => {
  const [activeTab, setActiveTab] = useState<'hourly' | 'daily'> ('hourly')
  const today=dailyData[0]?.hour||[]
  const tomorrow=dailyData[1]?.hour||[]
  const hourlyData=today.concat(tomorrow)
  //Defines the styling of the hourly button as the parent styling
  let hourlyButtonClass='hourly-btn'
  //Defines the styling of when a button is clicked 
  if(activeTab === "hourly"){
    hourlyButtonClass="hourly-btn active"
  }
    //Defines the styling of the daily button as the parent styling
  let dailyButtonClass="daily-btn"
    //Defines the styling of when a button is clicked 
  if(activeTab === "daily"){
    dailyButtonClass="daily-btn active"
  }

  let activePanel=null
  if(activeTab === "hourly"){
    activePanel=<HourlyWeather hdata={hourlyData} tempUnits={tempUnits} unitSymbol={unitSymbol} displayTemp={displayTemp}/>
  }
  if(activeTab === "daily"){
    activePanel=<DailyForecast data={dailyData} tempUnits={tempUnits} unitSymbol={unitSymbol} displayTemp={displayTemp}/>
  }
  return (
    <div className='forecast-section'>
      <div className='button-class'>
        <button className={hourlyButtonClass} onClick={()=>{
            if(activeTab === "hourly"){
               setActiveTab("hourly")
            }
            else{
                setActiveTab("hourly")
            }
        } 
       }>Hourly</button>
        <button className={dailyButtonClass} onClick={()=>{
            if(activeTab === "daily"){
               
            }
            else{
                setActiveTab("daily")
            }
        }}>Daily</button>
      </div>
       {activePanel}
      
    </div>
  )
}