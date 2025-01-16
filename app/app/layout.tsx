import { ReactNode } from "react";
import { classes } from "../lib/std";
import Navbar from "./components/navbar/navbar";
import "./globals.css";
import { auth } from "../auth";
import { SessionProvider } from "next-auth/react";
import StoreProvider from "../lib/redux/StoreProvider";

// TODO: Pull user, profile, & balances here and pass to navbar

export default async function RootLayout ({
    children
}: {
    children: ReactNode
}) {

    // let user;
    // let profile;
    // let balance;
    let pt_user;

    const session = await auth();

    if (session && session.user) {

        try {

            // TODO: HOOK UP THE API ENDPOINTS BELOW
            // user = await fetch('');
            // profile = await fetch('');
            // balance = await fetch('');
            pt_user = {
                id: '12345',
                fn: session.user.name!.split(' ')[0],
                ln: session.user.name!.split(' ')[1],
                email: session.user.email,
                avatar: session.user.image ? session.user.image : '/assets/placeholder-user.jpg',
                username: "TangledCheese47",
                wallet: 20000
            };

        } catch (err) {

            console.log(err);

        }

    }

    return (
        <html lang="en">

            <body className={classes(['flex min-h-screen w-full flex-col dark'])} >

                <SessionProvider session={session}>

                    <StoreProvider>

                        {session?.user ? (
                            <Navbar
                                userData={pt_user}
                            />
                        ) : ''}

                        {children}

                    </StoreProvider>

                </SessionProvider>

            </body>

        </html>
    );

}