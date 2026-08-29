import {useEffect, useState} from 'react'
import { type WeatherAlert } from '../WeatherTypes/WeatherTypes'
import {Text} from '@/Components/Text/Text'
type Alert={
  alerts:WeatherAlert[]
}
//Severity levels that should trigger notifications
 const alertsLevel=["Severe","Extreme","Moderate"]
  const sendAlerts=(alerts:WeatherAlert[])=>{
  if(!alerts || alerts.length === 0) return 
  for (let i = 0; i < alerts.length; i++) {
      const alert = alerts[i]
      //  // Only notify if severity is one of the defined levels
    if(alertsLevel.includes(alert.severity)){
      let description=alert.event
      if(alert.headline){
        description=alert.headline
      }
      new Notification(alert.event,{
        body:description
      })
    }
  }
  }

 export const WeatherAlerts:React.FC<Alert> = ({alerts}) => {
  const [isNotificationsBlocked,setIsNotificationsBlocked]=useState(false)
   useEffect(() => {
     // Check if Notifications API is supported
    if (!("Notification" in window)) return
    // If permission already granted then send alerts 
     if (Notification.permission === "granted") {
      sendAlerts(alerts)
    }
    // If permission not yet granted  then request it
    else if(Notification.permission === "default"){
      Notification.requestPermission().then((result)=>{
        if(result === "granted"){
          sendAlerts(alerts)
        }
        else if(result === "denied"){
          setIsNotificationsBlocked(true)
        }
      })
    }
},[alerts])
//If notifications are blocked then show a message
if  (!isNotificationsBlocked) return null

return (
  <div className='alerts-blocked'>
    <Text variant={'p'}>Notifications are disabled </Text>
  </div>
)
}
