import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import { AddressInfo } from 'net';
import Timer = NodeJS.Timer;

const app = express();

// initialize a simple http server
const server = http.createServer(app);

// initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

let timer: Timer;

let price = 100;
let symbol = 'AAPL';

wss.on('connection', (ws: WebSocket) => {
        const data = {
          timestamp: Math.floor(Date.now() / 1000),
          price: price.toFixed(2),
          symbol: symbol
        };

        ws.send(JSON.stringify(data))
        console.log(ws.readyState)
        
        timer = setInterval(() => {
            if (ws && ws.readyState === WebSocket.OPEN) {
                price = ((Math.random() * (0.25 - 0)) * (Math.round(Math.random()) * 2 - 1) + price);
        
                const data = {
                    timestamp: Math.floor(Date.now() / 1000),
                    price: price.toFixed(2),
                    symbol: symbol
                };
                console.log(data);
                ws.send(JSON.stringify(data))
            } else {
                clearInterval(timer[Symbol.toPrimitive]());
            }
        }, 1000); // ~ 256 Hz

});

wss.on('close', () => {
    clearInterval(timer[Symbol.toPrimitive]());
})

// start our server
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${(server.address() as AddressInfo).port} :)`);
});
