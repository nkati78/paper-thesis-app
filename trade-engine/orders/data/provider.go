package data

import "context"

type OrderProvider interface {
	GetUserOrders(ctx context.Context, userID string) ([]Order, error)
	GetOrdersBySymbol(ctx context.Context, symbol string) ([]Order, error)

	GetOrder(ctx context.Context, orderID string) (*Order, error)
	CreateOrder(ctx context.Context, order Order) (*Order, error)
	UpdateOrder(ctx context.Context, order Order) (*Order, error)
}
