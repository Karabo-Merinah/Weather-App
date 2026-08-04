import { type HourlyData } from '@/Components/WeatherTypes/WeatherTypes'
import { Text } from '@/Components/Text/Text'
import { unitSymbol,displayTemp } from '../MenuDropdown/TemperatureConversion'
type HourlyProp = {
  hdata: HourlyData[],
  tempUnits:string
}

export const HourlyWeather: React.FC<HourlyProp> = ({ hdata,tempUnits }) => {
   
    const now=new Date();
    const allHours=hdata.filter((hour)=>new Date(hour.time)>=now).slice(0,24)
  return (
    <div className="hour-card">
      <Text variant="h3">Hourly Forecast</Text>
      <div className='hourlydata-list'>
      {allHours.map((hour) => (
        <div key={hour.time} className="hour-item">
          <Text variant="p">{hour.time.substring(10)}</Text>
          <img src={`https:${hour.condition.icon}`} alt={hour.condition.text} />
          <Text variant="p">{displayTemp(tempUnits,hour.temp_c,hour.temp_f)}{unitSymbol(tempUnits)}</Text>
        </div>
      ))}
      </div>
    </div>
  )
}