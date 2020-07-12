import React from "react"

import { CountContextProvider } from "../shared/contexts"

export const wrapRootElement = ({ element }) => (
  <CountContextProvider>{element}</CountContextProvider>
)
