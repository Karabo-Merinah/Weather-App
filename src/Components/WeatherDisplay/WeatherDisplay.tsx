import { useState } from 'react'
import {  type ForecastData } from '@/Components/WeatherTypes/WeatherTypes'
import { HourlyWeather } from '@/Components/HourlyWeather/HourlyWeather'
import { DailyForecast } from '@/Components/DailyForecast/DailyForecast'

type WeatherDisplayProps = {
  dailyData: ForecastData[],
  tempUnits:string
}

export const WeatherDisplay:React.FC<WeatherDisplayProps> = ({dailyData,tempUnits }) => {
  const [activeTab, setActiveTab] = useState<'hourly' | 'daily'|null> (null)
  
  const today=dailyData[0]?.hour||[]
  const tomorrow=dailyData[1]?.hour||[]
  const hourlyData=today.concat(tomorrow)


  let hourlyButtonClass='hourly-btn';
  if(activeTab === "hourly"){
    hourlyButtonClass="hourly-btn active"
  }

  let dailyButtonClass="daily-btn";
  if(activeTab === "daily"){
    dailyButtonClass="daily-btn active"
  }

  let activePanel=null;
  if(activeTab === "hourly"){
    activePanel=<HourlyWeather hdata={hourlyData} tempUnits={tempUnits}/>
  }
  if(activeTab === "daily"){
    activePanel=<DailyForecast data={dailyData} tempUnits={tempUnits}/>
  }
  return (
    <div className='forecast-section'>
      <div className='button-class'>
        <button className={hourlyButtonClass} onClick={()=>{
            if(activeTab === "hourly"){
                setActiveTab(null)
            }
            else{
                setActiveTab("hourly")
            }
        } 
       }>Hourly</button>
        <button className={dailyButtonClass} onClick={()=>{
            if(activeTab === "daily"){
                setActiveTab(null)
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