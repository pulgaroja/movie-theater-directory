import React from 'react'
import PropTypes from 'prop-types'

/* Inport Styles */
import './alert.css'

const Alert = ({ showAlert }) => {
  return (
    <div id="alert" style={{ opacity: showAlert ? 1 : 0 }}>
      An error ocurred, please check your internet connection and try again
      later.
    </div>
  )
}

Alert.propTypes = {
  showAlert: PropTypes.bool.isRequired,
}

export default Alert
