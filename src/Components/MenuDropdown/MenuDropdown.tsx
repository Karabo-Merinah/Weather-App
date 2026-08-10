import { useState } from 'react'
import { Text } from '../Text/Text'
import ReactSwitch from 'react-switch'
import { ThemeToggle } from '../ThemeToggle/ThemeToggle'
import { SettingsIcon } from 'lucide-react'


type MenuDropdownProps = {
    tempUnits: string,
    setTempUnits: (value: string) => void;
    theme: string,
    toggleTheme: () => void
}

export const MenuDropdown: React.FC<MenuDropdownProps> = ({ tempUnits, setTempUnits, theme, toggleTheme }) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleTemperature = () => {
        if (tempUnits === "Celsius") {
            setTempUnits("Fahrenheit")
        }
        else {
            setTempUnits("Celsius")
        }
    }
    const togglemenu = () => {
        if (isOpen) {
            setIsOpen(false)
        }
        else {
            setIsOpen(true)
        }
    }
    return (
        <div className='menu-dropdown'>
            <button className='menu-button' onClick={togglemenu}>
                <SettingsIcon className='menu-toggle' />
            </button>

            {isOpen && (
                <div className='menu-section'>
                    <div>
                        <Text variant={'h3'} className='menu-section-title'>Temperature units:</Text>
                        <ReactSwitch onChange={toggleTemperature} className='temp-toggle' checked={tempUnits === "Celsius"}
                          onColor="#496AA3" offColor="#B5732A"
                            checkedIcon={
                                <div className='icon-style'>°C</div>
                            }
                            uncheckedIcon={
                                <div className='icon-style'>°F</div>
                            }
                        />
                    </div>
                    <div>
                        <Text variant={'h3'} className='menu-section-title'>Theme</Text>
                        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                    </div>
                </div>
            )}

        </div>
    )
}
