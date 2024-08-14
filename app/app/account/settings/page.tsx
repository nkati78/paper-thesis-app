'use client';

import { Button } from "../../components/shadecn_components/ui/button";
import { Input } from "../../components/shadecn_components/ui/input";
import { Label } from "../../components/shadecn_components/ui/label";
import { Textarea } from "../../components/shadecn_components/ui/textarea";
import { useSelector } from "react-redux";
import { selectUser } from "../../../lib/redux/features/user/userSlice";
import { selectCountTC } from "../../../lib/redux/features/tc/tcSlice";
import { selectCountPC } from "../../../lib/redux/features/pc/pcSlice";
import { Skeleton } from "../../components/shadecn_components/ui/skeleton";
import { useRouter } from "next/navigation";
import {useEffect} from "react";

// TODO: Add username to account info
// TODO: Change both currencies to 1 currency and treat it like USD
// TODO: Move bulk of account settings to own page - specifically to
// TODO: Auto generate usernames, allow user to change
// TODO: Add Dashboard and Account to bar
// TODO: Get rid of "Stock Chart" on the chart title
// TODO: When you press "Trade" on the dashboard, the trading modal will pop up
// TODO:



export default function Settings() {

    const router = useRouter();
    const user_info = useSelector(selectUser);
    const tc = useSelector(selectCountTC);
    const pc = useSelector(selectCountPC);

    useEffect(() => {

        console.log(user_info)

    }, [])

    return (
        <div className="flex min-h-screen">
            <div className="container mx-auto max-w-7xl py-12 px-4 md:px-6">
                <div className="grid gap-16">
                    <section>
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold">Account Information</h2>
                            <Button variant="outline">Reset Password</Button>
                        </div>

                        {user_info ? (
                            <div className="mt-8 grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" defaultValue={user_info.fn}/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" defaultValue={user_info.ln}/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" defaultValue={user_info.email}/>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                               <Skeleton className="h-12 w-12 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                                </div>
                            </div>

                        )}

                    </section>
                    <section>
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold">Wallet</h2>
                            <Button onClick={() => router.push('/account/transactions')} variant="outline">Transaction History</Button>
                        </div>
                        <div className="mt-8 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Current Balance</span>
                                <span className="text-lg font-medium"><span>{pc}</span> PC</span>
                                <span className="text-lg font-medium"><span>{tc}</span> TC</span>
                            </div>
                        </div>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold">Our Mission</h2>
                        <div className="mt-8 space-y-4">
                            <p>
                                At Paper Thesis, we aim to democratize stock market education and trading tools. We offer a safe,
                                engaging environment to learn, practice, and perfect trading skills without real-world financial stakes.
                            </p>
                        </div>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold">About Us</h2>
                        <div className="mt-8 space-y-4">
                            <p>
                                Welcome to Paper Thesis, your go-to platform for mastering stock trading without financial risk. Whether
                                you're a beginner learning the ropes or an experienced trader refining your strategies, Paper Thesis
                                provides a user-friendly web app to succeed in the stock market.
                            </p>
                        </div>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold">What We Offer</h2>
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <PaperclipIcon className="h-8 w-8 text-primary" />
                                <h3 className="text-xl font-semibold">Paper Trading</h3>
                                <p>
                                    Experience the stock market with virtual money, track your progress, and learn without financial risk.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <TestTubeIcon className="h-8 w-8 text-primary" />
                                <h3 className="text-xl font-semibold">Strategy Testing</h3>
                                <p>Develop and test trading strategies using advanced simulation tools to optimize your approaches.</p>
                            </div>
                            <div className="space-y-2">
                                <WebhookIcon className="h-8 w-8 text-primary" />
                                <h3 className="text-xl font-semibold">User-Friendly Web App</h3>
                                <p>Enjoy a seamless experience on the web.</p>
                            </div>
                        </div>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold">Why choose Paper Thesis?</h2>
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <ShieldIcon className="h-8 w-8 text-primary" />
                                <h3 className="text-xl font-semibold">Risk-Free Learning</h3>
                                <p>Practice without the fear of losing real money.</p>
                            </div>
                            <div className="space-y-2">
                                <PenToolIcon className="h-8 w-8 text-primary" />
                                <h3 className="text-xl font-semibold">Comprehensive Tools</h3>
                                <p>Access a wide range of tools to develop and test trading strategies.</p>
                            </div>
                            <div className="space-y-2">
                                <TrendingUpIcon className="h-8 w-8 text-primary" />
                                <h3 className="text-xl font-semibold">Continuous Improvement</h3>
                                <p>Stay updated with the latest market trends and strategies.</p>
                            </div>
                            <div className="space-y-2">
                                <PowerIcon className="h-8 w-8 text-primary" />
                                <h3 className="text-xl font-semibold">Supportive Environment</h3>
                                <p>Benefit from a dedicated support team ready to assist you.</p>
                            </div>
                        </div>
                        <div className="mt-8 space-y-4">
                            <p>
                                Join Paper Thesis and take your first step toward becoming a confident and successful trader. We're here
                                to support your journey every step of the way.
                            </p>
                            <p>For any questions or assistance, reach out to our support team. Happy trading!</p>
                        </div>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold">Contact Us</h2>
                        <form className="mt-8 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" defaultValue="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea id="message" placeholder="Enter your message" className="min-h-[120px]" required />
                            </div>
                            <Button type="submit" className="w-full">
                                Submit
                            </Button>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    )
}

// function HomeIcon(props) {
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
//             <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
//             <polyline points="9 22 9 12 15 12 15 22" />
//         </svg>
//     )
// }


// function InfoIcon(props) {
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
//             <circle cx="12" cy="12" r="10" />
//             <path d="M12 16v-4" />
//             <path d="M12 8h.01" />
//         </svg>
//     )
// }


// function MailIcon(props) {
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
//             <rect width="20" height="16" x="2" y="4" rx="2" />
//             <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
//         </svg>
//     )
// }


function PaperclipIcon(props) {
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
            <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
        </svg>
    )
}


function PenToolIcon(props) {
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
            <path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z" />
            <path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18" />
            <path d="m2.3 2.3 7.286 7.286" />
            <circle cx="11" cy="11" r="2" />
        </svg>
    )
}


function PowerIcon(props) {
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
            <path d="M12 2v10" />
            <path d="M18.4 6.6a9 9 0 1 1-12.77.04" />
        </svg>
    )
}


function ShieldIcon(props) {
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
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        </svg>
    )
}


function TestTubeIcon(props) {
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
            <path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5h0c-1.4 0-2.5-1.1-2.5-2.5V2" />
            <path d="M8.5 2h7" />
            <path d="M14.5 16h-5" />
        </svg>
    )
}


function TrendingUpIcon(props) {
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
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
        </svg>
    )
}


// function UserIcon(props) {
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
//             <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
//             <circle cx="12" cy="7" r="4" />
//         </svg>
//     )
// }


// function WalletIcon(props) {
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
//             <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
//             <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
//         </svg>
//     )
// }


function WebhookIcon(props) {
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
            <path d="M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2" />
            <path d="m6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06" />
            <path d="m12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8" />
        </svg>
    )
}