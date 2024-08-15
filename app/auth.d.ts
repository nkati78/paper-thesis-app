import {type DefaultSession, User} from "next-auth";

declare module "next-auth" {

    interface User {
        id: string,
        username: string,
        firstName: string,
        lastName: string,
        token: string,
        connection?: string,
        image: string
    }

    interface Session {
        user: User & DefaultSession['user'];
    }

}

declare module "@auth/core/adapters" {
    interface AdapterUser extends User {
        id: string,
        username: string,
        firstName: string,
        lastName: string,
        token: string,
        connection?: string,
        image: string
    }
}

// declare module "next-auth/jwt" {
//
//     interface JWT {
//
//         idToken?: string
//     }
// }