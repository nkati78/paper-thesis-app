import { ReactNode } from "react";
import { classes } from "../lib/std";
import Navbar from "./components/navbar";
import "./globals.css";
import { auth } from "../auth";
import { SessionProvider } from "next-auth/react";
import StoreProvider from "../lib/redux/StoreProvider";

export default async function RootLayout ({
    children,
}: {
    children: ReactNode
}) {

    const session = await auth();

    return (
        <html lang="en">

            <body className={classes(['flex min-h-screen w-full flex-col dark'])} >

                <SessionProvider session={session}>

                    <StoreProvider>

                        {session?.user ? (
                            <Navbar session={session}/>
                        ) : ''}

                        {children}

                    </StoreProvider>

                </SessionProvider>

            </body>

        </html>
    );

}