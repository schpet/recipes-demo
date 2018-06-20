import React from "react"
import PropTypes from "prop-types"

import Dashboard from "./screens/Dashboard"

import { ApolloClient } from "apollo-client"
import { createHttpLink } from "apollo-link-http"
import { setContext } from "apollo-link-context"
import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloProvider } from "react-apollo"

import config from "./config"

const httpLink = createHttpLink({
  uri: config.graphQLEndpoint,
  credentials: "same-origin",
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

export default () => (
  <ApolloProvider client={client}>
    <Dashboard />
  </ApolloProvider>
)
