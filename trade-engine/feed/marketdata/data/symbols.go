package data

import (
	"context"

	"github.com/uptrace/bun"
)

type Symbols struct {
	bun.BaseModel `bun:"table:symbols,alias:s"`
	ID            string `bun:"id,pk,type:uuid,default:uuid_generate_v4()"`
	Symbol        string `bun:"symbol"`
	Exchange      string `bun:"exchange"`
}

// GetSymbols is a function that returns all symbols.
func (dp DataProvider) GetSymbols(ctx context.Context) ([]Symbols, error) {
	var symbols []Symbols

	err := dp.db.NewSelect().Model(&symbols).Scan(ctx)
	if err != nil {
		return nil, err
	}

	return symbols, nil
}
