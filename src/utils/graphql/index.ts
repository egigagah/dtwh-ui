import { GraphQLClient } from "graphql-request";
import * as Auth from "./Auth";

const useGraphql = new GraphQLClient("/graphql", {
    headers: {},
});

export default useGraphql;
export const AuthClient = { ...Auth };
