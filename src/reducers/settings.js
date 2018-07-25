import { TOGGLE_SETTING } from '../actions/types'

const initialState = {
  visible: false, // controls if the settings menu is visible or not
  showDots: true,
  coolButtons: false,
  autoplay: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case TOGGLE_SETTING:
      return { ...state, [action.payload]: !state[action.payload] }
  }
  return state
}
