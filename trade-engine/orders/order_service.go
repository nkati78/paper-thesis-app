package orders

import (
	"context"
	"errors"
	"github.com/paper-thesis/trade-engine/orders/data"
)

type OrderRequest struct {
	Price    int64  `json:"price"`
	Quantity uint32 `json:"quantity"`
	Side     string `json:"side"`
	Type     string `json:"type"`
	Symbol   string `json:"symbol"`
}

type OrderResponse struct {
	OrderID string `json:"order_id"`
}

func NewOrderService(dal data.OrderProvider) OrderService {
	return OrderService{
		dal: dal,
	}
}

type OrderService struct {
	dal data.OrderProvider
}

func (os OrderService) CreateOrder(ctx context.Context, userID string, orderRequest OrderRequest) (*OrderResponse, error) {
	if len(userID) == 0 {
		return nil, errors.New("user is not authenticated")
	}

	order := NewOrder(
		orderRequest.Price,
		orderRequest.Quantity,
		userID,
		orderRequest.Symbol,
		TradeSide(orderRequest.Side),
		OrderType(orderRequest.Type),
	)

	if order.Type == Market {
		// Fill the order immediately
		order.Fill(order.Quantity)
		order.Status = Filled
	} else {
		// Insert the order into the order book
		orders := OrderBookInsert(orderBooks[order.Symbol], order)
		orderBooks[order.Symbol] = orders
		order.Status = Open
	}

	orderDB, err := os.dal.CreateOrder(ctx, order.ToDB())
	if err != nil {
		return nil, err
	}

	return &OrderResponse{OrderID: orderDB.ID}, nil
}

func (os OrderService) GetOrderBook(symbol string) OrderBook {
	return orderBooks[symbol]
}

func (os OrderService) GetOrderByUserID(ctx context.Context, userID string) ([]*Order, error) {
	orders, err := os.dal.GetUserOrders(ctx, userID)
	if err != nil {
		return nil, nil
	}

	userOrders := make([]*Order, 0)
	for _, order := range orders {
		userOrders = append(userOrders, &Order{
			OrderID:   order.ID,
			Price:     order.Price,
			Quantity:  order.Quantity,
			UserID:    order.UserID,
			Symbol:    order.Symbol,
			Timestamp: order.CreatedAt,
			Side:      TradeSide(order.Side),
			Type:      OrderType(order.Type),
		})
	}

	return userOrders, nil
}

func (os OrderService) CancelOrder(orderID string) {
	for symbol, orders := range orderBooks {
		for _, order := range orders {
			if order.OrderID == orderID {
				orders = OrderBookRemove(orders, orderID)
				orderBooks[symbol] = orders
				return
			}
		}
	}
}
