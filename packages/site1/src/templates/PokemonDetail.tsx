import React from "react"

// packages
import { graphql, PageProps } from "gatsby"

// types
export interface IPokemonDetailData {
  pokemon: {
    name: string
    weight: string
  }
}

// primary component
const PokemonDetail: React.FC<PageProps<IPokemonDetailData>> = ({
  data: {
    pokemon: { name, weight },
  },
}) => {
  return (
    <div>
      I'm the detail page for {name}! This pokemon weighs {weight} pounds.
    </div>
  )
}

export default PokemonDetail

graphql`
  query($name: String!) {
    pokemon(name: { eq: $name }) {
      name
      weight
    }
  }
`
