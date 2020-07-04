const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allPokemon {
        edges {
          node {
            name
          }
        }
      }
    }
  `)

  result.data.allPokemon.edges.forEach(({ node }) => {
    createPage({
      path: `/${node.name}`,
      component: path.resolve(`./src/templates/PokemonDetail.tsx`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        name: node.name,
      },
    })
  })
}
