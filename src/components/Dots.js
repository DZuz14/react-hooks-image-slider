import React from 'react'
import Dot from './Dot'

const Dots = ({ index, images, dotClick }) => {

  const dotsGroup = images.map((image, i) => {
    let active = (i === index) ? true : false
    return <Dot key={i} id={i} active={active} dotClick={dotClick} />
  })

  return (
    <div className="dots-container">
      { dotsGroup }
    </div>
  )
}

export default Dots
