const axios = require("axios")

const get = endpoint => axios.get(`https://pokeapi.co/api/v2${endpoint}`)

const getPokemonNames = async numberOfPokemon => {
  const {
    data: { results },
  } = await get(`/pokemon?limit=${numberOfPokemon}`)

  const names = results.map(r => r.name)
  return names
}

const getPokemonData = async names => {
  let results = []
  let chunk = 10
  try {
    for (let i = 0; i < names.length; i += chunk) {
      const batch = names.slice(i, i + chunk)
      const requests = batch.map(name => get(`/pokemon/${name}`))
      const responses = await Promise.all(requests)
      results = results.concat(
        responses.map(axResult => ({
          ...axResult.data,
        }))
      )
    }
  } catch (e) {
    console.error(e)
  }

  return results
}

const getAllPokemonData = async numberOfPokemon => {
  const names = await getPokemonNames(numberOfPokemon)
  const data = await getPokemonData(names)

  return data
}

exports.sourceNodes = async (
  { actions, cache, createNodeId, createContentDigest },
  { cacheLengthInHours = 1, numberOfPokemon = 1000 }
) => {
  console.log("cache length in hours: ", cacheLengthInHours)
  const cacheLengthInMS = cacheLengthInHours * 60 * 60 * 1000

  const lastFetched = await cache.get(`timestamp`)
  const timeSinceFetch = lastFetched
    ? Date.now() - lastFetched
    : cacheLengthInMS + 1
  const shouldUseCache = timeSinceFetch <= cacheLengthInMS

  console.log("last fetched: ", lastFetched)
  console.log("time since last fetch: ", timeSinceFetch)

  let data

  if (shouldUseCache) {
    data = await cache.get(`pokemonData`)
  } else {
    data = await getAllPokemonData(numberOfPokemon)
    await cache.set(`timestamp`, Date.now())
    await cache.set(`pokemonData`, data)
  }

  data.forEach(pokemon => {
    const node = {
      ...pokemon,
      id: createNodeId(`Pokemon-${pokemon.name}`),
      internal: {
        type: "Pokemon",
        contentDigest: createContentDigest(pokemon),
      },
    }
    actions.createNode(node)
  })
}
