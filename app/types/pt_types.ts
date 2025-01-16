export interface pt_register {
    username?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    type: string,
    redirect?: boolean
}

export interface pt_login {
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