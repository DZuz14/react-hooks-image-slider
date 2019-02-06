import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as SliderActions from '../actions'
import * as SettingsActions from '../actions/settings'
import Slide from './slide'
import Settings from './settings'
import ToggleSettings from './settings/toggle-settings'
import Dots from './dots/dots'
import LeftArrow from './arrows/left-arrow'
import RightArrow from './arrows/right-arrow'
require('./style.scss')

export class Slider extends Component {
  state = {
    interval: null
  }

  updateDimensions = () => {
    var w = window,
        d = document,
        documentElement = d.documentElement,
        body = d.getElementsByTagName('body')[0],
        width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
        height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;
    
    const { 
      index, 
      setTranslateValue
    } = this.props
    setTranslateValue(-index * width)

  }
  componentDidMount = () => {
    this.props.getSliderImages();
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateDimensions);
  }

  componentDidUpdate = prevProps => {
    const { autoplay } = this.props

    // If autoplay was chosen, and the previous autoplay state was false, activate autoplay
    // via a timer set on the window object
    if(autoplay && prevProps.autoplay !== autoplay) {
      const interval = window.setInterval(() => {
                this.goToNextSlide()
              }, 3000)
      this.setState({ interval })
    }

    // If autoplay is was set to off, and the previous autoplay was not false, 
    // clear the timer from the window object
    else if(!autoplay && prevProps.autoplay !== autoplay) {
      const interval = window.clearInterval(this.state.interval)
      this.setState({ interval })
    }
  }

  renderSlides = () => {
    const { images } = this.props
    return images.map((curr, i) =>
      <Slide 
        key={i} 
        image={this.props.images[i]} 
      />
    )
  }

  render() {
    const {
      images,
      index,
      translateValue,
      toggleSetting,
      showDots,
      coolButtons,
      settingsVisible,
      autoplay
    } = this.props

    return (
      <div className="slider">

        <Settings
          visible={settingsVisible}
          autoplay={autoplay}
        />

        <ToggleSettings
          visible={settingsVisible}
          toggleSetting={toggleSetting}
        />

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

        <LeftArrow
          prevSlide={this.goToPreviousSlide}
          coolButtons={coolButtons}
        />

        <RightArrow
          nextSlide={this.goToNextSlide}
          coolButtons={coolButtons}
        />
      </div>
    )
  }


  goToPreviousSlide = () => {
    const { 
      index, 
      translateValue, 
      setTranslateValue, 
      setIndex 
    } = this.props

    if(index === 0)
      return

    setTranslateValue(translateValue + this.slideWidth())
    setIndex(index - 1)
  }

  goToNextSlide = () => {
    const { 
      images, 
      index, 
      translateValue, 
      setTranslateValue, 
      setIndex 
    } = this.props

    if(index === images.length - 1) {
      setTranslateValue(0)
      return setIndex(0)
    }

    setTranslateValue(translateValue - this.slideWidth())
    setIndex(index + 1)
  }

  handleDotClick = i => {
    const { 
      index, 
      translateValue, 
      setTranslateValue, 
      setIndex 
    } = this.props

    // Do nothing if someone clicks on the currently active dot
    if(i === index) 
      return

    // If the number taken from the i argument passed into handleDotClick is
    // less than the currently active dot, we obviously need to move backwards to a previous slide.
    if(i > index) {
      setTranslateValue(-i * this.slideWidth())
    }    
    // We need to go forward to a particular slide
    else {
      setTranslateValue(
        translateValue + (index - i) * this.slideWidth()
      )
    }

    setIndex(i)
  }

  slideWidth = () => {
    return document.querySelector('.slide').clientWidth
  }

} // End Class

const mapStateToProps = ({ slider, settings }) => {
  return {
    // slider
    images: slider.images,
    index: slider.index,
    translateValue: slider.translateValue,
    // settings
    showDots: settings.showDots,
    coolButtons: settings.coolButtons,
    settingsVisible: settings.visible,
    autoplay: settings.autoplay
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    ...SliderActions,
    ...SettingsActions
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Slider)
