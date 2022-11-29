import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { AuthClient } from "src/utils/graphql";

const providers = [
    Credentials({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: "Credentials",
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, email, password, 2FA token, etc.
        credentials: {
            email: {
                label: "Email",
                type: "text",
                placeholder: "email@domain.com",
            },
            password: {
                label: "Password",
                type: "password",
                placeholder: "*******",
            },
        },
        async authorize(credentials) {
            // Add logic here to look up the user from the credentials supplied
            try {
                const token = await AuthClient.loginGql(credentials);

                if (token) {
                    // Any object returned will be saved in `user` property of the JWT
                    return token.login;
                }

                return null;
            } catch (error: any) {
                throw new Error(error);
            }
        },
    }),
];

export const authOptions: NextAuthOptions = {
    secret: process.env.AUTH_SECRET,
    providers,
    callbacks: {
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user?.accessToken;
            }
            return token;
        },
    },
    pages: {
        error: "/", // Changing the error redirect page to our custom login page
    },
};

export default NextAuth(authOptions);
