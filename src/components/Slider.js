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

class Slider extends Component {
  state = {}

  componentDidMount = () => {
    this.props.getSliderImages()
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { autoplay } = this.props

    // If autoplay was chosen, and the previous autoplay state was false, set the interval.
    if(autoplay && prevProps.autoplay !== autoplay) {
      let x = window.setInterval(() => {
                this.goToNextSlide()
              }, 3000)
      this.setState({ interval : x })
    }
    else if(!autoplay && prevProps.autoplay !== autoplay) {
      let x = window.clearInterval(this.state.interval)
      this.setState({ interval : x })
    }
  }

  renderSlides = () => (
    this.props.images.map((curr, i) =>
      <Slide key={i} image={this.props.images[i]} />
    )
  )

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
            {
              this.renderSlides()
            }
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
