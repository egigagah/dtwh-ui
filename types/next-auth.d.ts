import { JWT, DefaultJWT } from "next-auth/jwt";
import NextAuth, {
    DefaultSession,
    Session,
    User,
    DefaultUser,
} from "next-auth";

/** Example on how to extend the built-in session types */
declare module "next-auth" {
    interface Session {
        /** This is an example. You can find me in types/next-auth.d.ts */
        accessToken?: string;
        user?: DefaultSession["user"];
        expires: DefaultSession["expires"];
    }
}

/** Example on how to extend the built-in types for JWT */
declare module "next-auth/jwt" {
    interface JWT {
        /** This is an example. You can find me in types/next-auth.d.ts */
        email?: DefaultJWT["email"];
        name?: DefaultJWT["name"];
        picture?: DefaultJWT["picture"];
        sub?: DefaultJWT["sub"];
        accessToken?: string;
    }
}

declare module "next-auth" {
    interface User {
        /** This is an example. You can find me in types/next-auth.d.ts */
        id?: DefaultUser["id"];
        email?: DefaultUser["email"];
        name?: DefaultUser["name"];
        accessToken: string;
        roles: string[];
    }
}
