import { GraphQLClient } from "graphql-request";

const useGraphql = new GraphQLClient(
    (process.env.NEXT_PUBLIC_API_URL as string) ||
        "http://localhost:80/graphql",
    {
        headers: {},
    },
);

export default useGraphql;
