import React, { useCallback } from "react"

import { useStore } from "../../store"

export const FooStore = ({ children }) => {
  const { products } = useStore()

  const { fetch } = products

  const onMount = useCallback(fetch, [fetch])

  return React.cloneElement(children, {
    onMount,
    products,
  })
}
