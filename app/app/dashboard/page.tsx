"use client";

import { useEffect, useState } from "react";
import { Button } from "../components/shadecn_components/ui/button";
import { Input } from "../components/shadecn_components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../components/shadecn_components/ui/table";
import { ResponsiveLine } from "@nivo/line";
import { CartesianGrid, XAxis, Line, LineChart } from "recharts";
import { ChartTooltipContent, ChartTooltip, ChartContainer } from "../components/shadecn_components/ui/chart";
import { updateUser, selectUser } from "../../lib/redux/features/user/userSlice";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../lib/redux/hooks";
import { usePathname } from "next/navigation";
import { ColorType, createChart } from "lightweight-charts";


export default function Component () {

    const user = useSelector(selectUser);
    const dispatch = useAppDispatch();

    // TODO: Work out charting with lightweight charts, look for potential alternatives

    console.log(user);

    const [leaderboardView, setLeaderboardView] = useState<string>("earnings");
    const [watchlist, setWatchlist] = useState([
        { ticker: "RON", lastPrice: 150, dayChangePercent: 2.5, dayChangeAmount: 3.75 },
        { ticker: "HAM", lastPrice: 300, dayChangePercent: -1.2, dayChangeAmount: -3.6 },
        { ticker: "JEFF", lastPrice: 280, dayChangePercent: 0.8, dayChangeAmount: 2.24 },
        { ticker: "YAMS", lastPrice: 120, dayChangePercent: -0.5, dayChangeAmount: -0.6 },
    ]);
    const addToWatchlist = (ticker, lastPrice, dayChangePercent, dayChangeAmount) => {

        setWatchlist([...watchlist, { ticker, lastPrice, dayChangePercent, dayChangeAmount }]);

    };
    const removeFromWatchlist = (index) => {

        const updatedWatchlist = [...watchlist];
        updatedWatchlist.splice(index, 1);
        setWatchlist(updatedWatchlist);

    };
    // const [chart, setChart] = useState<HTMLElement | null>(null);
    // const chartDiv = document.getElementById('mainChart');
    //
    // const chart = createChart(chartDiv!);
    const chart_color = user.dark_mode ? '240 5% 6%' : '0 0% 100%';

    useEffect(() => {

        if (document) {

            const chartDiv = document.getElementById('mainChart');

            if (chartDiv) {

                const chart_options = {
                    layout: {
                        background: {
                            type: ColorType.Solid,
                            color: chart_color as string
                        }
                    }
                };

                const chart = createChart(chartDiv, chart_options);

                const areaSeries = chart.addAreaSeries({
                    lineColor: '#2962FF', topColor: '#2962FF',
                    bottomColor: 'rgba(41, 98, 255, 0.28)',
                });

                areaSeries.setData([
                    { time: '2018-12-22', value: 32.51 },
                    { time: '2018-12-23', value: 31.11 },
                    { time: '2018-12-24', value: 27.02 },
                    { time: '2018-12-25', value: 27.32 },
                    { time: '2018-12-26', value: 25.17 },
                    { time: '2018-12-27', value: 28.89 },
                    { time: '2018-12-28', value: 25.46 },
                    { time: '2018-12-29', value: 23.92 },
                    { time: '2018-12-30', value: 22.68 },
                    { time: '2018-12-31', value: 22.67 },
                ]);

                const candlestickSeries = chart.addCandlestickSeries({
                    upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
                    wickUpColor: '#26a69a', wickDownColor: '#ef5350',
                });
                candlestickSeries.setData([
                    { time: '2018-12-22', open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
                    { time: '2018-12-23', open: 45.12, high: 53.90, low: 45.12, close: 48.09 },
                    { time: '2018-12-24', open: 60.71, high: 60.71, low: 53.39, close: 59.29 },
                    { time: '2018-12-25', open: 68.26, high: 68.26, low: 59.04, close: 60.50 },
                    { time: '2018-12-26', open: 67.71, high: 105.85, low: 66.67, close: 91.04 },
                    { time: '2018-12-27', open: 91.04, high: 121.40, low: 82.70, close: 111.40 },
                    { time: '2018-12-28', open: 111.51, high: 142.83, low: 103.34, close: 131.25 },
                    { time: '2018-12-29', open: 131.33, high: 151.17, low: 77.68, close: 96.43 },
                    { time: '2018-12-30', open: 106.33, high: 110.20, low: 90.39, close: 98.10 },
                    { time: '2018-12-31', open: 109.87, high: 114.69, low: 85.66, close: 111.26 },
                ]);

                chart.timeScale().fitContent();

            }
        }

    }, []);


    // TODO: Hook to grab Leaderboard info
    // TODO: Hook to grab watchlist info
    // TODO: Hook to grab Open Positions

    // const addToWatchlist = () => {
    //
    //
    // };

    return (
        <div className="flex min-h-screen w-full flex-col bg-background">
            <main className="flex-1 grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
                <div className="flex flex-col gap-6 p-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Dashboard</h1>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon">
                                <RefreshCwIcon className="h-4 w-4"/>
                                <span className="sr-only">Refresh</span>
                            </Button>
                        </div>
                    </div>
                    <div className="border shadow-sm rounded-lg overflow-hidden">
                        <div className="flex items-center justify-between bg-muted/40 px-6 py-4">
                            <div className="flex items-center gap-2">
                                <h2 className="text-lg font-semibold">Stock Chart</h2>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Tally2Icon className="h-5 w-5"/>
                                    <span>RON</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="relative flex-1">
                                    <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                                    <Input
                                        type="search"
                                        placeholder="Search..."
                                        className="w-full rounded-lg bg-background pl-8 pr-4 py-2"
                                    />
                                </div>
                                <Button size="sm" className="px-6 py-2">
                                    Trade
                                </Button>
                                <Button variant="outline" size="sm">
                                    1D
                                </Button>
                                <Button variant="outline" size="sm">
                                    1W
                                </Button>
                                <Button variant="outline" size="sm">
                                    1M
                                </Button>
                                <Button variant="outline" size="sm">
                                    1Y
                                </Button>
                            </div>
                        </div>
                        <div className="h-[400px] flex items-center justify-center">
                            <div id={'mainChart'} className="h-full w-full"></div>
                            {/*<FilledtimeseriesChart className="h-full w-full"/>*/}
                        </div>
                    </div>
                    <div className="border shadow-sm rounded-lg overflow-hidden">
                        <div className="flex items-center justify-between bg-muted/40 px-6 py-4">
                            <h2 className="text-lg font-semibold">Open Positions</h2>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="icon">
                                    <RefreshCwIcon className="h-4 w-4"/>
                                    <span className="sr-only">Refresh</span>
                                </Button>
                            </div>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Ticker</TableHead>
                                    <TableHead>Last Price</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Cost Basis</TableHead>
                                    <TableHead>Cost Basis Total</TableHead>
                                    <TableHead>Value</TableHead>
                                    <TableHead>Day Change (%)</TableHead>
                                    <TableHead>Day Change ($)</TableHead>
                                    <TableHead>Total Change ($)</TableHead>
                                    <TableHead>Total Change (%)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>RON</TableCell>
                                    <TableCell className="text-green-500">$150.00</TableCell>
                                    <TableCell>10</TableCell>
                                    <TableCell>$145.00</TableCell>
                                    <TableCell>$1,450.00</TableCell>
                                    <TableCell>$1,500.00</TableCell>
                                    <TableCell className="text-green-500">+2.5%</TableCell>
                                    <TableCell className="text-green-500">+$3.75</TableCell>
                                    <TableCell className="text-green-500">+$50.00</TableCell>
                                    <TableCell className="text-green-500">+3.45%</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>HAM</TableCell>
                                    <TableCell className="text-red-500">$300.00</TableCell>
                                    <TableCell>5</TableCell>
                                    <TableCell>$320.00</TableCell>
                                    <TableCell>$1,600.00</TableCell>
                                    <TableCell>$1,500.00</TableCell>
                                    <TableCell className="text-red-500">-1.2%</TableCell>
                                    <TableCell className="text-red-500">-$3.60</TableCell>
                                    <TableCell className="text-red-500">-$100.00</TableCell>
                                    <TableCell className="text-red-500">-6.25%</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>JEFF</TableCell>
                                    <TableCell className="text-green-500">$280.00</TableCell>
                                    <TableCell>8</TableCell>
                                    <TableCell>$275.00</TableCell>
                                    <TableCell>$2,200.00</TableCell>
                                    <TableCell>$2,240.00</TableCell>
                                    <TableCell className="text-green-500">+0.8%</TableCell>
                                    <TableCell className="text-green-500">+$2.24</TableCell>
                                    <TableCell className="text-green-500">+$40.00</TableCell>
                                    <TableCell className="text-green-500">+1.82%</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
                <div className="bg-muted/40 p-6">
                    <div className="border shadow-sm rounded-lg overflow-hidden">
                        <div className="flex items-center justify-between bg-muted/40 px-6 py-4">
                            <h2 className="text-lg font-semibold">Leaderboard</h2>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant={leaderboardView === "earnings" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setLeaderboardView("earnings")}
                                >
                                    $
                                </Button>
                                <Button
                                    variant={leaderboardView === "percentage" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setLeaderboardView("percentage")}
                                >
                                    %
                                </Button>
                                <Button variant="outline" size="icon">
                                    <RefreshCwIcon className="h-4 w-4"/>
                                    <span className="sr-only">Refresh</span>
                                </Button>
                            </div>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Rank</TableHead>
                                    <TableHead>User</TableHead>
                                    {leaderboardView === "earnings" ? (
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
                                    {leaderboardView === "earnings" ? (
                                        <TableCell className="text-green-500">$12,345.67</TableCell>
                                    ) : (
                                        <TableCell className="text-green-500">+45.67%</TableCell>
                                    )}
                                </TableRow>
                                <TableRow>
                                    <TableCell>2</TableCell>
                                    <TableCell>Nick K</TableCell>
                                    {leaderboardView === "earnings" ? (
                                        <TableCell className="text-green-500">$9,876.54</TableCell>
                                    ) : (
                                        <TableCell className="text-green-500">+32.54%</TableCell>
                                    )}
                                </TableRow>
                                <TableRow>
                                    <TableCell>3</TableCell>
                                    <TableCell>Mike H</TableCell>
                                    {leaderboardView === "earnings" ? (
                                        <TableCell className="text-red-500">-$3,210.98</TableCell>
                                    ) : (
                                        <TableCell className="text-red-500">-10.98%</TableCell>
                                    )}
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                    <div className="border shadow-sm rounded-lg overflow-hidden mt-6">
                        <div className="flex items-center justify-between bg-muted/40 px-6 py-4">
                            <h2 className="text-lg font-semibold">Watchlist</h2>
                            <div className="flex items-center gap-2">
                                <Input
                                    type="text"
                                    placeholder="Enter ticker"
                                    className="w-full rounded-lg bg-background px-4 py-2"
                                    onKeyDown={(e) => {

                                        if (e.key === "Enter") {

                                            addToWatchlist("ABCD", 100, 1.5, 1.5);

                                        }

                                    }}
                                />
                                <Button size="sm" onClick={() => addToWatchlist("ABCD", 100, 1.5, 1.5)}>
                                    Add to Watchlist
                                </Button>
                            </div>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Ticker</TableHead>
                                    <TableHead>Last Price</TableHead>
                                    <TableHead>Day Change (%)</TableHead>
                                    <TableHead>Day Change ($)</TableHead>
                                    <TableHead/>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {watchlist.map((stock, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{stock.ticker}</TableCell>
                                        <TableCell
                                            className={stock.dayChangePercent >= 0 ? "text-green-500" : "text-red-500"}>
                                            ${stock.lastPrice}
                                        </TableCell>
                                        <TableCell
                                            className={stock.dayChangePercent >= 0 ? "text-green-500" : "text-red-500"}>
                                            {stock.dayChangePercent}%
                                        </TableCell>
                                        <TableCell
                                            className={stock.dayChangeAmount >= 0 ? "text-green-500" : "text-red-500"}>
                                            ${stock.dayChangeAmount}
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="ghost" size="icon"
                                                onClick={() => removeFromWatchlist(index)}>
                                                <TrashIcon className="h-4 w-4"/>
                                                <span className="sr-only">Remove from Watchlist</span>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </main>
        </div>
    );

}

function FilledtimeseriesChart(props) {

    return (
        <div {...props}>
            <ResponsiveLine
                data={[
                    {
                        id: "Desktop",
                        data: [
                            { x: "Jan", y: 43 },
                            { x: "Feb", y: 137 },
                            { x: "Mar", y: 61 },
                            { x: "Apr", y: 145 },
                            { x: "May", y: 26 },
                            { x: "Jun", y: 154 },
                        ],
                    },
                    {
                        id: "Mobile",
                        data: [
                            { x: "Jan", y: 60 },
                            { x: "Feb", y: 48 },
                            { x: "Mar", y: 177 },
                            { x: "Apr", y: 78 },
                            { x: "May", y: 96 },
                            { x: "Jun", y: 204 },
                        ],
                    },
                ]}
                margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
                xScale={{
                    type: "point",
                }}
                yScale={{
                    type: "linear",
                    min: 0,
                    max: "auto",
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 0,
                    tickPadding: 16,
                }}
                axisLeft={{
                    tickSize: 0,
                    tickValues: 5,
                    tickPadding: 16,
                }}
                colors={["#2563eb", "#e11d48"]}
                pointSize={6}
                useMesh={true}
                curve="monotoneX"
                enableArea={true}
                gridYValues={6}
                defs={[
                    {
                        id: "line-chart-gradient",
                        type: "linearGradient",
                        colors: [
                            { offset: 0, color: "inherit" },
                            { offset: 200, color: "inherit", opacity: 0 },
                        ],
                    },
                ]}
                fill={[{ match: "*", id: "line-chart-gradient" }]}
                theme={{
                    tooltip: {
                        chip: {
                            borderRadius: "9999px",
                        },
                        container: {
                            fontSize: "12px",
                            textTransform: "capitalize",
                            borderRadius: "6px",
                        },
                    },
                    grid: {
                        line: {
                            stroke: "#f3f4f6",
                        },
                    },
                }}
                role="application"
            />
        </div>
    );

}


function LinechartChart (props) {

    return (
        <div {...props}>
            <ChartContainer
                config={{
                    desktop: {
                        label: "Desktop",
                        color: "hsl(var(--chart-1))",
                    },
                }}
            >
                <LineChart
                    accessibilityLayer
                    data={[
                        { month: "January", desktop: 186 },
                        { month: "February", desktop: 305 },
                        { month: "March", desktop: 237 },
                        { month: "April", desktop: 73 },
                        { month: "May", desktop: 209 },
                        { month: "June", desktop: 214 },
                    ]}
                    margin={{
                        left: 12,
                        right: 12,
                    }}
                >
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Line dataKey="desktop" type="natural" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
                </LineChart>
            </ChartContainer>
        </div>
    );

}


function RefreshCwIcon (props) {

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
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M8 16H3v5" />
        </svg>
    );

}


function SearchIcon (props) {

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
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    );

}


function Tally2Icon (props) {

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
            <path d="M4 4v16" />
            <path d="M9 4v16" />
        </svg>
    );

}


function TrashIcon (props) {

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
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
    );

}
