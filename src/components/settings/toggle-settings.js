import React from 'react'

const ToggleSettings = ({ visible, toggle }) => {
  if(visible)
    return <img src="./img/settings-close.svg" className="settings-icon" onClick={toggle} />
  else
    return <img src="./img/settings.svg" className="settings-icon" onClick={toggle} />
}

export default ToggleSettings
