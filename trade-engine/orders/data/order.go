package data

import (
	"context"
	"time"

	"github.com/uptrace/bun"
)

type Order struct {
	bun.BaseModel `bun:"table:orders,alias:o"`

	ID       string `bun:"id,pk,type:uuid,default:uuid_generate_v4()"`
	Price    int64  `bun:"price"`
	Quantity uint32 `bun:"quantity"`
	Side     string `bun:"side"`
	Type     string `bun:"type"`
	Symbol   string `bun:"symbol"`
	UserID   string `bun:"user_id"`
	Status   string `bun:"status"`

	CreatedAt time.Time `bun:"created_at"`
	UpdatedAt time.Time `bun:"updated_at"`
}

// GetUserOrders is a function that returns all orders for a user.
func (dp DataProvider) GetUserOrders(ctx context.Context, userID string) ([]Order, error) {
	var orders []Order

	err := dp.db.NewSelect().Model(&orders).Where("user_id = ?", userID).Scan(ctx)
	if err != nil {
		return nil, err
	}

	return orders, nil
}

func (dp DataProvider) GetOrdersBySymbol(ctx context.Context, symbol string) ([]Order, error) {
	var orders []Order

	err := dp.db.NewSelect().Model(&orders).Where("symbol = ?", symbol).Scan(ctx)
	if err != nil {
		return nil, err
	}

	return orders, nil
}

func (dp DataProvider) GetOrder(ctx context.Context, orderID string) (*Order, error) {
	var order Order

	err := dp.db.NewSelect().Model(&order).Where("id = ?", orderID).Scan(ctx)
	if err != nil {
		return nil, err
	}

	return &order, nil
}

func (dp DataProvider) CreateOrder(ctx context.Context, order Order) (*Order, error) {
	_, err := dp.db.NewInsert().Model(&order).Exec(ctx)
	if err != nil {
		return nil, err
	}

	return &order, nil
}

func (dp DataProvider) UpdateOrder(ctx context.Context, order Order) (*Order, error) {
	_, err := dp.db.NewUpdate().Model(&order).WherePK().Exec(ctx)
	if err != nil {
		return nil, err
	}

	return &order, nil
}
