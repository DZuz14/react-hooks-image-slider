import { TOGGLE_SETTING } from '../actions/types'

const initialState = {
  showDots: true,
  coolButtons: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case TOGGLE_SETTING:
      return { ...state, [action.payload]: !state[action.payload] }
  }
  return state
}
