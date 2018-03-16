import React from 'react'

const SliderLeftArrow = ({ prevSlide, coolButtons }) => {
  return (
    <div className={coolButtons ? 'slider-left-arrow cool-buttons' : 'slider-left-arrow'} onClick={prevSlide}>
      <img src="img/slider-left-arrow.svg" />
    </div>
  )
}

export default SliderLeftArrow
