'use client';
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "./shadecn_components/ui/dropdown-menu";
import { Button } from "./shadecn_components/ui/button";
import { signOut } from "next-auth/react";
import {Session} from "next-auth";
import { useSelector } from "react-redux";
import { selectCountPC } from "../../lib/redux/features/pc/pcSlice";
import { selectCountTC } from "../../lib/redux/features/tc/tcSlice";

export default function Navbar (
    props: {
        session: Session
    }) {

    // const pathname = usePathname();
    const { session } = props;
    const pc_count = useSelector(selectCountPC);
    const tc_count = useSelector(selectCountTC);
    // const dispatch = useAppDispatch();

    function MountainIcon (props) {

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
                <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
            </svg>
        );
    
    }


    function UserIcon (props) {

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
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        );
    
    }

    function WalletIcon (props) {

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
                <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
                <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
            </svg>
        );
    
    }

    return (
        <div className="flex h-14 items-center justify-between border-b bg-muted/40 px-6">
            <div className="flex items-center gap-4">
                <Link href="/" className="flex items-center gap-2 font-semibold" prefetch={false}>
                    <MountainIcon className="h-6 w-6" />
                    <span>Paper Thesis</span>
                </Link>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <WalletIcon className="h-5 w-5"/>
                    <span>{pc_count} PC</span>
                    <span>{tc_count} TC</span>
                </div>
                <Link href="#" className="flex items-center gap-2 text-muted-foreground" prefetch={false}>
                    <UserIcon className="h-5 w-5" />
                    {/*<span onClick={() => dispatch(incremented())}>Redux Test Counter</span>*/}
                </Link>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <img src={session?.user?.image ? session.user.image : '/assets/placeholder-user.jpg'} width={200} height={200} className="rounded-full" alt="Avatar" />
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link href={'/account/settings'}><DropdownMenuItem>Settings</DropdownMenuItem></Link>
                        <Link href={'/account/transactions'}><DropdownMenuItem>Transactions</DropdownMenuItem></Link>
                        <Link href={'/dashboard'}><DropdownMenuItem>Dashboard</DropdownMenuItem></Link>
                        <Link href={'/store'}><DropdownMenuItem>Shop</DropdownMenuItem></Link>
                        <Link href={'/learn'}><DropdownMenuItem>Learn</DropdownMenuItem></Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => signOut({callbackUrl: '/'})}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );

}