package marketdata

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/paper-thesis/trade-engine/feed/robinhood"
)

// Worker is a struct that represents a worker that will be used to process the feed
type Worker struct {
	marketDataService MarketDataService
}

// NewWorker creates a new worker
func NewWorker(marketDataService MarketDataService) *Worker {
	return &Worker{
		marketDataService: marketDataService,
	}
}

func getBearerToken() string {
	token := os.Getenv("BEARER_TOKEN")

	return token
}

// Start starts the worker
func (w *Worker) Start() {
	marketdata := robinhood.NewProvider(getBearerToken(), map[string]string{"MSFT": "50810c35-d215-4866-9758-0ada4ac79ffa"})

	for {
		quotes, err := marketdata.RetrievePrices()
		if err != nil {
			panic(err)
		}

		_, err = w.marketDataService.UpsertMarketData(context.Background(), MarketData{
			Symbol: "MSFT",
			Price:  quotes["MSFT"].LastTradePrice,
		})
		if err != nil {
			fmt.Println(err)
		}

		time.Sleep(800 * time.Millisecond)
	}
}
