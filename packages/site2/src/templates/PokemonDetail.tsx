import React from "react"
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
  path,
  data,
}) => {
  const {
    pokemon: { name, weight },
  } = data
  return (
    <div>
      I'm the detail page for {name}! This pokemon weighs {weight} pounds.
    </div>
  )
}

export default PokemonDetail

export const query = graphql`
  query($name: String!) {
    pokemon(name: { eq: $name }) {
      name
      weight
    }
  }
`
