import { useState } from 'react'
import { type HourlyData, type ForecastData } from '@/Components/WeatherTypes/WeatherTypes'
import { HourlyWeather } from '@/Components/HourlyWeather.tsx/HourlyWeather'
import { DailyForecast } from '@/Components/DailyForecast/DailyForecast'

type WeatherDisplayProps = {
  hourlyData: HourlyData[]
  dailyData: ForecastData[]
}

export const WeatherDisplay:React.FC<WeatherDisplayProps> = ({ hourlyData, dailyData }) => {
  const [activeTab, setActiveTab] = useState<'hourly' | 'daily'|null> (null)
  
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
    activePanel=<HourlyWeather hdata={hourlyData}/>
  }
  if(activeTab === "daily"){
    activePanel=<DailyForecast data={dailyData}/>
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