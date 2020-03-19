import React from "react"
import { render, waitForElement } from "@testing-library/react"
import App from "./App"

test("loads cat facts", async () => {
  const { getByText } = render(<App deterministic={true} />)
  const factLoaderButton = getByText(/load facts/i)
  factLoaderButton.click()

  const firstFact = await waitForElement(() =>
    getByText(/By the time a cat is 9 years old/i)
  )

  expect(firstFact).toBeInTheDocument()
})
