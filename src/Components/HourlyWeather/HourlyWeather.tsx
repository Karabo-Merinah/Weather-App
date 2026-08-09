import { type HourlyData } from '@/Components/WeatherTypes/WeatherTypes'
import { Text } from '@/Components/Text/Text'
import { unitSymbol, displayTemp } from '../MenuDropdown/TemperatureConversion'
type HourlyProp = {
  hdata: HourlyData[],
  tempUnits: string
}

export const HourlyWeather: React.FC<HourlyProp> = ({ hdata, tempUnits }) => {

  const now = new Date()
  const isCurrentTime=(time:Date)=>{
    return time.getDate()===now.getDate()&& time.getHours() === now.getHours()
  }
  const allHours=hdata.filter((hour)=>{
  const time=new Date(hour.time)
  if(time.getDate() === now.getDate()){
    return time.getHours()>=now.getHours()
  }
  else{
    return time>now
  }}).slice(0,24)
  return (
    <div className="hour-card">
      <div className='hourlydata-list'>
        {allHours.map((hour) => {
          const time=new Date(hour.time)
          let timeLabel=hour.time.substring(10)
          if(isCurrentTime(time)){
           timeLabel="Now"
          }
          else{
            timeLabel
          }
          return(
          <div key={hour.time} className="hour-item">
            <Text variant="p">{timeLabel}</Text>
            <img src={hour.condition.icon} alt={hour.condition.text} />
            <Text variant="p">{displayTemp(tempUnits, hour.temp_c, hour.temp_f)}{unitSymbol(tempUnits)}</Text>
          </div>
          )
         })}
      </div>
    </div>
  )
}