'use client';

import React from "react";
import { dashboardWatchList } from "../../../types/pt_types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shadcn/table";
import { Button } from "@/shadcn/button";
import { removeWatchlistSymbolBySymbol } from "@/redux/watchlist/watchlistSlice";
import { useAppDispatch } from "../../../lib/redux/hooks";
import { selectUser } from "@/redux/user/userSlice";
import { useSelector } from "react-redux";
import { watchlist_remove } from "../../../lib/std";
import { selectAllPositions } from "@/redux/positions/positionsSlice";
import { removeSymbolFromWatch } from "@/redux/symbols/symbolWatchSlice";

// TODO: NEED TO NOT REMOVE FROM SYMBOLS TO WATCH IF ITS THE CHART SYMBOL
// TODO: MEED TO FIX IT SO THAT LIVE DATA DOESN'T STOP WHEN REMOVING SOMETHING FROM THE WATCHLIST THAT IS ALSO SELECTED AS THE CHART SYMBOL, BUT DOESN'T EXIST IN POSITIONS

export default function Watchlist(props: {watchlistState:  dashboardWatchList[], setWatchListState: React.Dispatch<React.SetStateAction<dashboardWatchList[]>>}) {

    const { watchlistState, setWatchListState } = props;
    
    const user = useSelector(selectUser);
    const positions = useSelector(selectAllPositions);

    const sortedWatchlistState = [...watchlistState].sort((a, b) => a.sequenceNumber - b.sequenceNumber);

    const dispatch = useAppDispatch();

    const removeFromWatchlist = async (ticker: string) => {

        const filtered_array = watchlistState.filter((wlItem) => wlItem.ticker !== ticker);
        const remove = await watchlist_remove(ticker, user.id);

        if (remove === null) {

            if (!positions.find((pos) => pos.symbol === ticker)) {

                dispatch(removeSymbolFromWatch(ticker));

            }

            if (filtered_array.length !== watchlistState.length) {

                setWatchListState(filtered_array);

            }

            dispatch(removeWatchlistSymbolBySymbol(ticker));

        }

    };

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow className="no-hover">
                        <TableHead>Symbol</TableHead>
                        <TableHead>Current Price</TableHead>
                        <TableHead>Last Price</TableHead>
                        <TableHead>Day Change (%)</TableHead>
                        <TableHead>Day Change ($)</TableHead>
                        <TableHead/>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sortedWatchlistState.map((stock) => (
                        <TableRow key={stock.ticker}>
                            <TableCell>{stock.ticker}</TableCell>
                            <TableCell
                                className={stock.dayChangePercent >= 0 ? "text-green-500" : "text-red-500"}>
                                ${(stock.currentPrice / 100)}
                            </TableCell>
                            <TableCell
                                className={stock.dayChangePercent >= 0 ? "text-green-500" : "text-red-500"}>
                                ${(stock.lastPrice / 100)}
                            </TableCell>
                            <TableCell
                                className={stock.dayChangePercent >= 0 ? "text-green-500" : "text-red-500"}>
                                {stock.dayChangePercent}%
                            </TableCell>
                            <TableCell
                                className={stock.dayChangeAmount >= 0 ? "text-green-500" : "text-red-500"}>
                                ${(stock.dayChangeAmount / 100)}
                            </TableCell>
                            <TableCell>
                                <Button variant="ghost" size="icon"
                                    onClick={() => removeFromWatchlist(stock.ticker.toUpperCase())}>
                                    <TrashIcon className="h-4 w-4"/>
                                    <span className="sr-only">Remove from Watchlist</span>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}

function TrashIcon(props) {

    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 6h18"/>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
        </svg>
    );

}
