import {Text} from '@/Components/Text/Text'
import { AlertCircle } from 'lucide-react'


type NotificationProp={
    message:string
}
export const Notifications:React.FC<NotificationProp> = ({message}) => {
    if(!message){
        return null
    }
    return (
    <div className='notifications'>
        <AlertCircle size={18}/>
        <Text variant={'p'}>{message}</Text>
    </div>
  )
}
