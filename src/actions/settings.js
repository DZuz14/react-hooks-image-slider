import { TOGGLE_SETTING } from './types'

export function toggleSetting(settingName) {
  console.log(settingName)
  return {
    type: TOGGLE_SETTING,
    payload: settingName
  }
}
