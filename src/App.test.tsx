import React from "react"
import { render } from "@testing-library/react"
import App from "./App"

test("renders learn react link", () => {
  const { getByText } = render(<App />)
  const catFact = getByText(/dummy cat fact 1/i)
  expect(catFact).toBeInTheDocument()
})
