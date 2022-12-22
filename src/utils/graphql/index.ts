import { GraphQLClient } from "graphql-request";
import * as Auth from "./Auth";

const useGraphql = new GraphQLClient(
    process.env.NEXT_PUBLIC_BASE_URL + "/graphql",
    {
        headers: {},
    },
);

export default useGraphql;
export const AuthClient = { ...Auth };
