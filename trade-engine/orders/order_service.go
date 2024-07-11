package orders

type OrderRequest struct {
	Price    float64 `json:"price"`
	Quantity uint32  `json:"quantity"`
	Side     string  `json:"side"`
	Type     string  `json:"type"`
	Symbol   string  `json:"symbol"`
	UserID   string  `json:"user_id"`
}

type OrderResponse struct {
	OrderID string `json:"order_id"`
}

func CreateOrder(orderRequest OrderRequest) OrderResponse {
	order := NewOrder(orderRequest.Price, orderRequest.Quantity, orderRequest.UserID, orderRequest.Symbol, TradeSide(orderRequest.Side), OrderType(orderRequest.Type))

	if order.Type == Market {
		// Fill the order immediately
		order.Fill(order.Quantity)
	} else {
		// Insert the order into the order book
		orders := OrderBookInsert(orderBooks[order.Symbol], order)
		orderBooks[order.Symbol] = orders
	}

	return OrderResponse{OrderID: order.OrderID}
}

func GetOrderBook(symbol string) OrderBook {
	return orderBooks[symbol]
}

func GetOrderByUserID(userID string) []*Order {
	var userOrders []*Order
	for _, orders := range orderBooks {
		for _, order := range orders {
			if order.UserID == userID {
				userOrders = append(userOrders, order)
			}
		}
	}
	return userOrders
}

func CancelOrder(orderID string) {
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
