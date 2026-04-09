import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi, ISeriesApi, CandlestickSeries } from 'lightweight-charts';
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/user/userSlice";
import { get_symbol, normalizeTimestamp, subtract_days } from "../../../lib/std";


export default function DashboardChart (props: { symbol: string }) {

    const { symbol } = props;

    const user = useSelector(selectUser);
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const candlestickSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);

    useEffect(() => {

        (async () => {

            if (typeof window !== 'undefined' && chartContainerRef.current) {

                if (chartRef.current) {

                    chartRef.current.remove();
                    chartRef.current = null;

                }

                const chart = createChart(chartContainerRef.current, {
                    layout: {
                        background: { type: ColorType.Solid, color: user.dark_mode ? '#121212' : '#ffffff' },
                        textColor: user.dark_mode ? '#ffffff' : '#000000',
                    },
                });

                const symbolFetch = await get_symbol(symbol);

                if (symbolFetch) {

                    const normalizedDate = normalizeTimestamp(symbolFetch.updated_at);

                    const chartData = [
                        { time: subtract_days(normalizedDate, 7), open: 60.71, high: 60.71, low: 53.39, close: 59.29 },
                        { time: subtract_days(normalizedDate, 6), open: 68.26, high: 68.26, low: 59.04, close: 60.50 },
                        { time: subtract_days(normalizedDate, 5), open: 67.71, high: 105.85, low: 66.67, close: 91.04 },
                        { time: subtract_days(normalizedDate, 4), open: 91.04, high: 121.40, low: 82.70, close: 111.40 },
                        { time: subtract_days(normalizedDate, 3), open: 111.51, high: 142.83, low: 103.34, close: 131.25 },
                        { time: subtract_days(normalizedDate, 2), open: symbolFetch.yesterdayOpen / 100, high: symbolFetch.yesterdayHigh / 100, low: symbolFetch.yesterdayLow, close: symbolFetch.yesterdayClose / 100 },
                        { time: subtract_days(normalizedDate, 1), open: symbolFetch.todayOpen / 100, high: symbolFetch.todayHigh / 100, low: symbolFetch.todayLow / 100, close: symbolFetch.price / 100 },
                    ];

                    const candlestickSeries = chart.addSeries(CandlestickSeries, {
                        upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
                        wickUpColor: '#26a69a', wickDownColor: '#ef5350',
                    });

                    candlestickSeries.setData(chartData);

                    candlestickSeriesRef.current = candlestickSeries;

                    chart.timeScale().fitContent();

                    chartRef.current = chart;

                    return () => {

                        if (chartRef.current) {

                            chartRef.current.remove();

                        }

                    };

                }

            }

        })();

    }, [symbol]);

    //Darkmode handler for chart
    useEffect(() => {

        if (chartRef.current) {

            chartRef.current.applyOptions({
                layout: {
                    background: { type: ColorType.Solid, color: user.dark_mode ? '#121212' : '#ffffff' },
                    textColor: user.dark_mode ? '#ffffff' : '#000000',
                },
            });

        }

    }, [user.dark_mode]);


    useEffect(() => {

        const resizeObserver = new ResizeObserver((entries) => {

            for (let entry of entries) {

                if (chartRef.current && entry.contentRect) {

                    chartRef.current.resize(entry.contentRect.width, entry.contentRect.height);

                }

            }

        });

        if (chartContainerRef.current) {

            resizeObserver.observe(chartContainerRef.current);

        }

        return () => {

            if (chartContainerRef.current) {

                resizeObserver.unobserve(chartContainerRef.current);

            }

        };

    }, []);

    return (
        <div className="h-full w-full">
            <div ref={chartContainerRef} id="mainChart" className="h-full w-full min-h-[300px]"/>
        </div>
    );

};