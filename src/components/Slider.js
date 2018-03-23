import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Slide from './slide'
import Settings from './settings/index.js'
import ToggleSettings from './settings/toggle-settings'
import Dots from './dots/dots'
import LeftArrow from './arrows/left-arrow'
import RightArrow from './arrows/right-arrow'
require('./style.scss')

class Slider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      settingsVisible: false,
      autoplay: false
    }
  }

  componentDidMount = () => this.props.getSliderImages()

  componentDidUpdate = (prevProps, prevState) => {
    const { autoplay } = this.state

    if(autoplay && prevState.autoplay !== autoplay) {
      let x = window.setInterval(() => {
                this.goToNextSlide()
              }, 3000)
      this.setState({ interval : x })
    }
    else if(!autoplay && prevState.autoplay !== autoplay) {
      let x = window.clearInterval(this.state.interval)
      this.setState({ interval : x })
    }
  }

  renderSlides = () => this.props.images.map((curr, i) => <Slide key={i} image={this.props.images[i]} />)
  toggleSettings = () => this.setState({ settingsVisible: !this.state.settingsVisible })
  toggleAutoplay = () => this.setState({ autoplay: !this.state.autoplay })

  render() {
    const { settingsVisible, autoplay } = this.state
    const {
      images,
      index,
      translateValue,
      showDots,
      coolButtons
    } = this.props

    return (
      <div className="slider">
        <Settings
          visible={settingsVisible}
          toggleAutoplay={this.toggleAutoplay}
          autoplay={autoplay}
        />
        <ToggleSettings visible={settingsVisible} toggle={this.toggleSettings} />

        <div className="slider-wrapper"
          style={{
            transform: `translateX(${translateValue}px)`,
            transition: 'transform ease-out 0.45s'
          }}>
          { this.renderSlides() }
        </div>

        <Dots
          visible={showDots}
          index={index}
          images={images}
          dotClick={this.handleDotClick}
        />

        <LeftArrow prevSlide={this.goToPreviousSlide} coolButtons={coolButtons} />
        <RightArrow nextSlide={this.goToNextSlide} coolButtons={coolButtons} />
      </div>
    )
  }


  goToPreviousSlide = () => {
    const { index, translateValue, setTranslateValue, setIndex } = this.props
    if(index === 0) return

    setTranslateValue(translateValue + this.slideWidth())
    setIndex(index - 1)
  }

  goToNextSlide = () => {
    const { images, index, translateValue, setTranslateValue, setIndex } = this.props
    if(index === images.length - 1) {
      setTranslateValue(0)
      return setIndex(0)
    }
    setTranslateValue(translateValue - this.slideWidth())
    setIndex(index + 1)
  }

  handleDotClick = i => {
    const { index, translateValue, setTranslateValue, setIndex } = this.props
    if(i === index) return

    if(i > index)
      setTranslateValue(-(i * this.slideWidth()))
    else
      setTranslateValue(translateValue + ((index - i) * (this.slideWidth())))

    setIndex(i)
  }

  slideWidth = () => document.querySelector('.slide').clientWidth

} // End Class

const mapStateToProps = ({ slider, settings }) => {
  return {
    images: slider.images,
    index: slider.index,
    translateValue: slider.translateValue,
    showDots: settings.showDots,
    coolButtons: settings.coolButtons
  }
}

export default connect(mapStateToProps, actions)(Slider)
