import React from "react"

// components
import { Layout, SEO } from "@practice-gatsby-monorepo/shared"

// primary component
const NotFoundPage: React.FC = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
)

export default NotFoundPage
