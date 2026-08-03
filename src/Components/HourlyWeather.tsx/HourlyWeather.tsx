import { type HourlyData } from '@/Components/WeatherTypes/WeatherTypes'
import { Text } from '@/Components/Text/Text'

type HourlyProp = {
  hdata: HourlyData[]
}

export const HourlyWeather: React.FC<HourlyProp> = ({ hdata }) => {
  return (
    <div className="hour-card">
      <Text variant="h3">Hourly Forecast</Text>
      {hdata.map((hour) => (
        <div key={hour.time} className="hour-item">
          <Text variant="p">{hour.time}</Text>
          <img src={`https:${hour.condition.icon}`} alt={hour.condition.text} />
          <Text variant="p">{hour.temp_c}°C</Text>
          <Text variant="p">{hour.condition.text}</Text>
        </div>
      ))}
    </div>
  )
}