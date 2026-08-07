import {useEffect} from 'react'
import { type WeatherAlert } from '../WeatherTypes/WeatherTypes'

type Alert={
  alerts:WeatherAlert[]
}

export const WeatherAlerts:React.FC<Alert> = ({alerts}) => {
    useEffect(() => {
    if (!("Notification" in window)) return
    if (Notification.permission === "default") {
      Notification.requestPermission()
    }
  }, [])

  useEffect(() => {
    if (!("Notification" in window)) return
    if (Notification.permission !== "granted") return
    if (!alerts || alerts.length === 0) return

    for (let i = 0; i < alerts.length; i++) {
      const alertItem = alerts[i]
      if (alertItem.severity === "Severe" || alertItem.severity === "Extreme") {
        new Notification(alertItem.event, {
          body: alertItem.headline || alertItem.event,
        })
      }
    }
  }, [alerts])
}
