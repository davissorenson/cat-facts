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

interface CatFactsState {
  facts: Partial<Fact>[]
}

class App extends React.Component<{}, CatFactsState> {
  constructor(props: {}) {
    super(props)

    this.state = {
      facts: []
    }
  }

  fetchFacts = (): void => {
    this.setState({
      facts: dummyFacts
    })
  }

  render(): JSX.Element {
    return (
      <div className="App">
        {this.state.facts.length > 0 ? (
          <ul>
            {this.state.facts.map((fact, i) => (
              <CatFact key={i} {...fact} />
            ))}
          </ul>
        ) : (
          <p>Loading...</p>
        )}
        <button onClick={this.fetchFacts}>Load facts</button>
      </div>
    )
  }
}

export default App
