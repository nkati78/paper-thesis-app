import { Button } from "../components/shadecn_components/ui/button";

export default function Component() {

    // TODO: Base dark mode off user state value

    return (
        <div className="grid min-h-screen w-full grid-cols-1 gap-8 bg-background p-4 md:grid-cols-2 lg:grid-cols-3 lg:p-8">
            <div className="flex flex-col gap-4 rounded-lg bg-card p-6 shadow-md">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Purchase PC</h2>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <DollarSignIcon className="h-4 w-4" />
                        <span>USD</span>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <h3 className="text-lg font-medium">Small Package</h3>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-4xl font-bold">500</span>
                                <span className="text-muted-foreground">PC</span>
                            </div>
                            <div className="flex items-center gap-2 text-lg font-medium">
                                <DollarSignIcon className="h-5 w-5" />
                                <span>4.99</span>
                            </div>
                        </div>
                        <Button className="w-full">Purchase</Button>
                    </div>
                    <div className="grid gap-2">
                        <h3 className="text-lg font-medium">Medium Package</h3>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-4xl font-bold">1,100</span>
                                <span className="text-muted-foreground">PC</span>
                            </div>
                            <div className="flex items-center gap-2 text-lg font-medium">
                                <DollarSignIcon className="h-5 w-5" />
                                <span>9.99</span>
                            </div>
                        </div>
                        <Button className="w-full">Purchase</Button>
                    </div>
                    <div className="grid gap-2">
                        <h3 className="text-lg font-medium">Large Package</h3>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-4xl font-bold">2,500</span>
                                <span className="text-muted-foreground">PC</span>
                            </div>
                            <div className="flex items-center gap-2 text-lg font-medium">
                                <DollarSignIcon className="h-5 w-5" />
                                <span>19.99</span>
                            </div>
                        </div>
                        <Button className="w-full">Purchase</Button>
                    </div>
                    <div className="grid gap-2">
                        <h3 className="text-lg font-medium">Extra Large Package</h3>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-4xl font-bold">7,000</span>
                                <span className="text-muted-foreground">PC</span>
                            </div>
                            <div className="flex items-center gap-2 text-lg font-medium">
                                <DollarSignIcon className="h-5 w-5" />
                                <span>49.99</span>
                            </div>
                        </div>
                        <Button className="w-full">Purchase</Button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 rounded-lg bg-card p-6 shadow-md">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Purchase TC</h2>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <DollarSignIcon className="h-4 w-4" />
                        <span>USD</span>
                        <WalletCardsIcon className="h-4 w-4" />
                        <span>PC</span>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <h3 className="text-lg font-medium">TC Starter Pack</h3>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-4xl font-bold">100</span>
                                <span className="text-muted-foreground">TC</span>
                            </div>
                            <div className="flex items-center gap-2 text-lg font-medium">
                                <DollarSignIcon className="h-5 w-5" />
                                <span>1.99</span>
                            </div>
                        </div>
                        <Button className="w-full">Purchase</Button>
                    </div>
                    <div className="grid gap-2">
                        <h3 className="text-lg font-medium">TC Standard Pack</h3>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-4xl font-bold">500</span>
                                <span className="text-muted-foreground">TC</span>
                            </div>
                            <div className="flex items-center gap-2 text-lg font-medium">
                                <DollarSignIcon className="h-5 w-5" />
                                <span>7.99</span>
                            </div>
                        </div>
                        <Button className="w-full">Purchase</Button>
                    </div>
                    <div className="grid gap-2">
                        <h3 className="text-lg font-medium">TC Deluxe Pack</h3>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-4xl font-bold">1,000</span>
                                <span className="text-muted-foreground">TC</span>
                            </div>
                            <div className="flex items-center gap-2 text-lg font-medium">
                                <WalletCardsIcon className="h-5 w-5" />
                                <span>15.99</span>
                            </div>
                        </div>
                        <Button className="w-full">Purchase</Button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 rounded-lg bg-card p-6 shadow-md">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Digital Items</h2>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <WalletCardsIcon className="h-4 w-4" />
                        <span>PC</span>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <h3 className="text-lg font-medium">Digital Token</h3>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-4xl font-bold">50</span>
                                <span className="text-muted-foreground">PC</span>
                            </div>
                            <Button>Purchase</Button>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <h3 className="text-lg font-medium">Gift Card</h3>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-4xl font-bold">100</span>
                                <span className="text-muted-foreground">PC</span>
                            </div>
                            <Button>Purchase</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DollarSignIcon(props) {
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
            <line x1="12" x2="12" y1="2" y2="22" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
    );
}


function WalletCardsIcon(props) {
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
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2" />
            <path d="M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21" />
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