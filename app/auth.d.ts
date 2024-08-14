import type { DefaultSession } from '@auth/core/types';
import {AdapterUser} from "@auth/core/adapters";

declare module '@auth/core/types' {
    interface Session {
        user: {
            id: string,
            username: string,
            firstName: string,
            lastName: string,
            token: string,
            connection?: string,
            image: string,
        } & DefaultSession['user'] & AdapterUser;
    }

    // interface User {
    //     id: string,
    //     username: string,
    //     firstName: string,
    //     lastName: string,
    //     token: string,
    //     connection?: string,
    //     image: string
    // }

}