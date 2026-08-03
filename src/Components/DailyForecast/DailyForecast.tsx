import { type ForecastData } from '@/Components/WeatherTypes/WeatherTypes'
import { Text } from '@/Components/Text/Text'

type DailyProp = {
  data: ForecastData[]
}

export const DailyForecast: React.FC<DailyProp> = ({ data }) => {
  return (
    <div className="daily-card">
      {data.map((day, index) => (
        <div key={index} className="day-item">
          <Text variant="p">{day.date}</Text>
          <img src={`https:${day.day.condition.icon}`} alt={day.day.condition.text} />
          <Text variant="span">High: {day.day.maxtemp_c}°C</Text>
          <Text variant="span">Low: {day.day.mintemp_c}°C</Text>
          <Text variant="span">{day.day.condition.text}</Text>
        </div>
      ))}
    </div>
  )
}