const data = [
  { id: 1, title: "Product #1" },
  { id: 2, title: "Product #2" },
]

const fetchProducts = () => {
  return Promise.resolve(data)
}

const searchProducts = (query) => {
  return Promise.resolve(data.filter((item) => item.title.includes(query)))
}

export const productsStore = {
  fetch: async (setData) => setData(await fetchProducts()),
  search: async (setData, query) => setData(await searchProducts(query)),
}
