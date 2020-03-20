import React from "react"
import { render, waitForElement, fireEvent } from "@testing-library/react"
import App from "./App"

test("loads cat facts", async () => {
  const { getByText } = render(<App deterministic={true} />)
  const factLoaderButton = getByText(/load more facts/i)

  fireEvent.click(factLoaderButton, { button: 1 })
  const firstFact = await waitForElement(() =>
    getByText(/By the time a cat is 9 years old/i)
  )

  expect(firstFact).toBeInTheDocument()
})

test("toggles mute correctly", async () => {
  const { getByText } = render(<App />)
  const muteButton = getByText(/volume_up/i)

  expect(muteButton).toBeInTheDocument()
  fireEvent.click(muteButton, { button: 1 })

  const unmuteButton = getByText(/volume_off/i)
  expect(unmuteButton).toBeInTheDocument()

  fireEvent.click(unmuteButton, { button: 1 })
  expect(muteButton).toBeInTheDocument()
})
