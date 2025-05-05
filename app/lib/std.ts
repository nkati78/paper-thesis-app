import settings from "./settings";

export function classes (classes: string[]) {

    return classes.join(',').replace(',', ' ');

}

export async function get_symbol (symbol: string) {

    return await fetch(`${settings.local_api.symbol}?symbol=${symbol}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    }).then((res) => res.json());

}

export async function watchlist_add (symbol: string, user_id: string) {

    return await fetch(`${settings.local_api.watchlist}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
        body: JSON.stringify({
            symbol,
            user_id,
            type: 'add'
        })
    }).then((res) => res.json());

}

export async function watchlist_remove (symbol: string, user_id: string) {

    return await fetch(`${settings.local_api.watchlist}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
        body: JSON.stringify({
            symbol,
            user_id,
            type: 'remove'
        })
    }).then((res) => res.json());

}

export async function get_positions () {

    return await fetch(`${settings.local_api.positions}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store'
    }).then((res) => res.json());

}

export async function get_balance () {

    return await fetch(`${settings.local_api.positions}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store'
    }).then((res) => res.json());

}