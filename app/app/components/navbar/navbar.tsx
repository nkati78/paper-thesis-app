'use client';

import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shadcn/dropdown-menu";
import { Button } from "@/shadcn/button";
import { signOut } from "next-auth/react";
import { useSelector } from "react-redux";
import { classes } from "../../../lib/std";
import { useAppDispatch } from "../../../lib/redux/hooks";
import { Switch } from "@/shadcn/switch";
import { selectDarkMode, selectUser, selectCurrentPath, updateDarkMode, updateCurrentPath, updatePreviousPath } from "@/redux/user/userSlice";
import { selectWallet } from "@/redux/user/userSlice";
import { useEffect } from "react";
import { Badge } from "@/shadcn/badge";
import Image from "next/image";
import { usePathname } from "next/navigation";
import MountainIcon from "@/shadcn_svg/mountain_icon";
import WalletIcon from "@/shadcn_svg/wallet_icon";

// TODO: Highlight button for whatever page you are on

export default function Navbar () {

    const darkMode = useSelector(selectDarkMode);
    const wallet = useSelector(selectWallet);
    const dispatch = useAppDispatch();
    const user = useSelector(selectUser);
    const reduxPath = useSelector(selectCurrentPath);
    const path = usePathname();

    // Navigation Hook
    useEffect(() => {

        if (user.id && path) {

            dispatch(updatePreviousPath(reduxPath));
            dispatch(updateCurrentPath(path));

        }

    }, [path]);

    const editDarkMode = (dm: boolean) => {

        const body = document.querySelector("body");

        if (body) {

            if (dm) {

                body.classList.add("dark");

            } else {

                body.classList.remove("dark");

            }

            dispatch(updateDarkMode(dm));

        }

    };

    return (
        <div className="flex h-14 items-center justify-between border-b bg-muted/40 px-6">
            <div className="flex items-center gap-4">
                <Link href="/app/public" className="flex items-center gap-2 font-semibold" prefetch={false}>
                    <MountainIcon className="h-6 w-6"/>
                    <span>Paper Thesis</span>
                </Link>
                <div className={classes(['flex flex-column md:flex-row md:justify-center mb-5 md:mb-32 lg:mb-40'])}>
                    {/*{*/}
                    {/*    darkMode ? <TransparentLogo/> : <TransparentLogoDark/>*/}
                    {/*}*/}
                </div>
                <Link href={"/account"}>
                    <Badge variant={"default"}>
                        Account
                    </Badge>
                </Link>
                <Link href={"/dashboard"}>
                    <Badge variant={"default"}>
                        Dashboard
                    </Badge>
                </Link>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <WalletIcon className="h-5 w-5"/>
                    {Intl.NumberFormat('en-US',
                        {
                            style: "currency",
                            currency: "USD"
                        }).format(wallet)
                    }
                </div>
                <Switch
                    defaultChecked={darkMode}
                    onCheckedChange={editDarkMode}
                />
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <Image src={user.avatar} width={200} height={200} className="rounded-full" alt="Avatar" />
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{user.fn + ' ' + user.ln}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link href={'/account'}><DropdownMenuItem>Account</DropdownMenuItem></Link>
                        <Link href={'/dashboard'}><DropdownMenuItem>Dashboard</DropdownMenuItem></Link>
                        {/*<Link href={'/store'} className={classes(['disabled:true'])}><DropdownMenuItem>Shop</DropdownMenuItem></Link>*/}
                        {/*<Link href={'/learn'} className={classes(['disabled:true'])}><DropdownMenuItem>Learn</DropdownMenuItem></Link>*/}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => signOut({
                                callbackUrl: '/'
                            })}
                        >
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );

}