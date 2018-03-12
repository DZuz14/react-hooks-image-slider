import { combineReducers } from 'redux'
import slider from './slider'
import settings from './settings'

const rootReducer = combineReducers({
  slider,
  settings
})

export default rootReducer
