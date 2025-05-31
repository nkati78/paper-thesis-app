'use client';

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/shadcn/dialog";
import { Button } from "@/shadcn/button";
import { ToggleGroup, ToggleGroupItem } from "@/shadcn/toggle-group";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/shadcn/dropdown-menu";
import { Input } from "@/shadcn/input";
import React, { useEffect, useState } from "react";
import settings from "../../../lib/settings";
import { symbolState, tradeModalForm } from "../../../types/pt_types";
import { classes } from "../../../lib/std";
import { updateWallet } from "@/redux/user/userSlice";
import { useAppDispatch } from "../../../lib/redux/hooks";

export default function TradeModal(props: { symbState: symbolState }) {

    const { symbState } = props;

    const [ open, setOpen ] = useState(false);
    const [ tradeState, setTradeState ] = useState<tradeModalForm>({
        current_price: 0.00,
        price_change: 0.0,
        action: 'buy',
        order_type: 'market',
        quantity: 0,
        symbol: null,
        total_cost: 0.00,
    });

    //Updating TradeState Hook
    useEffect(() => {

        setTradeState({
            ...tradeState,
            current_price: symbState.current_price,
            price_change: symbState.price_change,
            symbol: symbState.symbol,
            total_cost: (symbState.current_price * tradeState.quantity),
        });

    }, [symbState]);

    const dispatch = useAppDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTradeState({ ...tradeState, quantity: Number(e.target.value), total_cost: (Number(e.target.value) * tradeState.current_price) });
    };

    const placeOrder = async (symbol: string, quantity: number, price: number, orderType: string) => {

        const place_order = await fetch(settings.local_api.orders, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Symbol: symbol,
                Quantity: quantity,
                Price: price,
                Type: orderType
            }),
        }).then((res) => res.json());

        if (place_order.orderId) {

            setTimeout(async () => {

                const newBalance = await fetch(settings.local_api.balance, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }).then((res) => res.json());

                dispatch(updateWallet(newBalance.balance));

            }, 5000);

            setTradeState({
                ...tradeState,
                quantity: 0
            });
            setOpen(false);

        }

    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">Trade</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle className="text-foreground">Trade</DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                            Buy or sell <span className={classes(['font-bold'])}>{tradeState.symbol}</span>.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-6">
                        <div className="grid grid-cols-2 items-center gap-4">
                            <div className="text-sm text-muted-foreground">Current Price</div>
                            <div className="text-2xl font-bold text-foreground justify-self-end">
                                {Intl.NumberFormat('en-US',
                                    {
                                        style: "currency",
                                        currency: "USD"
                                    }).format(tradeState.current_price / 100)
                                }
                            </div>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                            <div className="text-sm text-muted-foreground">Price Change</div>
                            <div className="text-2xl font-bold text-green-500 justify-self-end">{Intl.NumberFormat('en-US', { style: "percent" }).format(tradeState.price_change)}</div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">Action</div>
                            <ToggleGroup type="single" defaultValue={tradeState.action} className="justify-self-end" onValueChange={(value) => {
                                setTradeState({ ...tradeState, action: value });
                            }}>
                                <ToggleGroupItem value="buy" className="text-foreground">
                                    Buy
                                </ToggleGroupItem>
                                <ToggleGroupItem value="sell" className="text-foreground">
                                    Sell
                                </ToggleGroupItem>
                            </ToggleGroup>
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">Order Type</div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="w-[150px] justify-between">
                                            <span className="text-foreground">
                                                {tradeState.order_type === "market" && "Market Order"}
                                                {tradeState.order_type === "limit" && "Limit Order"}
                                                {tradeState.order_type === "stop-loss" && "Stop-Loss Order"}
                                            </span>
                                            <ChevronsUpDownIcon className="h-4 w-4 text-muted-foreground"/>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onSelect={() => {
                                            setTradeState({ ...tradeState, order_type: 'market' });
                                        }}>Market Order</DropdownMenuItem>
                                        <DropdownMenuItem onSelect={() => {
                                            setTradeState({ ...tradeState, order_type: 'limit' });
                                        }}>Limit Order</DropdownMenuItem>
                                        <DropdownMenuItem onSelect={() => {
                                            setTradeState({ ...tradeState, order_type: 'stop-loss' });
                                        }}>Stop-Loss Order</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">Quantity</div>
                                <Input
                                    type="number"
                                    placeholder="Enter quantity"
                                    className="w-[150px] text-foreground justify-self-end"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid grid-cols-2 items-center gap-4">
                                <div className="text-sm text-muted-foreground">Total</div>
                                <div className="text-2xl font-bold text-foreground justify-self-end">
                                    {Intl.NumberFormat('en-US',
                                        {
                                            style: "currency",
                                            currency: "USD"
                                        }).format(tradeState.total_cost / 100)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="text-black justify-self-end" onClick={() => placeOrder(tradeState.symbol!, tradeState.quantity, tradeState.current_price, tradeState.order_type)}>
                            Place Order
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

function ChevronsUpDownIcon(props) {
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
            <path d="m7 15 5 5 5-5" />
            <path d="m7 9 5-5 5 5" />
        </svg>
    );
}