package fakefeed

import (
	"math/rand/v2"
	"strconv"
)

type Provider struct {
	tickers map[string]float64 // map[symbol]ticker
}

func NewProvider(tickers map[string]float64) *Provider {
	return &Provider{
		tickers: tickers,
	}
}

func (p *Provider) RetrievePrices() (map[string]Quote, error) {
	quotes := make(map[string]Quote)

	for symbol, lastPrice := range p.tickers {
		// make price a random variation between 0.1% and 0.5% and floor it to 2 decimal places
		change := float64(lastPrice)*rand.Float64()*0.004 + 0.001*(rand.Float64()*2-1)

		// get 1 or -1 to determine if the price should go up or down
		direction := rand.IntN(2)*2 - 1

		lastPrice += change * float64(direction)

		p.tickers[symbol] = lastPrice

		quotes[symbol] = Quote{
			LastTradePrice: strconv.FormatFloat(lastPrice, 'f', 2, 64),
		}
	}

	return quotes, nil
}
