import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com", // just for testing purposes
  cache: new InMemoryCache(),
});

export default client;
