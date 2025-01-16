package marketdata

import (
	"context"
	"fmt"
	"github.com/paper-thesis/trade-engine/feed/fakefeed"
	"github.com/paper-thesis/trade-engine/orders"
	"os"
	"strconv"
	"time"
)

// Worker is a struct that represents a worker that will be used to process the feed
type Worker struct {
	marketDataService MarketDataService
	orderService      orders.OrderService
}

// NewWorker creates a new worker
func NewWorker(marketDataService MarketDataService, orderService orders.OrderService) *Worker {
	return &Worker{
		marketDataService: marketDataService,
		orderService:      orderService,
	}
}

func getBearerToken() string {
	token := os.Getenv("BEARER_TOKEN")

	return token
}

// Start starts the worker
func (w *Worker) Start() {
	// marketdata := robinhood.NewProvider(getBearerToken(), map[string]string{"MSFT": "50810c35-d215-4866-9758-0ada4ac79ffa"})
	marketdata := fakefeed.NewProvider(map[string]float64{"MSFT": 230.00})

	for {
		quotes, err := marketdata.RetrievePrices()
		if err != nil {
			panic(err)
		}

		for symbol, value := range quotes {
			_, err = w.marketDataService.UpsertMarketData(context.Background(), MarketData{
				Symbol: symbol,
				Price:  value.LastTradePrice,
			})
			if err != nil {
				fmt.Println(err)
			}

			newPrice, err := strconv.ParseFloat(value.LastTradePrice, 64)
			if err != nil {
				fmt.Println(err)
			}

			err = w.orderService.UpdatePositionsBySymbol(context.Background(), symbol, newPrice)
			if err != nil {
				fmt.Println(err)
			}
		}

		time.Sleep(5 * time.Second)
	}
}
