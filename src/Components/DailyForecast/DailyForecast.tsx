import { type ForecastData } from '@/Components/WeatherTypes/WeatherTypes'
import { Text } from '@/Components/Text/Text'
import { unitSymbol, displayTemp } from '../MenuDropdown/TemperatureConversion'
type DailyProp = {
  data: ForecastData[],
  tempUnits: string
}

export const DailyForecast: React.FC<DailyProp> = ({ data, tempUnits }) => {
  const getWeekDay = (date: string) => {
    const newDate = new Date(date)
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[newDate.getDay()]
  }
  const today=new Date()
  const sameDay=(day:Date)=>{
    return day.getDate()=== today.getDate() && day.getMonth() === today.getMonth() && day.getFullYear() === today.getFullYear()
  }

  return (
    <div className="daily-card">
      {data.map((day) => {
        const weekDay=new Date(day.date)
        let dayLabel=getWeekDay(day.date)+ ","+day.date.substring(8)
        if(sameDay(weekDay)){
          dayLabel="Today"
        }
        return(
        <div key={day.date} className="day-item">
          <Text variant="p">{dayLabel}</Text>
          <img src={day.day.condition.icon} alt={day.day.condition.text} />
          <Text variant="h3">H: {displayTemp(tempUnits, day.day.maxtemp_c, day.day.maxtemp_f)}{unitSymbol(tempUnits)}</Text>
          <Text variant="h3">L: {displayTemp(tempUnits, day.day.mintemp_c, day.day.mintemp_f)}{unitSymbol(tempUnits)}</Text>
        </div>
        )
      })}
    </div>
  )
}