import React from "react"

// packages
import { graphql, PageProps } from "gatsby"
import Img from "gatsby-image"

// components
import { Layout, SEO } from "@practice-gatsby-monorepo/shared"

// types
export interface IPokemonDetailData {
  pokemon: {
    name: string
    height: string
    weight: string
    sprite: any
  }
}

// primary component
const PokemonDetail: React.FC<PageProps<IPokemonDetailData>> = ({
  data: {
    pokemon: { name, height, weight, sprite },
  },
}) => {
  const capName = `${name.charAt(0).toUpperCase() + name.slice(1)}`

  return (
    <Layout>
      <SEO title={capName} />

      <h1>{capName}</h1>

      <div style={{ marginBottom: 10 }}>
        <Img
          fixed={sprite.childImageSharp.fixed}
          style={{ border: "1px solid black", padding: 20 }}
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
      sprite {
        childImageSharp {
          fixed(width: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
`
