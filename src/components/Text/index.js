import React from "react"
import t from "prop-types"

const Text = ({ component = "span", children }) => {
  const Component = component

  return <Component>{children}</Component>
}

Text.propTypes = {
  children: t.oneOfType([t.element, t.string]).isRequired,
  component: t.oneOf(["span", "h1", "h2", "h3"]),
}

export { Text }
