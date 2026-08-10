import {useState} from 'react'
import {Text} from '@/Components/Text/Text'


export const PrivacyNotice = () => {
    const [openTerms,setOpenTerms]=useState(false)
  return (
      <div>
        <Text variant={'p'} style={{fontSize:'12px',color:'grey'}}>We respect your privacy and comply with {''}
            <button className='privacy-link' onClick={()=>setOpenTerms(true)}> data protection laws</button>
        </Text>
     {openTerms &&(
      <div className='privacy-overlay' onClick={()=>setOpenTerms(false)}>
        <div className='privacy-info' onClick={(e)=> e.stopPropagation()}>
            <div className='privacy-title'>
                <Text variant={'h3'} style={{fontWeight:'bold'}}>Privacy and Security</Text>
                <button className='privacy-close' onClick={()=>setOpenTerms(false)}>X</button>
            </div>
            <ul>
                <li>This app does not collect or store personal data .</li>
                <li> Location data is only used to fetch weather from WeatherAPI.com and never saved outside your device.</li>
                <li>Saved locations are kept in your browser's local storage and can be removed anytime from the sidebar.</li>
               <li> Notifications when  enabled are generated locally in your browser</li>
            </ul>
          </div>
        </div>
     )}

 </div>
  )
}
