const settings = {
    pt_api: {
        base_url: 'http://app:8080/',
        register: `http://app:8080/register`,
        login: `http://app:8080/login`,
        balance: `http://app:8080/users/balance`,
        me: `http://app:8080/users/me`,
        symbol: `http://app:8080/market-data`,
        symbols: `http://app:8080/market-data/symbols`,
        orders: `http://app:8080/orders`,
        positions: `http://app:8080/positions`,
        watchlist: `http://app:8080/users/watchlist`,
    },
    local_api: {
        // positions: 'http://localhost:3000/api/positions',
        symbol: '/api/symbol',
        orders: '/api/orders',
        watchlist: '/api/watchlist',
        positions: '/api/positions',
        balance: '/api/balance',
    }
};

export default settings;