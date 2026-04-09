import { DefaultUser } from "next-auth";

declare module "next-auth" {

    interface User extends DefaultUser {
        username: string,
        firstName: string,
        lastName: string,
        token: string,
        connection?: string,
        user_id: string,
        image?: string
    }

    interface Session {
        user: {
            username: string,
            firstName: string,
            lastName: string,
            token: string,
            connection?: string,
            user_id: string,
            image?: string
        } & DefaultUser;
    }

}

declare module "next-auth/jwt" {

    interface JWT extends DefaultJWT {
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        token: string;
        connection?: string;
        user_id: string;
        image?: string;
    }
}