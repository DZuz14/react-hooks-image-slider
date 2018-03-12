import axios from 'axios'
import {
  GET_IMAGES_SUCCESS,
  SET_TRANSLATE_VALUE,
  SET_INDEX,
  TOGGLE_AUTOPLAY
} from './types'


/* Thunks */
export function getSliderImages() {
  return async (dispatch) => {
    try {
      let res = await axios.get('./slider-config.json')
      dispatch(getImagesSuccess(res.data)) // res.data will be an [] of images
    }
    catch(e) {
      console.error('Fetching images failed: ' + e)
    }
  }
}


/* Action Creators */
export function getImagesSuccess(images) {
  return {
    type: GET_IMAGES_SUCCESS,
    payload: images
  }
}

export function setTranslateValue(value) {
  return {
    type: SET_TRANSLATE_VALUE,
    payload: value
  }
}

export function setIndex(value) {
  return {
    type: SET_INDEX,
    payload: value
  }
}

export function toggleAutoplay(isActive) {
  return {
    type: TOGGLE_AUTOPLAY,
    payload: isActive
  }
}
