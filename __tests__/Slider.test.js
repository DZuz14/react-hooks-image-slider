import React from 'react'
import { Provider } from 'react-redux'
import { shallow } from 'enzyme'
import Slider from '../src/components/Slider'

describe('Slider Component', () => {
  let cmp = shallow(<Provider><Slider /></Provider>).dive()

  it('Should render itself', () => {
    expect(app.find('.slider').length).toEqual(1)
  })

}) // end describe block
