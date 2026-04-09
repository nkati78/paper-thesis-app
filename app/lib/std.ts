import settings from "./settings";

export function classes (classes: string[]) {

    return classes.join(',').replace(',', ' ');

}

export function normalizeTimestamp(timestamp: string): string {

    const match = timestamp.match(/^(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2})(?:\.(\d+))?(?:\s([+-]\d{4})(?:\sUTC)?)?$/);

    if (!match) {

        console.error("Timestamp does not match expected format:", timestamp);

        return '';

    }

    const [_, date, time, fractionalSeconds = '000', timezone] = match;

    const milliseconds = fractionalSeconds.substring(0, 3);

    const formattedTimezone = timezone
        ? timezone.slice(0, 3) + ':' + timezone.slice(3)
        : 'Z';

    const isoTimestamp = `${date}T${time}.${milliseconds}${formattedTimezone}`;

    return isoTimestamp;

}

export function subtract_days(time: string | number, days: number): string {

    const date = new Date(time);

    if (isNaN(date.getTime())) {

        console.error("Invalid date provided to subtract_days:", time);

        return '';

    }

    date.setUTCDate(date.getUTCDate() - days);

    return date.toISOString().split('T')[0];

}


//Client side API calls
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