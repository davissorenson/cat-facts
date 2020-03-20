import React from "react"

import Fact from "../../interfaces/Fact"

import "./CatFact.css"

type CatFactProps = Fact

export const CatFact = ({ text }: CatFactProps): JSX.Element => (
  <li className="cat-fact">
    <p className="cat-fact-text">{text}</p>
  </li>
)
