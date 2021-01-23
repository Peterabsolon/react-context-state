import { fireEvent, render, screen, waitFor } from "@testing-library/react"

import App from "../../App"
import { productsStore } from "../../store/products.store"

jest.mock("../../store/products.store")

beforeEach(() => {
  productsStore.fetch.mockImplementation(() => Promise.resolve([]))
})

const PRODUCT_FOO = { id: 1, title: "Product Foo" }
const PRODUCT_BAR = { id: 2, title: "Product Bar" }

it("renders button, logging the click event", async () => {
  jest.spyOn(console, "log")

  render(<App />)

  await waitFor(() => {
    const btnElement = screen.getByText(/Click me!/i)
    expect(btnElement).toBeInTheDocument()

    fireEvent.click(btnElement)
    expect(console.log.mock.calls[0][0]).toBe("clicked")
  })

  jest.clearAllMocks()
})

it("fetches products on mount", async () => {
  productsStore.fetch.mockImplementationOnce(() => Promise.resolve([PRODUCT_FOO, PRODUCT_BAR]))

  render(<App />)

  await waitFor(() => {
    const productFoo = screen.getByText(/Product Foo/i)
    expect(productFoo).toBeInTheDocument()

    const productBar = screen.getByText(/Product Bar/i)
    expect(productBar).toBeInTheDocument()
  })
})

it("searches products", async () => {
  productsStore.fetch.mockImplementationOnce(() => Promise.resolve([PRODUCT_FOO, PRODUCT_BAR]))
  productsStore.search.mockImplementationOnce(() => Promise.resolve([PRODUCT_FOO]))

  render(<App />)

  await waitFor(() => {
    const searchInput = screen.getByPlaceholderText(/Search/i)
    fireEvent.change(searchInput, { target: { value: "Foo" } })

    const productFoo = screen.getByText(/Product Foo/i)
    expect(productFoo).toBeInTheDocument()

    expect(screen.queryByText(/Product Bar/i)).toBe(null)
  })
})
