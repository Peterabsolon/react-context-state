const data = [
  { id: 1, title: "Product #1" },
  { id: 2, title: "Product #2" },
]

export const fetchProducts = () => {
  return Promise.resolve(data)
}

export const searchProducts = (query) => {
  return Promise.resolve(data.filter((item) => item.title.includes(query)))
}

export const productsStore = {
  fetch: () => fetchProducts(),
  search: (query) => searchProducts(query),
}
