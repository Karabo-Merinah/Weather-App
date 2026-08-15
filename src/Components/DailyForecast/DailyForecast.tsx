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
    //Used to retrieve the day of the week from the date .
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[newDate.getDay()]
  }
 const getDayNumber=(date:string)=>{
  const newDate=new Date(date)
  return newDate.getDate()
 }
//  Compares if today's date is similar to the one received in the function
  const today=new Date()
  const sameDay=(day:Date)=>{
    return day.getDate()=== today.getDate() && day.getMonth() === today.getMonth() && day.getFullYear() === today.getFullYear()
  }
  return (
    <div className="daily-card">
      {data.map((day) => {
        const weekDay=new Date(day.date)
        let dayLabel=getWeekDay(day.date)
        // Labels the current day instead of showing as a weekday name
        if(sameDay(weekDay)){
          dayLabel="Today"
        }
        return(
        <div key={day.date} className="day-item">
          <div className='day-header'>
            <Text variant="p" className='date'>{getDayNumber(day.date)}</Text>
          <Text variant="p" className='day-label'>{dayLabel}</Text>
          </div>
          <img src={day.day.condition.icon} alt={day.day.condition.text} className='day-condition'/>
          <Text variant="h3" className='day-max'> {displayTemp(tempUnits, day.day.maxtemp_c, day.day.maxtemp_f)}{unitSymbol(tempUnits)}</Text>
          <Text variant="h3" className='day-min'>{displayTemp(tempUnits, day.day.mintemp_c, day.day.mintemp_f)}{unitSymbol(tempUnits)}</Text>
        </div>
        )
      })}
    </div>
  )
}