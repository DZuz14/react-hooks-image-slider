import React from 'react'

const Dot = ({ id, active, dotClick }) => {
  let name = active ? 'dot active' : 'dot'
  
  return (
    <div data-id={id}
      className={name}
      onClick={e => dotClick(parseInt(e.target.getAttribute('data-id')))}>
    </div>
  )
}

export default Dot
