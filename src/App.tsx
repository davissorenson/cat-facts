import React from "react"

import Fact from "./interfaces/Fact"
import { CatFact } from "./components/CatFact"

const dummyFacts: Partial<Fact>[] = [
  {
    text: "Dummy cat fact 1"
  },
  {
    text: "Dummy cat fact 2"
  }
]

function App(): JSX.Element {
  return (
    <div className="App">
      <ul>
        {dummyFacts.map((fact, i) => (
          <CatFact key={i} {...fact} />
        ))}
      </ul>
    </div>
  )
}

export default App
