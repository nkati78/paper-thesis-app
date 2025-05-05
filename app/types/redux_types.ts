export interface userState {
    id: string,
    fn: string,
    ln: string,
    email: string,
    avatar: string,
    dark_mode: boolean,
    username: string,
    wallet: number,
    current_path: string,
    previous_path: string
}

export interface positionState {
    id: string,
    userId: string,
    currentPrice: number,
    costBasis: number,
    averagePrice: number,
    quantity: number,
    direction: string,
    orderId: string,
    profitLoss: number,
    symbol: string,
    status: string,
    value: number,
    dayChangePct: number,
    dayChangeDollar: number,
    totalChangeDollar: number,
    totalChangePct: number,
    createdAt: string,
    updatedAt: string
}

export interface watchlistState {
    id: string,
    symbol: string,
    sequenceNumber: number,
}

export interface symbolState {
    id: string,
    symbol: string,
    exchange: string,
}

export interface symbolWatchState extends symbolState {
    price: number,
    lastPrice: number,
    dayChangeDollar: number,
    dayChangePercent: number,
}
