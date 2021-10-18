import { withApollo as createWithApollo } from "next-apollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { PaginatedIdeas } from "../generated/graphql";

const apolloClient = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          ideas: {
            keyArgs: false, //the cache shouldn't store a separate result based on any argument value(limit, cursor)
            merge(
              existing: PaginatedIdeas | undefined,
              incoming: PaginatedIdeas
            ): PaginatedIdeas {
              return {
                ...incoming,
                ideas: [...(existing?.ideas || []), ...incoming.ideas],
              };
            },
          },
        },
      },
    },
  }),
  credentials: "include",
});
export const withApollo = createWithApollo(apolloClient);
