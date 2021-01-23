import React from "react"
import PropTypes from "prop-types"

const Box = ({
  component = "span",
  display,
  flex,
  justifyContent,
  alignItems,
  children,
}) => {
  return (
    <div style={{ display, flex, justifyContent, alignItems }}>{children}</div>
  )
}

Box.propTypes = {
  display: PropTypes.string,
  flex: PropTypes.string,
  justifyContent: PropTypes.string,
  spaceBetween: PropTypes.string,
}

export { Box }
