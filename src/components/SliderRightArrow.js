import React from 'react'

const SliderRightArrow = ({ slideLeft }) => {
  return (
    <div className="slider-right-arrow" onClick={slideLeft}>
      <img src="img/slider-right-arrow.svg" />
    </div>
  )
}

export default SliderRightArrow
