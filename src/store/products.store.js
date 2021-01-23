import { fetchProducts, searchProducts } from "lib/api"
import { logger } from "lib/logger"

export const productsStore = {
  fetch: () => {
    logger.info("Fetching products")
    return fetchProducts()
  },
  search: (query) => {
    logger.info("Searching products")
    return searchProducts(query)
  },
}
