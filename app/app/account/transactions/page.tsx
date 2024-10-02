"use client";

import { useState, useMemo } from "react";
import { Label } from "../../components/shadecn_components/ui/label";
import { Input } from "../../components/shadecn_components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "../../components/shadecn_components/ui/dropdown-menu";
import { Button } from "../../components/shadecn_components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../../components/shadecn_components/ui/table";
import { Badge } from "../../components/shadecn_components/ui/badge";

export default function Component() {
    const [filters, setFilters] = useState({
        startDate: null,
        endDate: null,
        type: "all",
        ticker: "all",
    });
    const [sortColumn, setSortColumn] = useState("date");
    const [sortDirection, setSortDirection] = useState("asc");
    const transactions = [
        {
            id: 1,
            date: "2023-05-01",
            type: "Buy",
            status: "Complete",
            ticker: "AAPL",
            price: 120.5,
            amount: 100,
        },
        {
            id: 2,
            date: "2023-05-05",
            type: "Sell",
            status: "Pending",
            ticker: "AAPL",
            price: 125.75,
            amount: 50,
        },
        {
            id: 3,
            date: "2023-05-10",
            type: "Buy",
            status: "Failed",
            ticker: "GOOGL",
            price: 2500.0,
            amount: 75,
        },
        {
            id: 4,
            date: "2023-05-15",
            type: "Sell",
            status: "Complete",
            ticker: "GOOGL",
            price: 2550.0,
            amount: 25,
        },
        {
            id: 5,
            date: "2023-05-20",
            type: "Buy",
            status: "Pending",
            ticker: "TSLA",
            price: 300.75,
            amount: 150,
        },
        {
            id: 6,
            date: "2023-05-25",
            type: "Sell",
            status: "Complete",
            ticker: "TSLA",
            price: 325.5,
            amount: 100,
        },
    ];
    const filteredTransactions = useMemo(() => {
        return transactions
            .filter((transaction) => {
                if (filters.startDate && new Date(transaction.date) < new Date(filters.startDate)) {
                    return false;
                }
                if (filters.endDate && new Date(transaction.date) > new Date(filters.endDate)) {
                    return false;
                }
                if (filters.type !== "all" && transaction.type !== filters.type) {
                    return false;
                }
                if (filters.ticker !== "all" && transaction.ticker !== filters.ticker) {
                    return false;
                }
                return true;
            })
            .sort((a, b) => {
                if (sortDirection === "asc") {
                    return a[sortColumn] > b[sortColumn] ? 1 : -1;
                } else {
                    return a[sortColumn] < b[sortColumn] ? 1 : -1;
                }
            });
    }, [filters, transactions, sortColumn, sortDirection]);
    const totalGains = useMemo(() => {
        return filteredTransactions.reduce((total, transaction) => {
            if (transaction.type === "Sell") {
                return total + transaction.price * transaction.amount;
            }
            return total;
        }, 0);
    }, [filteredTransactions]);
    const totalLosses = useMemo(() => {
        return filteredTransactions.reduce((total, transaction) => {
            if (transaction.type === "Buy") {
                return total + transaction.price * transaction.amount;
            }
            return total;
        }, 0);
    }, [filteredTransactions]);
    return (
        <div className="flex flex-col gap-6 mx-auto w-full min-h-screen bg-background text-foreground p-8 md:p-12 lg:p-16">
            <h1 className="text-3xl font-bold">Order History</h1>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="start-date">Start Date</Label>
                        <Input
                            id="start-date"
                            type="date"
                            value={filters.startDate || ""}
                            // onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Label htmlFor="end-date">End Date</Label>
                        <Input
                            id="end-date"
                            type="date"
                            value={filters.endDate || ""}
                            // onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                        />
                    </div>
                    <DropdownMenu>
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
                                <DropdownMenuRadioItem value="Buy">Buy</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="Sell">Sell</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
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
                        <TableRow>
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
                                    <Badge variant={transaction.type === "Buy" ? "secondary" : "outline"}>{transaction.type}</Badge>
                                </TableCell>
                                <TableCell>
                                    {/*<Badge*/}
                                    {/*    variant={*/}
                                    {/*        transaction.status === "Complete"*/}
                                    {/*            ? "secondary bg-green-500 text-green-50"*/}
                                    {/*            : transaction.status === "Pending"*/}
                                    {/*                ? "outline bg-yellow-500 text-yellow-50"*/}
                                    {/*                : "destructive"*/}
                                    {/*    }*/}
                                    {/*>*/}
                                    {/*    {transaction.status}*/}
                                    {/*</Badge>*/}
                                </TableCell>
                                <TableCell className="text-right">{transaction.amount}</TableCell>
                                <TableCell>{transaction.ticker}</TableCell>
                                <TableCell className="text-right">${transaction.price.toFixed(2)}</TableCell>
                                <TableCell className={`text-right ${transaction.type === "Buy" ? "text-red-500" : "text-green-500"}`}>
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

function ArrowDownIcon(props) {
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
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
        </svg>
    );
}


function ArrowUpIcon(props) {
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
            <path d="m5 12 7-7 7 7" />
            <path d="M12 19V5" />
        </svg>
    );
}


function FilterIcon(props) {
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
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
    );
}


// function XIcon(props) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <path d="M18 6 6 18" />
//             <path d="m6 6 12 12" />
//         </svg>
//     )
// }