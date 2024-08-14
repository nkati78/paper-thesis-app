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
    email?: string,
    password?: string,
    type: string,
    redirect?: boolean
}