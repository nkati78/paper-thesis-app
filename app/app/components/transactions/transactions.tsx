"use client";

import { useState, useMemo, useEffect } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/shadcn/dropdown-menu";
import { Button } from "@/shadcn/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/shadcn/table";
import { Badge } from "@/shadcn/badge";
import { DatePickerWithRange } from "@/shadcn/datepicker_range";
import * as React from "react";
import { PTTransaction } from "../../../types/pt_types";
import { classes } from "../../../lib/std";
import ArrowDownIcon from "@/shadcn_svg/arrow_down_icon";
import ArrowUpIcon from "@/shadcn_svg/arrow_up_icon";
import FilterIcon from "@/shadcn_svg/filter_icon";

export default function Transactions(props: { transactions: PTTransaction[] }) {

    const { transactions } = props;

    const [ filters, setFilters ] = useState({
        type: "all",
        ticker: "all",
    });
    const [ dateFilter, setDateFilter ] = useState({
        from: new Date((new Date()).setDate((new Date()).getDate() - 30)),
        to: new Date((new Date()).setDate((new Date()).getDate()))
    });
    const [ sortColumn, setSortColumn ] = useState("date");
    const [ sortDirection, setSortDirection ] = useState("asc");

    const filteredTransactions = useMemo(() => {

        return transactions.filter((transaction) => {

            if (dateFilter.from && new Date(transaction.date) < new Date(dateFilter.from)) {

                return false;

            }

            if (dateFilter.to && new Date(transaction.date) > new Date(dateFilter.to)) {

                return false;

            }

            if (filters.type !== "all" && transaction.type !== filters.type) {

                return false;

            }

            return !(filters.ticker !== "all" && transaction.ticker !== filters.ticker);

        }).sort((a, b) => {

            if (sortDirection === "asc") {

                return a[sortColumn] > b[sortColumn] ? 1 : -1;

            } else {

                return a[sortColumn] < b[sortColumn] ? 1 : -1;

            }

        });

    }, [filters, transactions, sortColumn, sortDirection, dateFilter]);

    const totalGains = useMemo(() => {

        return filteredTransactions.reduce((total, transaction) => {

            if (transaction.type === "sell") {

                return total + transaction.price * transaction.amount;

            }

            return total;

        }, 0);

    }, [filteredTransactions]);

    const totalLosses = useMemo(() => {

        return filteredTransactions.reduce((total, transaction) => {

            if (transaction.type === "buy" || transaction.type === "") {

                return total + transaction.price * transaction.amount;

            }

            return total;

        }, 0);

    }, [filteredTransactions]);

    return (
        <div className="flex flex-col gap-6 mx-auto w-full  bg-background text-foreground ">
            <h1 className="text-3xl font-bold">Order History</h1>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <DatePickerWithRange
                        className={undefined}
                        date={dateFilter}
                        setDate={setDateFilter}
                    />
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <FilterIcon className="w-4 h-4 mr-2" />
                                {filters.type === "all" ? "All" : filters.type}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuRadioGroup
                                value={filters.type}
                                onValueChange={(value) => setFilters({ ...filters, type: value })}
                            >
                                <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="buy">Buy</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="sell">Sell</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <FilterIcon className="w-4 h-4 mr-2" />
                                {filters.ticker === "all" ? "All Tickers" : filters.ticker}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuRadioGroup
                                value={filters.ticker}
                                onValueChange={(value) => setFilters({ ...filters, ticker: value })}
                            >
                                <DropdownMenuRadioItem value="all">All Tickers</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="AAPL">AAPL</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="GOOGL">GOOGL</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="TSLA">TSLA</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="flex-1 overflow-auto border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow className="no-hover">
                            <TableHead
                                className="cursor-pointer"
                                onClick={() => {
                                    if (sortColumn === "date") {
                                        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                                    } else {
                                        setSortColumn("date");
                                        setSortDirection("asc");
                                    }
                                }}
                            >
                                Date
                                {sortColumn === "date" && <span className="ml-2">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>}
                            </TableHead>
                            <TableHead
                                className="cursor-pointer"
                                onClick={() => {
                                    if (sortColumn === "type") {
                                        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                                    } else {
                                        setSortColumn("type");
                                        setSortDirection("asc");
                                    }
                                }}
                            >
                                Buy/Sell
                                {sortColumn === "type" && <span className="ml-2">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>}
                            </TableHead>
                            <TableHead
                                className="cursor-pointer"
                                onClick={() => {
                                    if (sortColumn === "status") {
                                        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                                    } else {
                                        setSortColumn("status");
                                        setSortDirection("asc");
                                    }
                                }}
                            >
                                Status
                                {sortColumn === "status" && (
                                    <span className="ml-2">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>
                                )}
                            </TableHead>
                            <TableHead
                                className="text-right cursor-pointer"
                                onClick={() => {
                                    if (sortColumn === "amount") {
                                        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                                    } else {
                                        setSortColumn("amount");
                                        setSortDirection("asc");
                                    }
                                }}
                            >
                                Quantity
                                {sortColumn === "amount" && (
                                    <span className="ml-2">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>
                                )}
                            </TableHead>
                            <TableHead
                                className="cursor-pointer"
                                onClick={() => {
                                    if (sortColumn === "ticker") {
                                        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                                    } else {
                                        setSortColumn("ticker");
                                        setSortDirection("asc");
                                    }
                                }}
                            >
                                Ticker
                                {sortColumn === "ticker" && (
                                    <span className="ml-2">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>
                                )}
                            </TableHead>
                            <TableHead className="text-right">Filled At</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredTransactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell>{transaction.date}</TableCell>
                                <TableCell>
                                    <Badge variant={transaction.type === "buy" ? "secondary" : "outline"}>{transaction.type === 'buy' || transaction.type === "" ? 'buy' : transaction.type}</Badge>
                                    {/*<Badge variant={"secondary"}>buy</Badge>*/}
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            transaction.status === "filled"
                                                ? "secondary"
                                                : transaction.status === "closed"
                                                    ? "outline"
                                                    : "destructive"
                                        }
                                        className={classes([transaction.status === "filled"
                                            ? "bg-green-500 text-green-50"
                                            : transaction.status === "closed"
                                                ? "bg-yellow-500 text-yellow-50"
                                                : "destructive"])
                                        }
                                    >
                                        {transaction.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">{transaction.amount}</TableCell>
                                <TableCell>{transaction.ticker}</TableCell>
                                <TableCell className="text-right">${transaction.price.toFixed(2)}</TableCell>
                                <TableCell className={`text-right ${transaction.type === "buy" || transaction.type === "" ? "text-red-500" : "text-green-500"}`}>
                                    ${(transaction.price * transaction.amount).toFixed(2)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between">
                <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                        <ArrowUpIcon className="w-4 h-4 fill-green-500" />
                        <span className="font-medium">Total Gains: ${totalGains.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <ArrowDownIcon className="w-4 h-4 fill-red-500" />
                        <span className="font-medium">Total Losses: ${totalLosses.toFixed(2)}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className={`font-medium ${totalGains - totalLosses >= 0 ? "text-green-500" : "text-red-500"}`}>
            Net: ${(totalGains - totalLosses).toFixed(2)}
                    </span>
                    {totalGains - totalLosses >= 0 ? (
                        <ArrowUpIcon className="w-4 h-4 fill-green-500" />
                    ) : (
                        <ArrowDownIcon className="w-4 h-4 fill-red-500" />
                    )}
                </div>
            </div>
        </div>
    );

}