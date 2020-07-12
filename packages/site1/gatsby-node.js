const path = require(`path`)
const { createRemoteFileNode } = require("gatsby-source-filesystem")

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type Pokemon implements Node {
      sprite: File @link(from: "sprite___NODE")
    }
  `)
}

exports.onCreateNode = async ({
  node,
  actions: { createNode },
  store,
  cache,
  createNodeId,
}) => {
  if (node.internal.type === "Pokemon" && node.sprites.front_default !== null) {
    let fileNode = await createRemoteFileNode({
      url: node.sprites.front_default, // string that points to the URL of the image
      parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
      cache, // Gatsby's cache
      store, // Gatsby's redux store
    })

    // if the file was created, attach the new node to the parent node
    if (fileNode) {
      node.sprite___NODE = fileNode.id
    }
  }
}

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
