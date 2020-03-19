import React from "react"
import axios from "axios"

import Fact from "./interfaces/Fact"
import { CatFact } from "./components/CatFact"
import { Spinner } from "./components/Spinner"

interface CatFactsResponse {
  all: Fact[]
}

interface CatFactsProps {
  // TIL: the JS RNG is not seedable. so we do this instead.
  deterministic?: boolean
}

interface CatFactsState {
  facts: Fact[]
  loading: boolean
  error?: string
  muted: boolean
}

class App extends React.Component<CatFactsProps, CatFactsState> {
  private audio = new Audio("/batman.ogg")

  constructor(props: CatFactsProps) {
    super(props)

    this.state = {
      facts: [],
      loading: false,
      muted: false
    }
  }

  componentDidMount() {
    this.fetchFacts()
  }

  toggleMute = (): void => {
    this.setState({ muted: !this.state.muted })
  }

  fetchFacts = (): void => {
    // the cat facts API does not send the CORS header (Access-Control-Allow-Origin: *) that would
    // allow us to query it directly. instead, we put it through a CORS proxy. the real fix would be
    // to add that header to the server response, but I would rather use a proxy for this demo app
    // than spin up a free heroku dyno.
    this.setState({ facts: [], loading: true, error: undefined })

    if (!this.state.muted) this.audio.play()

    axios
      .get<CatFactsResponse>(
        "https://cors-anywhere.herokuapp.com/https://cat-fact.herokuapp.com/facts"
      )
      .then(response => {
        const facts = response.data.all
        const numberOfFacts = facts.length
        const fiveRandomIndices = Array.from(Array(5)).map(_ =>
          Math.floor(Math.random() * numberOfFacts)
        )

        if (!this.props.deterministic) {
          this.setState({
            facts: fiveRandomIndices.map(i => facts[i]),
            loading: false
          })
        } else {
          this.setState({
            facts: [1, 2, 3, 4, 5].map(i => facts[i]),
            loading: false
          })
        }
      })
      .catch(error => this.setState({ error: error.message, loading: false }))
  }

  render(): JSX.Element {
    return (
      <div className="App">
        {this.state.error && (
          <div className="alert alert-danger">{this.state.error}</div>
        )}
        {this.state.facts.length > 0 && (
          <ul>
            {this.state.facts.map((fact, i) => (
              <CatFact key={i} {...fact} />
            ))}
          </ul>
        )}
        {this.state.loading && <Spinner />}
        <button onClick={this.fetchFacts}>Load facts</button>
        <button onClick={this.toggleMute}>
          {this.state.muted ? "Unmute audio" : "Mute audio"}
        </button>
      </div>
    )
  }
}

export default App
