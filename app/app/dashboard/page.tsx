"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/shadcn/button";
import { Input } from "@/shadcn/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/shadcn/table";
import { selectUser } from "@/redux/user/userSlice";
import { useSelector } from "react-redux";
import { ColorType, createChart } from "lightweight-charts";
import { addPosition, selectAllPositions, updatePositionBySymbol } from "@/redux/positions/positionsSlice";
import { addWatchlistSymbolById, selectWatchlist } from "@/redux/watchlist/watchlistSlice";
import { selectSymbols } from "@/redux/symbols/symbolSlice";
import { selectSymbolsToWatch, updateSymbolToWatchById, addSymbolToWatch } from "@/redux/symbols/symbolWatchSlice";
import { positionState } from "../../types/redux_types";
import { chartDefault, symbolState, dashboardWatchList } from "../../types/pt_types";
import { classes, get_positions, get_symbol, watchlist_add } from "../../lib/std";
import { Switch } from "@/shadcn/switch";
import { Label } from "@/shadcn/label";
import TradeModal from "../components/trade_modal/trade_modal";
import { useAppDispatch } from "../../lib/redux/hooks";
import Watchlist from "../components/watchlist/watchlist";
import Positions from "../components/open_positions/open_positions";
import CandlestickChart from "../components/candlestick_chart/candlestick_chart";

// TODO: CANDLES SHOULD REPRESENT CHOSEN TIME INCREMENT 1m, 5m, 10m, 15m
// TODO: ENTIRE CHART SHOULD HAVE A DATE RANGE TO CHOOSE FROM, by default the last trading day, 1m increments

export default function Component () {

    const user = useSelector(selectUser);
    const positions = useSelector(selectAllPositions);
    const reduxWatchlist = useSelector(selectWatchlist);
    const symbols = useSelector(selectSymbols);
    const symbolsToWatch = useSelector(selectSymbolsToWatch);

    const [ leaderboardView, setLeaderboardView ] = useState<boolean>(false);
    const [ openPositions, setOpenPositions ] = useState<positionState[]>(positions);
    const [ chartDefault, setChartDefault ] = useState<chartDefault>({
        symbol: (positions[0].symbol ? positions[0].symbol : (reduxWatchlist[0].symbol ? reduxWatchlist[0].symbol : symbolsToWatch[0].symbol)),
        current_price: (positions[0].symbol ? positions[0].currentPrice : (reduxWatchlist[0].symbol ? symbolsToWatch.find((symbol) => symbol.symbol === reduxWatchlist[0].symbol)!.price : symbolsToWatch[0].price)),
        day_change_dollars: (positions[0].symbol ? symbolsToWatch.find((symbol) => symbol.symbol === reduxWatchlist[0].symbol)!.dayChangeDollar : (reduxWatchlist[0].symbol ? symbolsToWatch.find((symbol) => symbol.symbol === reduxWatchlist[0].symbol)!.dayChangeDollar : symbolsToWatch[0].dayChangeDollar)),
        day_change_percent: (positions[0].symbol ? symbolsToWatch.find((symbol) => symbol.symbol === reduxWatchlist[0].symbol)!.dayChangePercent : (reduxWatchlist[0].symbol ? symbolsToWatch.find((symbol) => symbol.symbol === reduxWatchlist[0].symbol)!.dayChangePercent : symbolsToWatch[0].dayChangePercent))
    });
    const [ tradeModalState, setTradeModalState ] = useState<symbolState>({
        current_price: (positions[0].symbol ? positions[0].currentPrice : (reduxWatchlist[0].symbol ? symbolsToWatch.find((symbol) => symbol.symbol === reduxWatchlist[0].symbol)!.price : symbolsToWatch[0].price)),
        price_change: (positions[0].symbol ? symbolsToWatch.find((symbol) => symbol.symbol === reduxWatchlist[0].symbol)!.dayChangePercent : (reduxWatchlist[0].symbol ? symbolsToWatch.find((symbol) => symbol.symbol === reduxWatchlist[0].symbol)!.dayChangePercent : symbolsToWatch[0].dayChangePercent)),
        symbol: (positions[0].symbol ? positions[0].symbol : (reduxWatchlist[0].symbol ? reduxWatchlist[0].symbol : symbolsToWatch[0].symbol)),
        startingPrice: (positions[0].symbol ? symbolsToWatch.find((symbol) => symbol.symbol === reduxWatchlist[0].symbol)!.startingPrice : (reduxWatchlist[0].symbol ? symbolsToWatch.find((symbol) => symbol.symbol === reduxWatchlist[0].symbol)!.startingPrice : symbolsToWatch[0].startingPrice)),
        yesterdayClose: (positions[0].symbol ? symbolsToWatch.find((symbol) => symbol.symbol === reduxWatchlist[0].symbol)!.yesterdayClose : (reduxWatchlist[0].symbol ? symbolsToWatch.find((symbol) => symbol.symbol === reduxWatchlist[0].symbol)!.yesterdayClose : symbolsToWatch[0].yesterdayClose)),
        yesterdayOpen: (positions[0].symbol ? symbolsToWatch.find((symbol) => symbol.symbol === reduxWatchlist[0].symbol)!.yesterdayOpen : (reduxWatchlist[0].symbol ? symbolsToWatch.find((symbol) => symbol.symbol === reduxWatchlist[0].symbol)!.yesterdayOpen : symbolsToWatch[0].yesterdayOpen)),
        yesterdayHigh: (positions[0].symbol ? symbolsToWatch.find((symbol) => symbol.symbol === reduxWatchlist[0].symbol)!.yesterdayHigh : (reduxWatchlist[0].symbol ? symbolsToWatch.find((symbol) => symbol.symbol === reduxWatchlist[0].symbol)!.yesterdayHigh : symbolsToWatch[0].yesterdayHigh)),
        yesterdayLow: (positions[0].symbol ? symbolsToWatch.find((symbol) => symbol.symbol === reduxWatchlist[0].symbol)!.yesterdayLow : (reduxWatchlist[0].symbol ? symbolsToWatch.find((symbol) => symbol.symbol === reduxWatchlist[0].symbol)!.yesterdayLow : symbolsToWatch[0].yesterdayLow)),
        todayOpen: (positions[0].symbol ? symbolsToWatch.find((symbol) => symbol.symbol === reduxWatchlist[0].symbol)!.todayOpen : (reduxWatchlist[0].symbol ? symbolsToWatch.find((symbol) => symbol.symbol === reduxWatchlist[0].symbol)!.todayOpen : symbolsToWatch[0].todayOpen)),
        todayHigh: (positions[0].symbol ? symbolsToWatch.find((symbol) => symbol.symbol === reduxWatchlist[0].symbol)!.todayHigh : (reduxWatchlist[0].symbol ? symbolsToWatch.find((symbol) => symbol.symbol === reduxWatchlist[0].symbol)!.todayHigh : symbolsToWatch[0].todayHigh)),
        todayLow: (positions[0].symbol ? symbolsToWatch.find((symbol) => symbol.symbol === reduxWatchlist[0].symbol)!.todayLow : (reduxWatchlist[0].symbol ? symbolsToWatch.find((symbol) => symbol.symbol === reduxWatchlist[0].symbol)!.todayLow : symbolsToWatch[0].todayLow)),
    });
    const [ watchlist, setWatchlist ] = useState<dashboardWatchList[]>([]);
    const [ watchlistSearch, setWatchlistSearch ] = useState<string>('');
    const [ chartSearch, setChartSearch ] = useState<string>('');

    const previousSymbolsToWatchLength = useRef<number>(0);
    const previousPositionToWatchLength = useRef<number>(0);
    const symbolWatchIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const positionWatchIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const chartDefaultRef = useRef<chartDefault>(chartDefault);

    const dispatch = useAppDispatch();

    const addToWatchlist = async (symbol: string) => {

        const checkSymbolsToWatch = symbolsToWatch.find((symbl) => symbl.symbol === symbol);
        const checkSymbols = symbols.find((symbl) => symbl.symbol === symbol);

        if (!checkSymbolsToWatch) {

            try {

                const symbol_data = await get_symbol(symbol);

                if (symbol_data) {

                    const updated_watchlist = await watchlist_add(symbol, user.id);

                    if (updated_watchlist) {

                        setWatchlist((prevWatchlist) => [...prevWatchlist, {
                            ticker: symbol_data.symbol,
                            currentPrice: symbol_data.price,
                            lastPrice: symbol_data.startingPrice,
                            dayChangePercent: symbol_data.percentageChange,
                            dayChangeAmount: symbol_data.priceChange,
                            sequenceNumber: updated_watchlist.sequenceNumber,
                        }]);

                        dispatch(addWatchlistSymbolById({
                            id: symbol_data.id,
                            symbol: symbol_data.symbol,
                            sequenceNumber: updated_watchlist.sequenceNumber
                        }));

                        dispatch(addSymbolToWatch({
                            id: symbol_data.id,
                            exchange: checkSymbols?.exchange || '',
                            lastPrice: symbol_data.startingPrice,
                            symbol: symbol_data.symbol,
                            price: symbol_data.price,
                            dayChangeDollar: symbol_data.priceChange,
                            dayChangePercent: symbol_data.precentageChange,
                            startingPrice: symbol_data.startingPrice,
                            yesterdayClose: symbol_data.yesterdayClose,
                            yesterdayOpen: symbol_data.yesterdayOpen,
                            yesterdayHigh: symbol_data.yesterdayHigh,
                            yesterdayLow: symbol_data.yesterdayLow,
                            todayOpen: symbol_data.todayOpen,
                            todayHigh: symbol_data.todayHigh,
                            todayLow: symbol_data.todayLow,
                        }));

                    }

                }

            } catch (err) {

                console.log(err);

            }

        } else {

            const updated_watchlist = await watchlist_add(symbol, user.id);

            if (updated_watchlist) {

                setWatchlist((prevWatchlist) => [...prevWatchlist, {
                    ticker: checkSymbolsToWatch.symbol,
                    currentPrice: checkSymbolsToWatch.price,
                    lastPrice: checkSymbolsToWatch.lastPrice,
                    dayChangePercent: checkSymbolsToWatch.dayChangePercent,
                    dayChangeAmount: checkSymbolsToWatch.dayChangeDollar,
                    sequenceNumber: updated_watchlist.sequenceNumber,
                }]);

                dispatch(addWatchlistSymbolById({
                    id: checkSymbolsToWatch.id,
                    symbol: checkSymbolsToWatch.symbol,
                    sequenceNumber: updated_watchlist.sequenceNumber
                }));


                dispatch(addSymbolToWatch({
                    id: checkSymbolsToWatch.id,
                    exchange: checkSymbols?.exchange || '',
                    lastPrice: checkSymbolsToWatch.lastPrice,
                    symbol: checkSymbolsToWatch.symbol,
                    price: checkSymbolsToWatch.price,
                    dayChangeDollar: checkSymbolsToWatch.dayChangeDollar,
                    dayChangePercent: checkSymbolsToWatch.dayChangePercent,
                    startingPrice: checkSymbolsToWatch.startingPrice,
                    yesterdayClose: checkSymbolsToWatch.yesterdayClose,
                    yesterdayOpen: checkSymbolsToWatch.yesterdayOpen,
                    yesterdayHigh: checkSymbolsToWatch.yesterdayHigh,
                    yesterdayLow: checkSymbolsToWatch.yesterdayLow,
                    todayOpen: checkSymbolsToWatch.todayOpen,
                    todayHigh: checkSymbolsToWatch.todayHigh,
                    todayLow: checkSymbolsToWatch.todayLow,
                }));

            }

        }

        setWatchlistSearch('');

    };

    const updateChart = async (symbol: string) => {

        const checkSymbolsToWatch = symbolsToWatch.find((symbl) => symbl.symbol === symbol);

        if (checkSymbolsToWatch) {

            const updatedChart = {
                symbol: checkSymbolsToWatch.symbol,
                current_price: checkSymbolsToWatch.price,
                day_change_dollars: checkSymbolsToWatch.dayChangeDollar,
                day_change_percent: checkSymbolsToWatch.dayChangePercent,
            };

            setChartDefault(updatedChart);
            chartDefaultRef.current = updatedChart;

            setTradeModalState({
                current_price: checkSymbolsToWatch.price,
                price_change: checkSymbolsToWatch.dayChangePercent,
                symbol: checkSymbolsToWatch.symbol,
                startingPrice: checkSymbolsToWatch.startingPrice,
                yesterdayClose: checkSymbolsToWatch.yesterdayClose,
                yesterdayOpen: checkSymbolsToWatch.yesterdayOpen,
                yesterdayHigh: checkSymbolsToWatch.yesterdayHigh,
                yesterdayLow: checkSymbolsToWatch.yesterdayLow,
                todayOpen: checkSymbolsToWatch.todayOpen,
                todayHigh: checkSymbolsToWatch.todayHigh,
                todayLow: checkSymbolsToWatch.todayLow,
            });

            // candlestickSeries.update({
            //     time: '2019-01-01', open: 110, high: 120, low: 100, close: 115
            // });

        } else {

            const symbolFetch = await get_symbol(symbol);

            if (symbolFetch) {

                const updatedChart = {
                    symbol: symbolFetch.symbol,
                    current_price: symbolFetch.price,
                    day_change_dollars: symbolFetch.priceChange,
                    day_change_percent: symbolFetch.percentageChange,
                };

                dispatch(addSymbolToWatch({
                    id: symbolFetch.id,
                    symbol: symbolFetch.symbol,
                    exchange: '',
                    price: symbolFetch.price,
                    lastPrice: symbolFetch.startingPrice,
                    dayChangeDollar: symbolFetch.priceChange,
                    dayChangePercent: symbolFetch.percentageChange,
                    startingPrice: symbolFetch.startingPrice,
                    yesterdayClose: symbolFetch.yesterdayClose,
                    yesterdayOpen: symbolFetch.yesterdayOpen,
                    yesterdayHigh: symbolFetch.yesterdayHigh,
                    yesterdayLow: symbolFetch.yesterdayLow,
                    todayOpen: symbolFetch.todayOpen,
                    todayHigh: symbolFetch.todayHigh,
                    todayLow: symbolFetch.todayLow,
                }));

                setChartDefault(updatedChart);
                chartDefaultRef.current = updatedChart;

                setTradeModalState({
                    current_price: symbolFetch.price,
                    price_change: symbolFetch.dayChangePercent,
                    symbol: symbolFetch.symbol,
                    startingPrice: symbolFetch.startingPrice,
                    yesterdayClose: symbolFetch.yesterdayClose,
                    yesterdayOpen: symbolFetch.yesterdayOpen,
                    yesterdayHigh: symbolFetch.yesterdayHigh,
                    yesterdayLow: symbolFetch.yesterdayLow,
                    todayOpen: symbolFetch.todayOpen,
                    todayHigh: symbolFetch.todayHigh,
                    todayLow: symbolFetch.todayLow,
                });

            }

        }

        setChartSearch('');

    };

    //Positions Hook
    useEffect(() => {

        if (positionWatchIntervalRef.current) {
            clearInterval(positionWatchIntervalRef.current);
        }

        if (positions.length > 0) {

            positionWatchIntervalRef.current = setInterval(async () => {

                try {

                    const positionFetch = await get_positions();

                    for (let i = 0; i < positionFetch.positions.length; i++) {

                        const position = positionFetch.positions[i];
                        const positionCheck = positions.find((pos) => pos.id === position.id);
                        const symbolWatch = symbolsToWatch.find((symbl) => symbl.symbol === position.symbol);

                        let newPos: positionState = {
                            id: position.id,
                            userId: position.userId,
                            currentPrice: position.currentPrice,
                            costBasis: (position.costBasis ? position.costBasis : 150000) / position.quantity,
                            averagePrice: position.averagePrice,
                            quantity: position.quantity,
                            direction: position.direction,
                            orderId: position.orderId,
                            profitLoss: position.profitLoss,
                            symbol: position.symbol,
                            status: position.status,
                            value: position.price * position.quantity,
                            dayChangePct: 0,
                            dayChangeDollar: 0,
                            totalChangeDollar: 0,
                            totalChangePct: 0,
                            createdAt: position.createdAt,
                            updatedAt: position.updatedAt,
                        };

                        if (!symbolWatch) {

                            try {

                                const symbolFetch = await get_symbol(position.symbol);

                                if (symbolFetch) {

                                    dispatch(addSymbolToWatch({
                                        id: symbolFetch.id,
                                        symbol: symbolFetch.symbol,
                                        exchange: '',
                                        price: symbolFetch.price,
                                        lastPrice: symbolFetch.startingPrice,
                                        dayChangeDollar: symbolFetch.priceChange,
                                        dayChangePercent: symbolFetch.percentageChange,
                                        startingPrice: symbolFetch.startingPrice,
                                        yesterdayClose: symbolFetch.yesterdayClose,
                                        yesterdayOpen: symbolFetch.yesterdayOpen,
                                        yesterdayHigh: symbolFetch.yesterdayHigh,
                                        yesterdayLow: symbolFetch.yesterdayLow,
                                        todayOpen: symbolFetch.todayOpen,
                                        todayHigh: symbolFetch.todayHigh,
                                        todayLow: symbolFetch.todayLow,
                                    }));

                                    if (!positionCheck) {

                                        newPos = {
                                            ...newPos,
                                            currentPrice: symbolFetch.price,
                                            value: symbolFetch.price * position.quantity,
                                            dayChangePct: (((symbolFetch.price * newPos.quantity) - (symbolFetch.yesterdayClose * newPos.quantity)) / (symbolFetch.yesterdayClose * newPos.quantity)),
                                            dayChangeDollar: (symbolFetch.price * newPos.quantity) - (symbolFetch.yesterdayClose * newPos.quantity),
                                            totalChangeDollar: (symbolFetch.price * newPos.quantity) - (newPos.averagePrice * newPos.quantity), //TODO: Change to cost basis once fixed?
                                            totalChangePct: (((symbolFetch.price * newPos.quantity) - (newPos.averagePrice * newPos.quantity)) / (newPos.averagePrice * newPos.quantity)), //TODO: Change to cost basis once fixed?
                                        };

                                        setOpenPositions((prevPositions) => {
                                            const positionExists = prevPositions.some((pos) => pos.id === newPos.id);

                                            if (!positionExists) {
                                                return [...prevPositions, newPos];
                                            }
                                            return prevPositions;
                                        });

                                        dispatch(addPosition(newPos));

                                    }

                                }

                            } catch (err) {

                                console.error(err, 'Error updating positions in position watch hook');

                            }

                        } else if (symbolWatch && !positionCheck) {

                            setOpenPositions((prevPositions) => {

                                const positionExists = prevPositions.some((pos) => pos.id === newPos.id);

                                if (!positionExists) {

                                    newPos = {
                                        ...newPos,
                                        currentPrice: symbolWatch.price,
                                        value: symbolWatch.price * position.quantity,
                                        dayChangePct: (((symbolWatch.price * newPos.quantity) - (symbolWatch.yesterdayClose * newPos.quantity)) / (symbolWatch.yesterdayClose * newPos.quantity)),
                                        dayChangeDollar: (symbolWatch.price * newPos.quantity) - (symbolWatch.yesterdayClose * newPos.quantity),
                                        totalChangeDollar: (symbolWatch.price * newPos.quantity) - (newPos.averagePrice * newPos.quantity), //TODO: Change to cost basis once fixed?
                                        totalChangePct: (((symbolWatch.price * newPos.quantity) - (newPos.averagePrice * newPos.quantity)) / (newPos.averagePrice * newPos.quantity)), //TODO: Change to cost basis once fixed?
                                    };

                                    return [...prevPositions, newPos];
                                }

                                return prevPositions;

                            });

                            dispatch(addPosition(newPos));

                        } else if (symbolWatch && positionCheck) {

                            setOpenPositions((prevPositions) => {

                                return prevPositions.map((pos) => {

                                    if (pos.id === newPos.id) {

                                        return {
                                            ...pos,
                                            profitLoss: newPos.profitLoss,
                                            value: symbolWatch.price * position.quantity,
                                            dayChangePct: (((symbolWatch.price * newPos.quantity) - (symbolWatch.yesterdayClose * newPos.quantity)) / (symbolWatch.yesterdayClose * newPos.quantity)),
                                            dayChangeDollar: (symbolWatch.price * newPos.quantity) - (symbolWatch.yesterdayClose * newPos.quantity),
                                            totalChangeDollar: (symbolWatch.price * newPos.quantity) - (newPos.averagePrice * newPos.quantity), //TODO: Change to cost basis once fixed?
                                            totalChangePct: (((symbolWatch.price * newPos.quantity) - (newPos.averagePrice * newPos.quantity)) / (newPos.averagePrice * newPos.quantity)), //TODO: Change to cost basis once fixed?
                                            updatedAt: newPos.updatedAt,
                                        };

                                    }

                                    return pos;

                                });

                            });

                        }

                    }

                } catch (err) {

                    console.error(err, 'Error in position interval');

                }

            }, 1000);

        }

        previousPositionToWatchLength.current = positions.length;

        return () => {

            if (positionWatchIntervalRef.current) {
                clearInterval(positionWatchIntervalRef.current);
            }

        };

    }, [positions, symbolsToWatch]);

    //Wathclist Hook
    useEffect(() => {

        if (reduxWatchlist) {

            const initialWatchlist: dashboardWatchList[] = [];

            for (let i = 0; i < reduxWatchlist.length; i++) {

                const watchlistArr = reduxWatchlist[i];
                const watchListItem = symbolsToWatch.find((symbol) => symbol.symbol === watchlistArr.symbol);

                if (watchListItem) {

                    initialWatchlist.push({
                        ticker: watchListItem.symbol,
                        currentPrice: watchListItem.price,
                        lastPrice: watchListItem.lastPrice,
                        dayChangePercent: watchListItem.dayChangePercent,
                        dayChangeAmount: watchListItem.dayChangeDollar,
                        sequenceNumber: watchlistArr.sequenceNumber,
                    });

                }

            }

            if (initialWatchlist.length > 0) {

                setWatchlist(initialWatchlist);

            }

        } else {

            console.log("no watchlist");

        }


    }, [reduxWatchlist]);

    //Symbols To Watch Hook
    useEffect(() => {

        if (symbolWatchIntervalRef.current) {
            clearInterval(symbolWatchIntervalRef.current);
        }

        if (symbolsToWatch && symbolsToWatch.length > 0) {

            symbolWatchIntervalRef.current = setInterval(async () => {

                for (let i = 0; i < symbolsToWatch.length; i++) {

                    const symbol = symbolsToWatch[i];

                    try {

                        const symbolFetch = await get_symbol(symbol.symbol);

                        if (symbolFetch) {

                            const currentPrice = symbolFetch.price;

                            dispatch(updateSymbolToWatchById({
                                id: symbol.id,
                                changes: {
                                    price: currentPrice,
                                    dayChangeDollar: symbolFetch.priceChange,
                                    dayChangePercent: symbolFetch.percentageChange,
                                }
                            }));

                            dispatch(updatePositionBySymbol({
                                symbol: symbol.symbol,
                                changes: {
                                    currentPrice: symbolFetch.price,
                                },
                            }));

                            setOpenPositions((prevOpenPositions) => {

                                return prevOpenPositions.map((opItem) => {

                                    if (opItem.symbol === symbol.symbol) {

                                        dispatch(updatePositionBySymbol({
                                            symbol: symbolFetch.symbol,
                                            changes: {
                                                currentPrice: symbolFetch.price,
                                                value: symbolFetch.price * opItem.quantity,
                                                dayChangePct: (((symbolFetch.price * opItem.quantity) - (symbolFetch.yesterdayClose * opItem.quantity)) / (symbolFetch.yesterdayClose * opItem.quantity)),
                                                dayChangeDollar: (symbolFetch.price * opItem.quantity) - (symbolFetch.yesterdayClose * opItem.quantity),
                                                totalChangeDollar: (symbolFetch.price * opItem.quantity) - (opItem.averagePrice * opItem.quantity), //TODO: Change to cost basis once fixed?
                                                totalChangePct: (((symbolFetch.price * opItem.quantity) - (opItem.averagePrice * opItem.quantity)) / (opItem.averagePrice * opItem.quantity)), //TODO: Change to cost basis once fixed?
                                            }
                                        }));

                                        return {
                                            ...opItem,
                                            currentPrice: symbolFetch.price,
                                            value: symbolFetch.price * opItem.quantity,
                                            dayChangePct: (((symbolFetch.price * opItem.quantity) - (symbolFetch.yesterdayClose * opItem.quantity)) / (symbolFetch.yesterdayClose * opItem.quantity)),
                                            dayChangeDollar: (symbolFetch.price * opItem.quantity) - (symbolFetch.yesterdayClose * opItem.quantity),
                                            totalChangeDollar: (symbolFetch.price * opItem.quantity) - (opItem.averagePrice * opItem.quantity), //TODO: Change to cost basis once fixed?
                                            totalChangePct: (((symbolFetch.price * opItem.quantity) - (opItem.averagePrice * opItem.quantity)) / (opItem.averagePrice * opItem.quantity)), //TODO: Change to cost basis once fixed?
                                        };

                                    }

                                    return opItem;

                                });

                            });

                            setWatchlist((prevWatchList) => {

                                return prevWatchList.map((wlItem) => {

                                    if (wlItem.ticker === symbol.symbol) {

                                        return {
                                            ...wlItem,
                                            currentPrice: currentPrice,
                                            dayChangeAmount: symbolFetch.priceChange,
                                            dayChangePercent: symbolFetch.percentageChange,
                                        };

                                    }

                                    return wlItem;

                                });

                            });

                            setTradeModalState((tmState) => {

                                if (tmState.symbol === symbol.symbol) {

                                    return {
                                        ...tmState,
                                        current_price: currentPrice,
                                        price_change: symbolFetch.percentageChange,
                                    };

                                }

                                return tmState;

                            });

                            if ((chartDefaultRef.current.symbol === symbol.symbol) && (chartDefaultRef.current.current_price !== currentPrice || chartDefaultRef.current.day_change_dollars !== symbolFetch.priceChange || chartDefaultRef.current.day_change_percent !== symbolFetch.percentageChange)) {

                                setChartDefault({
                                    ...chartDefaultRef.current,
                                    current_price: currentPrice,
                                    day_change_dollars: symbolFetch.priceChange,
                                    day_change_percent: symbolFetch.percentageChange,
                                });

                            }

                        }

                    } catch (err) {

                        console.error(err, "Error updating symbols in symbol watch hook");

                    }

                }

            }, 1000);

            previousSymbolsToWatchLength.current = symbolsToWatch.length;

        }

        return () => {

            if (symbolWatchIntervalRef.current) {
                clearInterval(symbolWatchIntervalRef.current);
            }

        };

    }, [symbolsToWatch]);

    return (
        <>
            <div className="flex min-h-screen w-full flex-col bg-background">
                <main className="flex-1 grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
                    <div className="flex flex-col gap-6 p-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold">Dashboard</h1>
                        </div>
                        <div className="border shadow-sm rounded-lg overflow-hidden dark:border-white">
                            <div className="flex items-center justify-between bg-muted/40 px-6 py-4">
                                <div className="flex flex-col gap-2">
                                    <h2 className={classes(["text-lg font-semibold col-12"])}>{chartDefault.symbol}</h2>
                                    <div className="flex col-12 items-center gap-2">
                                        <div className={classes(["text-md font-semibold"])}>Current <span className={classes([chartDefault.day_change_dollars > 0 ? "text-green-500" : "text-red-500", "font-light"])}>
                                            {Intl.NumberFormat('en-US',
                                                {
                                                    style: "currency",
                                                    currency: "USD"
                                                }).format(chartDefault.current_price / 100)}</span>
                                        </div>
                                        &nbsp;&nbsp;
                                        <div className={classes(["text-md font-semibold"])}>Day Change <span className={classes([chartDefault.day_change_dollars > 0 ? "text-green-500" : "text-red-500", "font-light"])}>
                                            {Intl.NumberFormat('en-US',
                                                {
                                                    style: "currency",
                                                    currency: "USD"
                                                }).format(chartDefault.day_change_dollars / 100)}
                                        </span> (<span className={classes([chartDefault.day_change_dollars > 0 ? "text-green-500" : "text-red-500", "font-light"])}>{Intl.NumberFormat('en-US', { style: "percent" }).format(chartDefault.day_change_percent)}</span>)
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="relative flex-1">
                                        <SearchIcon
                                            className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                                        <Input
                                            type="search"
                                            placeholder="Search..."
                                            className="w-full rounded-lg bg-background pl-8 pr-4 py-2"
                                            value={chartSearch}
                                            onChange={(e) => { setChartSearch(e.target.value.toUpperCase()); }}
                                        />
                                    </div>
                                    <Button size="sm" onClick={() => updateChart(chartSearch)}>
                                        Search Symbol
                                    </Button>
                                    <TradeModal symbState={tradeModalState}/>
                                    {/*<Button variant="outline" size="sm">*/}
                                    {/*    1D*/}
                                    {/*</Button>*/}
                                    {/*<Button variant="outline" size="sm">*/}
                                    {/*    1W*/}
                                    {/*</Button>*/}
                                    {/*<Button variant="outline" size="sm">*/}
                                    {/*    1M*/}
                                    {/*</Button>*/}
                                    {/*<Button variant="outline" size="sm">*/}
                                    {/*    1Y*/}
                                    {/*</Button>*/}
                                </div>
                            </div>
                            <div className="h-[400px] flex items-center justify-center">
                                {/*<div id={'mainChart'} className="h-full w-full"></div>*/}
                                <CandlestickChart symbol={chartDefault.symbol}></CandlestickChart>
                            </div>
                        </div>
                        <div className="border shadow-sm rounded-lg overflow-hidden dark:border-white">
                            <div className="flex items-center justify-between bg-muted/40 px-6 py-4">
                                <h2 className="text-lg font-semibold">Open Positions</h2>
                            </div>
                            <Positions positionState={openPositions} />
                        </div>
                    </div>
                    <div className="bg-muted/40 p-6">
                        <div className="border shadow-sm rounded-lg overflow-hidden dark:border-white">
                            <div className="flex items-center justify-between bg-muted/40 px-6 py-4">
                                <h2 className="text-lg font-semibold">Leaderboard</h2>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center space-x-2">View as &nbsp;
                                        <Label htmlFor="lb-view"><span
                                            className={!leaderboardView ? "font-bold text-white" : 'font-light text-gray-500'}>%</span> / <span
                                            className={leaderboardView ? "font-bold text-white" : 'font-light text-gray-500'}>$</span></Label>
                                        <Switch checked={leaderboardView}
                                            onCheckedChange={() => setLeaderboardView(!leaderboardView)}
                                            id="lb-view"/>
                                    </div>
                                </div>
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow className="no-hover">
                                        <TableHead>Rank</TableHead>
                                        <TableHead>User</TableHead>
                                        {leaderboardView ? (
                                            <TableHead>Earnings ($)</TableHead>
                                        ) : (
                                            <TableHead>Total Change (%)</TableHead>
                                        )}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>1</TableCell>
                                        <TableCell>Josh H</TableCell>
                                        {leaderboardView ? (
                                            <TableCell className="text-green-500">$12,345.67</TableCell>
                                        ) : (
                                            <TableCell className="text-green-500">+45.67%</TableCell>
                                        )}
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>2</TableCell>
                                        <TableCell>Nick K</TableCell>
                                        {leaderboardView ? (
                                            <TableCell className="text-green-500">$9,876.54</TableCell>
                                        ) : (
                                            <TableCell className="text-green-500">+32.54%</TableCell>
                                        )}
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>3</TableCell>
                                        <TableCell>Mike H</TableCell>
                                        {leaderboardView ? (
                                            <TableCell className="text-red-500">-$3,210.98</TableCell>
                                        ) : (
                                            <TableCell className="text-red-500">-10.98%</TableCell>
                                        )}
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                        <div className="border shadow-sm rounded-lg overflow-hidden mt-6 dark:border-white">
                            <div className="flex items-center justify-between bg-muted/40 px-6 py-4">
                                <h2 className="text-lg font-semibold">Watchlist</h2>
                                <div className="flex items-center gap-2">
                                    <Input
                                        type="text"
                                        placeholder="Enter ticker"
                                        className="w-full rounded-lg bg-background px-4 py-2"
                                        value={watchlistSearch}
                                        onChange={(e) => { setWatchlistSearch(e.target.value.toUpperCase()); }}
                                    />
                                    <Button size="sm" onClick={() => addToWatchlist(watchlistSearch)}>
                                        Add to Watchlist
                                    </Button>
                                </div>
                            </div>
                            <Watchlist watchlistState={watchlist} setWatchListState={setWatchlist} />
                        </div>
                    </div>
                </main>
            </div>
        </>
    );

}

function SearchIcon(props) {

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
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
        </svg>
    );

}
