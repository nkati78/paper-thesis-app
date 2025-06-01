import NextAuth, { Session } from "next-auth";
import Google from "@auth/core/providers/google";
import Credentials from "@auth/core/providers/credentials";
import settings from "./lib/settings";
import { JWT } from "@auth/core/jwt";

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
        async authorize(credentials) {

            let user;

            if (credentials.type === 'login') {

                const body = {
                    Email: credentials.email,
                    Password: credentials.password
                };

                const user_fetch = await fetch(settings.pt_api.login, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body)
                }).then((res) => res.json());

                if (user_fetch.token) {

                    return {
                        user_id: user_fetch.user.id,
                        username: user_fetch.user.username,
                        email: user_fetch.user.email,
                        firstName: user_fetch.user.firstName,
                        lastName: user_fetch.user.lastName,
                        token: user_fetch.token,
                        // connection: user_fetch.connection,
                        // image: user_fetch.image || null,
                    };

                } else if (user_fetch.message) {

                    throw new Error(user_fetch.message);

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
                    
                    return user;

                } else if (user_fetch.message) {

                    throw new Error(user_fetch.message);

                }

            }

            if (!user) {

                throw new Error("User not found.");

            }

            return null;

        }

    })],
    pages: {
        signIn: "/auth/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 90 * 24 * 60 * 60,
    },
    trustHost: true,
    callbacks: {

        async signIn() {

            return true;

        },

        async redirect({ url, baseUrl }) {

            return url.startsWith(baseUrl) ? url : baseUrl;

        },

        async session({ session, token }: { session: Session, token: JWT }) {

            return {
                ...session,
                user: token.user,
            };

        },
        async jwt({ token, user, account }) {

            if (account?.provider === 'credentials' && user) {

                return {
                    ...token,
                    user: {
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        token: user.token,
                        connection: user.connection,
                        user_id: user.id,
                        image: user.image,
                    }
                };

            }

            if (account?.provider === 'google' && user) {

                //     TODO: At this point we need to hit the DB and get the user information so we can build the token. Will do once we have an endpoint worked out

            }

            return token;

        }

    }

});