import {Text} from '@/Components/Text/Text'
import { AlertCircle } from 'lucide-react'
type NotificationProp={
    message:string
    type ?: "info" | "warning"
}
export const Notifications:React.FC<NotificationProp> = ({message,type="info"}) => {
    if(!message){
        return null
    }
    let className="notifications"
    if(type === "info"){
        className="notifications-info"
    }
    else if(type === "warning"){
        className="notifications-warning"
    }
    return (
    <div className={className}>
        <AlertCircle size={18}/>
        <Text variant={'p'}>{message}</Text>
    </div>
  )
}
