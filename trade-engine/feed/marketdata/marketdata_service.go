package marketdata

import (
	"context"

	"github.com/paper-thesis/trade-engine/feed/marketdata/data"
)

type MarketDataService struct {
	dal data.DataProvider
}

func NewMarketDataService(dal data.DataProvider) MarketDataService {
	return MarketDataService{
		dal: dal,
	}
}

type MarketData struct {
	ID        string `json:"id"`
	Symbol    string `json:"symbol"`
	Price     uint64 `json:"price"`
	UpdatedAt string `json:"updated_at"`
}

type SymbolData struct {
	Symbol   string `json:"symbol"`
	Exchange string `json:"exchange"`
}

func (m MarketDataService) GetMarketData(ctx context.Context, symbol string) (*MarketData, error) {
	// Get market data
	data, err := m.dal.GetMarketPrice(ctx, symbol)
	if err != nil {
		return nil, err
	}

	return &MarketData{
		ID:        data.ID,
		Symbol:    data.Symbol,
		Price:     data.Price,
		UpdatedAt: data.UpdatedAt.String(),
	}, nil
}

func (m MarketDataService) UpsertMarketData(ctx context.Context, marketData MarketData) (*MarketData, error) {
	// Upsert market data
	data := data.MarketPrice{
		ID:     marketData.ID,
		Symbol: marketData.Symbol,
		Price:  marketData.Price,
	}

	_, err := m.dal.UpsertMarketPrice(ctx, data)
	if err != nil {
		return nil, err
	}

	return &marketData, nil
}

func (m MarketDataService) GetSymbols(ctx context.Context) ([]SymbolData, error) {
	// Get symbols
	symbols, err := m.dal.GetSymbols(ctx)
	if err != nil {
		return nil, err
	}

	var symbolsList []SymbolData
	for _, symbol := range symbols {
		symbolsList = append(symbolsList, SymbolData{
			Symbol:   symbol.Symbol,
			Exchange: symbol.Exchange,
		})
	}

	return symbolsList, nil
}
