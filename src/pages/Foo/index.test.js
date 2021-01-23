import { fireEvent, render, screen, waitFor } from "@testing-library/react"

import App from "../../App"
import * as api from "../../lib/api"

jest.mock("../../lib/api")

beforeEach(() => {
  api.fetchProducts.mockImplementation(() => Promise.resolve([]))
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
    expect(console.log.mock.calls[1][0]).toBe("clicked")
  })
})

it("fetches products on mount", async () => {
  api.fetchProducts.mockImplementation(() => Promise.resolve([PRODUCT_FOO, PRODUCT_BAR]))

  render(<App />)

  await waitFor(() => {
    expect(console.log.mock.calls[0][0]).toBe("Fetching products")

    const productFoo = screen.getByText(/Product Foo/i)
    expect(productFoo).toBeInTheDocument()

    const productBar = screen.getByText(/Product Bar/i)
    expect(productBar).toBeInTheDocument()
  })
})

it("searches products", async () => {
  jest.spyOn(console, "log")

  api.fetchProducts.mockImplementation(() => Promise.resolve([PRODUCT_FOO, PRODUCT_BAR]))
  api.searchProducts.mockImplementation(() => Promise.resolve([PRODUCT_FOO]))

  render(<App />)

  await waitFor(() => {
    expect(console.log.mock.calls[0][0]).toBe("Fetching products")

    const searchInput = screen.getByPlaceholderText(/Search/i)
    fireEvent.change(searchInput, { target: { value: "Foo" } })

    expect(console.log.mock.calls[1][0]).toBe("Searching products")

    const productFoo = screen.getByText(/Product Foo/i)
    expect(productFoo).toBeInTheDocument()

    expect(screen.queryByText(/Product Bar/i)).toBe(null)
  })
})
