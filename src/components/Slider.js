import React, { Component } from 'react'
import axios from 'axios'
import Slide from './Slide'
import Dots from './Dots'
import SliderLeftArrow from './SliderLeftArrow'
import SliderRightArrow from './SliderRightArrow'

export default class Slider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      images: [],
      index: 0,
      translateValue: 0,
      autoplay: true,
      testing: false
    }
  }

  componentDidMount = () => {
    axios.get('slider-config.json')
    .then(res => {
      this.setState({ images: res.data })
    })
  }

  renderSlides = () => {
    const { images } = this.state
    let slides = []

    for(let i = 0; i < images.length; i++)
      slides.push(<Slide key={i} image={images[i].image} />)

    return slides
  }

  handleDotClick = i => {
    const { images } = this.state

    if(i === this.state.index)
      return

    if(i > this.state.index) {
      return this.setState({
        index: i,
        translateValue: -(i * this.slideWidth())
      })
    }
    else {
      this.setState({
        index: i,
        translateValue: this.state.translateValue += ((this.state.index - i) * (this.slideWidth()))
      })
    }
  }

  componentDidUpdate = () => {
    console.log('Update')

    setTimeout(() => {
      this.goToNextSlide()
    }, 4000)
  }

  render() {
    const { images, index, translateValue, autoplay } = this.state
    return (
      <div className="slider">
        <p>Currently testing autoplay...dont mind me =)</p>
        <div className="slider-wrapper"
          style={{
            transform: `translateX(${translateValue}px)`,
            transition: 'transform ease-out 0.35s'
          }}>
          { this.renderSlides() }
        </div>

        <Dots
          index={index}
          quantity={images.length}
          dotClick={this.handleDotClick} />

        <SliderLeftArrow prevSlide={this.goToPreviousSlide} />
        <SliderRightArrow nextSlide={this.goToNextSlide} />
      </div>
    )
  }

  goToPreviousSlide = () => {
    if(this.state.index === 0)
      return

    this.setState({
      translateValue: this.state.translateValue += this.slideWidth(),
      index: this.state.index -= 1
    })
  }

  goToNextSlide = () => {
    const { images } = this.state

    if(this.state.index === images.length - 1) {
      return this.setState({
        translateValue: 0,
        index: 0
      })
    }

    this.setState({
      translateValue: this.state.translateValue -= this.slideWidth(),
      index: this.state.index += 1
    })
  }

  slideWidth = () => {
    const slide = document.querySelector('.slide')
    return slide.clientWidth
  }


} // End Class
