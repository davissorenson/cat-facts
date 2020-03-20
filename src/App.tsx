import React from "react"
import axios from "axios"

import Alert from "react-bootstrap/Alert"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import Fact from "./interfaces/Fact"
import { CatFact } from "./components/CatFact"
import { Spinner } from "./components/Spinner"

import "./App.css"

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
      muted: this.isMuted()
    }
  }

  isMuted = (): boolean => document.cookie === "muted"

  componentDidMount() {
    // if a call to audio.play() cannot be traced back to a user-triggered event like a mouse click,
    // most browsers will put an ugly error in the console, and some won't play the audio at all.
    // componentDidMount() is not user-triggered so we tell fetchFacts to skip the audio.play() call
    this.fetchFacts({ userTriggered: false })
  }

  toggleMute = (): void => {
    // decided to put this in a cookie in case someone hates the audio and needs to refresh the page
    // we need to change the state when we toggle the audio, otherwise react won't update the DOM
    if (this.isMuted()) {
      document.cookie = ""
      this.setState({ muted: false })
    } else {
      document.cookie = "muted"
      this.setState({ muted: true })
    }
  }

  fetchFacts = ({ userTriggered }: { userTriggered: boolean }): void => {
    this.setState({ facts: [], loading: true, error: undefined })

    if (!this.state.muted && userTriggered) this.audio.play()

    // the cat facts API does not send the CORS header (Access-Control-Allow-Origin: *) that would
    // allow us to query it directly. instead, we put it through a CORS proxy. the real fix would be
    // to add that header to the server response, but I would rather use a proxy for this demo app
    // than spin up a free heroku dyno.
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
        <Container>
          <Row>
            <Col>
              <header>
                <h1 id="logo">Cat Facts</h1>
                <h2 id="subheading">Facts about Cats</h2>
              </header>
            </Col>
          </Row>
          <Row>
            <Col>
              {this.state.error && (
                <Alert variant="danger">{this.state.error}</Alert>
              )}
              {this.state.facts.length > 0 && (
                <ul>
                  {this.state.facts.map((fact, i) => (
                    <CatFact key={i} {...fact} />
                  ))}
                </ul>
              )}
            </Col>
          </Row>
          {this.state.loading ? (
            <Spinner />
          ) : (
            <Row>
              <Col>
                <button
                  className="btn btn-primary"
                  onClick={() => this.fetchFacts({ userTriggered: true })}
                >
                  Load facts
                </button>
                <button className="btn btn-secondary" onClick={this.toggleMute}>
                  {this.state.muted ? "Unmute audio" : "Mute audio"}
                </button>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    )
  }
}

export default App
