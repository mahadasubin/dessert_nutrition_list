import { ApolloClient } from "apollo-boost";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const cache = new InMemoryCache();

const httpLink = createHttpLink({
  uri: "http://localhost:4000"
});

const client = new ApolloClient({
  link: httpLink,
  cache
});

export default client;
