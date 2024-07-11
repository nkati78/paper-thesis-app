<script lang="ts">
import type { ChartOptions, DeepPartial, UTCTimestamp } from 'lightweight-charts';
import { createChart } from 'lightweight-charts';
import { onMount } from 'svelte';

let socket: WebSocket;

function initiateChart() {
    /*
    const chartOptions: DeepPartial<ChartOptions> = {
    layout: {
        textColor: 'black',
        background: { type: 'solid', color: 'black' },
    },
    height: 200,
};
    const container = document.getElementById('chart') as HTMLDivElement;
    const chart = createChart(container,chartOptions);
    const lineSeries = chart.addLineSeries();
    
    socket = new WebSocket("ws://localhost:8999")
    const baselineSeries = chart.addBaselineSeries({ baseValue: { type: 'price', price: 100 }, topLineColor: 'rgba( 38, 166, 154, 1)', topFillColor1: 'rgba( 38, 166, 154, 0.28)', topFillColor2: 'rgba( 38, 166, 154, 0.05)', bottomLineColor: 'rgba( 239, 83, 80, 1)', bottomFillColor1: 'rgba( 239, 83, 80, 0.05)', bottomFillColor2: 'rgba( 239, 83, 80, 0.28)' });
    chart.timeScale().fitContent();
*/

socket = new WebSocket("ws://localhost:8999")

const chartOptions: DeepPartial<ChartOptions> = {
    layout: {
            background: { color: '#222' },
            textColor: '#DDD',
        },
        grid: {
            vertLines: { color: '#444' },
            horzLines: { color: '#444' },
        },
        height: 400,
        width: 600,
};
    const container = document.getElementById('chart') as HTMLDivElement;
    const chart = createChart(container,chartOptions);
    
    socket = new WebSocket("ws://localhost:8999")
    const baselineSeries = chart.addBaselineSeries({ baseValue: { type: 'price', price: 100 }, topLineColor: 'rgba( 38, 166, 154, 1)', topFillColor1: 'rgba( 38, 166, 154, 0.28)', topFillColor2: 'rgba( 38, 166, 154, 0.05)', bottomLineColor: 'rgba( 239, 83, 80, 1)', bottomFillColor1: 'rgba( 239, 83, 80, 0.05)', bottomFillColor2: 'rgba( 239, 83, 80, 0.28)' });
    chart.timeScale().fitContent();



    // Setting the border color for the vertical axis
chart.priceScale('right').applyOptions({
    borderColor: '#71649C',
});

// Setting the border color for the horizontal axis
chart.timeScale().applyOptions({
    borderColor: '#71649C',
});

    socket.onopen = function() {
        console.log("Connected")
    }
    socket.addEventListener("message", (message: any) => {
        console.log(message)
        console.log(message.data.price)
    });
    socket.onmessage = function(event) {
        console.log(event.data)
        var data = JSON.parse(event.data);
        console.log(data.price)
        const seriesTimeStamp = Number(data.timestamp) as UTCTimestamp;
        baselineSeries.update({ value: Number(data.price), time: seriesTimeStamp});
        //console.log(event.data)
    }
}
onMount(() => {
    initiateChart();

    // return cleanup function
    return ()=> {
        socket.close();
    };
});

</script>

<div>
    <h1>Page</h1>
    <p>Page content</p>
    <div id="chart"></div>
</div>