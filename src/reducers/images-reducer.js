import { GET_IMAGES_SUCCESS } from '../actions/types'

export default function(state = [], action) {
  switch(action.type) {
    case GET_IMAGES_SUCCESS:
      return action.payload
  }
  return state
}
