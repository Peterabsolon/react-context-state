import React, { useCallback, useState } from "react"

import { productsStore } from "./products.store"

export const StoreContext = React.createContext({})

export const StoreConsumer = StoreContext.Consumer

export const StoreProvider = ({ children }) => {
  const [products, setProducts] = useState([])

  const context = {
    products: {
      fetch: useCallback(() => productsStore.fetch(setProducts), []),
      search: useCallback(
        (query) => productsStore.search(setProducts, query),
        []
      ),
      data: products,
    },
  }

  return (
    <StoreContext.Provider value={context}>{children}</StoreContext.Provider>
  )
}

export const useStore = () => React.useContext(StoreContext)
