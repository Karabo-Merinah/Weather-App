import ReactSwitch from 'react-switch'
import { ThemeToggle } from '../ThemeToggle/ThemeToggle'

type MenuDropdownProps = {
    tempUnits: string,
    setTempUnits: (value: string) => void;
    theme: string,
    toggleTheme: () => void
}

export const MenuDropdown: React.FC<MenuDropdownProps> = ({ tempUnits, setTempUnits, theme, toggleTheme }) => {
    //Toggle between Celsius and Fahrenheit
    const toggleTemperature = () => {
        if (tempUnits === "Celsius") {
            setTempUnits("Fahrenheit")
        }
        else {
            setTempUnits("Celsius")
        }
    }
    return (
        <div className='units-theme'>
            {/* Temperature toggle switch */}
            <div className='units-group'>
                <ReactSwitch onChange={toggleTemperature} className='temp-toggle' checked={tempUnits === "Celsius"}
                    onColor="#496AA3" offColor="#5a798f"
                    checkedIcon={
                        <div className='icon-style'>°C</div> // Icon shown when Celsius
                    }
                    uncheckedIcon={
                        <div className='icon-style'>°F</div> // Icon shown when Fahrenheit
                    }
                />
            </div>
            {/* Theme toggle (light/dark) */}
            <div>
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </div>
        </div>
    )
}
