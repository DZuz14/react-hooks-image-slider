import React from 'react'

const Autoplay = ({ toggle, autoplay }) => {
  return (
    <div className="autoplay" onClick={toggle}>
      {
        autoplay ?
        <p>Disable Autoplay</p>
        :<p>Enable Autoplay</p>
      }
    </div>
  )
}

export default Autoplay
