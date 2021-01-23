import { fireEvent, render, screen, waitFor } from "@testing-library/react"

import App from "../../App"

jest.spyOn(console, "log")

test("renders button, logging the click event", async () => {
  render(<App />)

  await waitFor(() => {
    const btnElement = screen.getByText(/Click me!/i)
    expect(btnElement).toBeInTheDocument()

    fireEvent.click(btnElement)
    expect(console.log.mock.calls[0][0]).toBe("clicked")
  })
})
