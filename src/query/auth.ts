import { gql } from "graphql-request";

export const loginUserModel = gql`
    mutation ($email: String!, $password: String!) {
        login(params: { email: $email, password: $password }) {
            accessToken: access_token
            email
            name
            roles
        }
    }
`;
