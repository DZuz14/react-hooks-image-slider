import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Switch from 'react-toggle-switch'
require('./style.scss')

class Settings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      switched: false
    }
  }

  toggleSwitch = name => {
    console.log(name)
    this.setState({ switched: !this.state.switched })
  }

  render() {
    return (
      <div className="settings">
        <div className="menu">
          <h3 style={{
            marginLeft: '20px',
            marginBottom: '40px'
          }}>
            Work in progress...
          </h3>

          <div className="setting">
            <Switch onClick={() => this.toggleSwitch('dots')} on={this.state.switched} />
          </div>

        </div>
      </div>
    )
  }
}

/*
const mapStateToProps = (state) => {
  return {
    dots: state.settings.dots
  }
}
*/

export default connect(null)(Settings)
