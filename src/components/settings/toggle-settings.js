import React from 'react'

const close = './img/settings-close.svg'
const gearIcon = './img/settings.svg'

const ToggleSettings = ({ visible, toggleSetting }) => (
  <img
    src={visible ? close : gearIcon}
    className="settings-icon"
    onClick={() => toggleSetting('visible')}
  />
)

export default ToggleSettings
