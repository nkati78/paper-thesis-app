import { ReactNode } from "react";
import { classes } from "../lib/std";
import Navbar from "./components/navbar/navbar";
import "./globals.css";
import { auth } from "../auth";
import { SessionProvider } from "next-auth/react";
import StoreProvider from "../lib/redux/StoreProvider";
import settings from "../lib/settings";
import { positionState, symbolWatchState } from "../types/redux_types";
import Script from "next/script";

// TODO: FIX POSITIONS PULL ONCE ENDPOINT IS SHOWING PROPER DATA

export default async function RootLayout ({
    children
}: {
    children: ReactNode
}) {

    let preloadedState;

    const session = await auth();

    if (session && session.user) {

        try {

            const symbolsToWatch: string[] = [];
            const symbolWatch: symbolWatchState[] = [];
            let positionWatch: positionState[] = [];

            const balance = await fetch(settings.pt_api.balance, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${session.user.token}`,
                },
                cache: 'no-store',
            }).then((res) => res.json());

            const positionsResponse = await fetch(settings.pt_api.positions, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `${session.user.token}`,
                },
                cache: 'no-store',
            }).then((res) => res.json());

            const watchlistResponse = await fetch(settings.pt_api.watchlist, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `${session.user.token}`,
                },
                cache: 'no-store',
            }).then((res) => res.json());

            const symbolsResponse = await fetch(settings.pt_api.symbols, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `${session.user.token}`,
                },
                cache: 'no-store',
            }).then((res) => res.json());

            if (positionsResponse && positionsResponse.length > 0) {

                for (let i = 0; i < positionsResponse.length; i++) {

                    const position = positionsResponse[i];

                    symbolsToWatch.push(position.symbol);

                    positionWatch.push({
                        id: position.id,
                        userId: position.userId,
                        currentPrice: 0,  //TODO
                        costBasis: (position.costBasis ? position.costBasis : 150000) / position.quantity,
                        // averagePrice: position.averagePrice, //TODO: Change once averagePrice is using the new int strat
                        averagePrice: (position.costBasis ? position.costBasis : 150000) / position.quantity,
                        quantity: position.quantity,
                        direction: position.direction,
                        orderId: position.orderId,
                        profitLoss: position.profitLoss,
                        symbol: position.symbol,
                        status: position.status,
                        value: 0, //TODO
                        dayChangePct: 5.23,
                        dayChangeDollar: 10000,
                        totalChangeDollar: 235400,
                        totalChangePct: 20.45,
                        createdAt: position.createdAt,
                        updatedAt: position.updatedAt,
                    });



                }

            }

            if (watchlistResponse && watchlistResponse.length > 0) {

                for (let i = 0; i < watchlistResponse.length; i++) {

                    const watchlistItem = watchlistResponse[i];

                    if (!symbolsToWatch.includes(watchlistItem.symbol)) {

                        symbolsToWatch.push(watchlistItem.symbol);

                    }

                }

            }

            if (symbolsToWatch.length === 0) {

                symbolsToWatch.push('MSFT');

            }

            if (symbolsToWatch.length > 0) {

                for (let i = 0; i < symbolsToWatch.length; i++) {

                    const symbol = symbolsToWatch[i];

                    const symbolFetch = await fetch(`${settings.pt_api.symbol}/${symbol}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": `${session.user.token}`,
                        },
                        cache: 'no-store',
                    }).then((res) => res.json());

                    symbolWatch.push({
                        id: symbolFetch.id,
                        symbol: symbolFetch.symbol,
                        exchange: '', //TODO: Pull exchange from the bulk symbols response
                        price: symbolFetch.price,
                        lastPrice: symbolFetch.startingPrice,
                        dayChangeDollar: symbolFetch.priceChange,
                        dayChangePercent: symbolFetch.percentageChange,
                    });

                    positionWatch = positionWatch.map(pos => {

                        if (pos.symbol === symbol) {

                            return {
                                ...pos,
                                currentPrice: symbolFetch.price,
                                value: symbolFetch.price * pos.quantity,
                            };

                        }

                        return pos;

                    });

                }

            }

            preloadedState = {
                positions: positionWatch || [],
                user: {
                    id: '12345',
                    fn: session.user.firstName,
                    ln: session.user.lastName,
                    email: session.user.email,
                    avatar: session.user.image ? session.user.image : '/assets/placeholder-user.jpg',
                    dark_mode: true,
                    current_path: '/dashboard',
                    previous_path: '/auth/login',
                    username: session.user.username,
                    wallet: balance.balance
                },
                watchlist: watchlistResponse || [],
                symbols: symbolsResponse || [],
                symbolWatch: symbolWatch,
            };

        } catch (err) {

            console.log(err);

        }

    }

    return (
        <html lang="en">
            <Script strategy={"afterInteractive"} src="https://www.googletagmanager.com/gtag/js?id=G-TT1BZZBVZ3"></Script>
            <Script id={"google-analytics"} strategy={"afterInteractive"}>
                {`window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
    
                        gtag('config', 'G-TT1BZZBVZ3')`};
            </Script>
            <body className={classes(['flex min-h-screen w-full flex-col dark'])} >
                <SessionProvider session={session}>
                    <StoreProvider preloadedState={preloadedState}>
                        {session?.user ? (
                            <Navbar/>
                        ) : ''}
                        {children}
                    </StoreProvider>
                </SessionProvider>
            </body>
        </html>
    );

}