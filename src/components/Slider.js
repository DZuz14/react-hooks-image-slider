import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import axios from 'axios'

import Slide from './Slide'
import Dots from './Dots'
import Autoplay from './Autoplay'
import SliderLeftArrow from './SliderLeftArrow'
import SliderRightArrow from './SliderRightArrow'

class Slider extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount = () => this.props.getSliderImages()

  /*
  componentDidUpdate = (prevProps, prevState) => {
    const { autoplay } = this.state

    if(autoplay && prevState.autoplay !== autoplay) {
      let x = window.setInterval(() =>  {
                this.goToNextSlide()
              }, 2500)

      this.setState({ interval : x })
    }
    else if(!autoplay && prevState.autoplay !== autoplay) {
      let x = window.clearInterval(this.state.interval)
      this.setState({ interval : x })
    }
  }*/

  renderSlides = () => {
    const { images } = this.props
    let slides = []
    for(let i = 0; i < images.length; i++)
      slides.push(<Slide key={i} image={images[i].image} />)

    return slides
  }

  handleDotClick = i => {
    const { index, translateValue, setTranslateValue, setIndex } = this.props
    console.log(index)
    console.log(i)
    if(i === index)
      return

    if(i > index) {
      setTranslateValue(
        -(i * this.slideWidth())
      )
      setIndex(i)
      return
    }
    else {
      setTranslateValue(
        translateValue + ((index - i) * (this.slideWidth()))
      )
      setIndex(i)
    }
  }

  toggleAutoplay = () => {
    const { autoplay, toggleAutoplay } = this.props
    toggleAutoplay(!autoplay)
  }

  render() {
    const { images, index, translateValue, autoplay } = this.props

    return (
      <div className="slider">
        <div className="slider-wrapper"
          style={{
            transform: `translateX(${translateValue}px)`,
            transition: 'transform ease-out 0.45s'
          }}>
          { this.renderSlides() }
        </div>

        <Autoplay toggle={this.toggleAutoplay} autoplay={autoplay} />

        <Dots
          index={index}
          quantity={images.length}
          dotClick={this.handleDotClick} />

        <SliderLeftArrow prevSlide={this.goToPreviousSlide} />
        <SliderRightArrow nextSlide={this.goToNextSlide} />
      </div>
    )
  }

  /**
  * Below section handles arrow click events, and getting the current width of the slide.
  */
  goToPreviousSlide = () => {
    const { index, translateValue, setTranslateValue, setIndex } = this.props
    let currentTranslateVal = translateValue
        currentTranslateVal = currentTranslateVal + this.slideWidth()

    let currentIndex = index
        currentIndex = currentIndex - 1

    if(index === 0)
      return

    setTranslateValue(currentTranslateVal)
    setIndex(currentIndex)
  }

  goToNextSlide = () => {
    const { images, index, translateValue, setTranslateValue, setIndex } = this.props
    let currentTranslateVal = translateValue
        currentTranslateVal = currentTranslateVal - this.slideWidth()

    let currentIndex = index
        currentIndex = currentIndex + 1

    if(index === images.length - 1) {
      setTranslateValue(0)
      setIndex(0)
      return
    }

    setTranslateValue(currentTranslateVal)
    setIndex(currentIndex)
  }

  slideWidth = () => {
    const slide = document.querySelector('.slide')
    return slide.clientWidth
  }

} // End Class

const mapStateToProps = ({ slider }) => {
  return {
    images: slider.images,
    index: slider.index,
    translateValue: slider.translateValue,
    autoplay: slider.autoplay
  }
}

export default connect(mapStateToProps, actions)(Slider)
