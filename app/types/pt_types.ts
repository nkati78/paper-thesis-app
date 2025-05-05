export interface ptRegister {
    username?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    type: string,
    redirect?: boolean
}

export interface ptLogin {
    email: string | undefined,
    password: string | undefined,
    type: string,
    redirect?: boolean
}

export interface PTTransaction {
    id: number,
    transaction_id: string,
    date: string,
    type: string,
    status: string,
    ticker: string,
    price: number,
    amount: number,
}

export interface chartDefault {
    symbol: string,
    current_price: number,
    day_change_dollars: number,
    day_change_percent: number
}

export interface symbolState {
    current_price: number,
    price_change: number,
    symbol: string | null
}

export interface tradeModalForm extends symbolState {
    action: string,
    order_type: string,
    quantity: number,
    total_cost: number,
}

export interface dashboardWatchList {
    ticker: string,
    currentPrice: number,
    lastPrice: number,
    dayChangePercent: number,
    dayChangeAmount: number,
    sequenceNumber: number
}