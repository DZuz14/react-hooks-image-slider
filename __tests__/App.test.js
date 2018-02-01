import React from 'react'
import { shallow } from 'enzyme'
import App from '../src/components/app'

describe('Top Level App Component', () => {
  let app = shallow(<App />)

  it('Should have a div with className of app', () => {
    expect(app.find('.app').length).toEqual(1)
  })

}) // end describe block
