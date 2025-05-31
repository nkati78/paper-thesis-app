'use client';

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shadcn/table";
import { positionState } from "../../../types/redux_types";

export default function Positions(props: {positionState:  positionState[] }) {

    const { positionState } = props;

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow className="no-hover">
                        <TableHead>Symbol</TableHead>
                        <TableHead>Last Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Cost Basis</TableHead>
                        <TableHead>Average Price</TableHead>
                        <TableHead>Current Value</TableHead>
                        <TableHead>Day Change ($)</TableHead>
                        <TableHead>Day Change (%)</TableHead>
                        <TableHead>Total Change ($)</TableHead>
                        <TableHead>Total Change (%)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {positionState.length > 0 ? positionState.map((position) => (
                        <TableRow key={position.orderId}>
                            <TableCell>{position.symbol}</TableCell>
                            <TableCell className={position.dayChangeDollar >= 0 ? "text-green-500" : "text-red-500"}>{Intl.NumberFormat('en-US', { style: "currency",  currency: "USD" }).format((position.currentPrice / 100))}</TableCell>
                            <TableCell>{position.quantity}</TableCell>
                            <TableCell>{Intl.NumberFormat('en-US', { style: "currency",  currency: "USD" }).format(position.costBasis / 100)}</TableCell>
                            <TableCell>{Intl.NumberFormat('en-US', { style: "currency",  currency: "USD" }).format(position.averagePrice / 100)}</TableCell>
                            <TableCell className={position.totalChangeDollar >= 0 ? "text-green-500" : "text-red-500"}>{Intl.NumberFormat('en-US', { style: "currency",  currency: "USD" }).format(position.value / 100)}</TableCell>
                            <TableCell className={position.dayChangeDollar >= 0 ? "text-green-500" : "text-red-500"}>{Intl.NumberFormat('en-US', { style: "currency",  currency: "USD" }).format(position.dayChangeDollar / 100)}</TableCell>
                            <TableCell className={position.dayChangeDollar >= 0 ? "text-green-500" : "text-red-500"}>{Intl.NumberFormat('en-US', { style: "percent" }).format(position.dayChangePct)}</TableCell>
                            <TableCell className={position.totalChangeDollar >= 0 ? "text-green-500" : "text-red-500"}>{Intl.NumberFormat('en-US', { style: "currency",  currency: "USD" }).format(position.totalChangeDollar / 100)}</TableCell>
                            <TableCell className={position.totalChangeDollar >= 0 ? "text-green-500" : "text-red-500"}>{Intl.NumberFormat('en-US', { style: "percent" }).format(position.totalChangePct)}</TableCell>
                        </TableRow>)) : (
                        <div>You don't have any open positions! Start trading now</div>)}
                    {/*    TODO: NEED TO ADD DETAILS TO EMPTY POSITION MESSAGE*/}
                </TableBody>
            </Table>
        </>
    );
}
