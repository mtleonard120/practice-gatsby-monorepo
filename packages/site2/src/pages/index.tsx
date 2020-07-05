import React from "react"

// packages
import { Link } from "gatsby"

// components
import { Layout, SEO } from "@practice-gatsby-monorepo/shared"
import { Image } from "../components"

// primary component
const IndexPage: React.FC = () => (
  <Layout>
    <SEO title="Home" />
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/bulbasaur/">Go to Bulbasaur</Link> <br />
  </Layout>
)

export default IndexPage
