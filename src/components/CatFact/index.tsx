import React from "react"

import Fact from "../../interfaces/Fact"

type CatFactProps = Partial<Fact>

export const CatFact = ({ text }: CatFactProps): JSX.Element => <li>{text}</li>
