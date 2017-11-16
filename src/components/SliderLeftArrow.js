import React from 'react'

const SliderLeftArrow = ({ slideRight }) => {
  return (
    <div className="slider-left-arrow" onClick={slideRight}>
      <img src="img/slider-left-arrow.svg" />
    </div>
  )
}

export default SliderLeftArrow
