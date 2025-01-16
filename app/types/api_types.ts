export interface PTAccount {
    id: string,
    email: string,
    first_name: string,
    last_name: string,
    connection_type: string,
    provider_id: string,
    created_at: string,
    updated_at: string
}

export interface PTProfile {
    id: string,
    user_id: string,
    username: string,
    avatar: string
}

export interface PTBalance {
    id: string,
    user_id: string,
    balance: string
}