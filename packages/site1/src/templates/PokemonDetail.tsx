import React from "react"

// packages
import { graphql, PageProps } from "gatsby"

// components
import { Layout, SEO } from "@practice-gatsby-monorepo/shared"

// types
export interface IPokemonDetailData {
  pokemon: {
    name: string
    height: string
    weight: string
    sprites: {
      front_default: string
    }
  }
}

// primary component
const PokemonDetail: React.FC<PageProps<IPokemonDetailData>> = ({
  data: {
    pokemon: {
      name,
      height,
      weight,
      sprites: { front_default },
    },
  },
}) => {
  const capName = `${name.charAt(0).toUpperCase() + name.slice(1)}`

  return (
    <Layout>
      <SEO title={capName} />

      <h1>{capName}</h1>

      <div style={{ marginBottom: 10 }}>
        <img
          src={front_default}
          style={{ border: "1px solid black", width: 200 }}
        />
      </div>

      <dl>
        <dt>Name</dt>
        <dd>{capName}</dd>

        <dt>Height</dt>
        <dd>{`${height} ft`}</dd>

        <dt>Weight</dt>
        <dd>{`${weight} lbs`}</dd>
      </dl>
    </Layout>
  )
}

export default PokemonDetail

export const query = graphql`
  query($name: String!) {
    pokemon(name: { eq: $name }) {
      name
      height
      weight
      sprites {
        front_default
      }
    }
  }
`
