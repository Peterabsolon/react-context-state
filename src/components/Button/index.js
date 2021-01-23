import React from "react"
import PropTypes from "prop-types"

const Button = ({ children, label, onClick, type = "button" }) => {
  return (
    <button onClick={onClick} type={type}>
      {children || label}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.element,
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

export { Button }
