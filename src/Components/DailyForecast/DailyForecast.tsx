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
  return (
    <div className="daily-card">
      {data.map((day) => (
        <div key={day.date} className="day-item">
          <Text variant="p">{getWeekDay(day.date)},{day.date.substring(8)}</Text>
          <img src={`https:${day.day.condition.icon}`} alt={day.day.condition.text} />
          <Text variant="h3">H: {displayTemp(tempUnits, day.day.maxtemp_c, day.day.maxtemp_f)}{unitSymbol(tempUnits)}</Text>
          <Text variant="h3">L: {displayTemp(tempUnits, day.day.mintemp_c, day.day.mintemp_f)}{unitSymbol(tempUnits)}</Text>
        </div>
      ))}
    </div>
  )
}