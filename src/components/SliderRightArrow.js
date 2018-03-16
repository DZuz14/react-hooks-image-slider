import React from 'react'

const SliderRightArrow = ({ nextSlide, coolButtons }) => {
  return (
    <div className={coolButtons ? 'slider-right-arrow cool-buttons' : 'slider-right-arrow'} onClick={nextSlide}>
      <img src="img/slider-right-arrow.svg" />
    </div>
  )
}

export default SliderRightArrow
