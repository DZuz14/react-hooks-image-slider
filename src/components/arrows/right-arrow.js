import React from 'react'

const RightArrow = ({ nextSlide, coolButtons }) => {
  return (
    <div className={coolButtons ? 'right-arrow cool-buttons' : 'right-arrow'} onClick={nextSlide}>
      <img src="img/slider-right-arrow.svg" />
    </div>
  )
}

export default RightArrow
