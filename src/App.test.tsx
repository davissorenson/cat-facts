import React from "react"
import { render } from "@testing-library/react"
import App from "./App"

test("loads cat facts", () => {
  const { getByText } = render(<App />)
  const factLoaderButton = getByText(/load facts/i)
  factLoaderButton.click()
  const catFact = getByText(/dummy cat fact 1/i)
  expect(catFact).toBeInTheDocument()
})
