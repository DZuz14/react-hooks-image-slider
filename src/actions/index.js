import axios from 'axios'
import { GET_IMAGES_SUCCESS } from './types'

export function getSliderImages() {
  return async (dispatch) => {
    try {
      let res = await axios.get('slider-config.json')
      dispatch(getImagesSuccess(res.data))
    }
    catch(e) {
      console.error(e)
    }
  }
}

export function getImagesSuccess(images) {
  return {
    type: GET_IMAGES_SUCCESS,
    payload: images
  }
}
