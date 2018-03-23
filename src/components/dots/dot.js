import React from 'react'

const Dot = ({ id, active, dotClick }) => {
  const names = active ? 'dot active' : 'dot'
  return <div className={names} onClick={() => dotClick(id)} />
}

export default Dot
