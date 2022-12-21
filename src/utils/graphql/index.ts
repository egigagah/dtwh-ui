import { GraphQLClient } from "graphql-request";
import * as Auth from "./Auth";

const useGraphql = new GraphQLClient(
    (process.env.NEXT_PUBLIC_API_URL as string) ||
        "http://localhost:80/graphql",
    {
        headers: {},
    },
);

export default useGraphql;
export const AuthClient = { ...Auth };
