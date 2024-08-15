import NextAuth, {User} from "next-auth";
import Google from "@auth/core/providers/google";
import Credentials from "@auth/core/providers/credentials";
import settings from "./lib/settings";
import { JWT } from "@auth/core/jwt";


interface credToken extends JWT {
    id: string,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    token: string,
    name: string,
    connection?: string
    image: string,
}

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [Google, Credentials({
        credentials: {
            email: {},
            password: {},
            firstName: {},
            lastName: {},
            username: {},
            type: {},
        },
        authorize: async (credentials) => {

            let user;

            if (credentials.type === 'login') {

                const body = {
                    username: credentials.email,
                    password: credentials.password
                };

                const user_fetch = await fetch(settings.pt_api.login, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body)
                }).then((res) => res.json());

                if (user_fetch.token) {

                    interface augmented_api_login_response {
                        ID: string,
                        Username: string,
                        Email: string,
                        FirstName: string,
                        LastName: string
                    }

                    const augmented_response = user_fetch.user as augmented_api_login_response;

                    user = {
                        id: augmented_response.ID,
                        username: augmented_response.Username,
                        email: augmented_response.Email,
                        firstName: augmented_response.FirstName,
                        lastName: augmented_response.LastName
                    };

                    // TODO: Remove augmmentation once responses are consistent

                    user!.token = user_fetch.token;

                } else if (user_fetch.message) {

                    throw new Error(user_fetch.message);

                } else {

                    user = null;

                }

            }

            if (credentials.type === 'register') {

                const body = {
                    username: credentials.username,
                    password: credentials.password,
                    email: credentials.email,
                    firstName: credentials.firstName,
                    lastName: credentials.lastName
                };

                const user_fetch = await fetch(settings.pt_api.register, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body)
                }).then((res) => res.json());

                if (user_fetch.token) {

                    user = user_fetch.user;
                    user.token = user_fetch.token;

                } else if (user_fetch.message) {

                    throw new Error(user_fetch.message);

                }

            }


            if (!user) {

                throw new Error("User not found.");

            }

            return user;

        }

    })],
    pages: {
        signIn: "/auth/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 90 * 24 * 60 * 60,
    },
    callbacks: {
        // authorized: async ({ auth }) => {
        //
        //     return !!auth
        //
        // },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async signIn({ user, account, profile, email, credentials }) {

            return true;

        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async redirect({ url, baseUrl }) {

            return baseUrl;

        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async session({ session, user, token }) {

            const aug_tok = token as credToken;

            if (aug_tok) {

                // TODO; Figure out why auth.js is having so much trouble augmenting this type
                // TODO: Rewrite this after login endpoint changes
                // session.user = {
                //     id: aug_tok.id,
                //     username: aug_tok.username,
                //     firstName: aug_tok.firstName,
                //     lastName: aug_tok.lastName,
                //     name: aug_tok.firstName + ' ' + aug_tok.lastName,
                //     email: aug_tok.email,
                //     token: aug_tok.token,
                //     connection: aug_tok.connection,
                //     image: aug_tok.image
                // };

            }

            return session;

        },
        async jwt({ token, user, account }) {

            if (account?.provider === 'credentials' && user) {

                token = user as credToken;

                return token;


            }

            if (account?.provider === 'google' && user) {

                //     TODO: At this point we need to hit the DB and get the user information so we can build the token. Will do once we have an endpoint worked out

            }

            return token;

        }

    }

});