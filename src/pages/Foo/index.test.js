import { fireEvent, render, screen, waitFor } from "@testing-library/react"

import App from "../../App"
import { productsStore } from "../../store/products.store"

jest.mock("../../store/products.store")

beforeEach(() => {
  productsStore.fetch.mockImplementation(() => Promise.resolve([]))
})

test("renders button, logging the click event", async () => {
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
  productsStore.fetch.mockImplementationOnce(() =>
    Promise.resolve([
      { id: 1, title: "Product #1" },
      { id: 2, title: "Product #2" },
    ])
  )

  render(<App />)

  await waitFor(() => {
    const product1 = screen.getByText(/Product #1/i)
    expect(product1).toBeInTheDocument()

    const product2 = screen.getByText(/Product #2/i)
    expect(product2).toBeInTheDocument()
  })
})

it("searches products", async () => {
  productsStore.fetch.mockImplementationOnce(() =>
    Promise.resolve([
      { id: 1, title: "Product #1" },
      { id: 2, title: "Product #2" },
    ])
  )

  productsStore.search.mockImplementationOnce(() =>
    Promise.resolve([{ id: 1, title: "Product #1" }])
  )

  render(<App />)

  await waitFor(() => {
    const searchInput = screen.getByPlaceholderText(/Search/i)
    fireEvent.change(searchInput, { target: { value: "#1" } })

    const product1 = screen.getByText(/Product #1/i)
    expect(product1).toBeInTheDocument()

    expect(screen.queryByText(/Product #2/i)).toBe(null)
  })
})
