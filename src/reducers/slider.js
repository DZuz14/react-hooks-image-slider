import {
  GET_IMAGES_SUCCESS,
  SET_TRANSLATE_VALUE,
  SET_INDEX
} from '../actions/types'

const initialState = {
  images: [],
  index: 0,
  translateValue: 0
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_IMAGES_SUCCESS:
      return { ...state, images: action.payload }
    case SET_TRANSLATE_VALUE:
      return { ...state, translateValue: action.payload }
    case SET_INDEX:
      return { ...state, index: action.payload }
  }
  return state
}
