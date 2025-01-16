CREATE table positions
(
    id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id    UUID         NOT NULL,
    symbol     VARCHAR(255) NOT NULL,
    quantity   int          NOT NULL,
    direction VARCHAR(255) NOT NULL,
    average_price float NOT NULL,
    profit_loss float NOT NULL,
    status    VARCHAR(255) NOT NULL,
    created_at TIMESTAMP    DEFAULT now(),
    updated_at TIMESTAMP    DEFAULT now(),
    order_id UUID NOT NULL
);

CREATE INDEX positions_user_id_index ON positions (user_id);
CREATE INDEX positions_symbol_index ON positions (symbol);
CREATE INDEX positions_order_id_index ON positions (order_id);

CREATE TABLE balances
(
    id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id    UUID         NOT NULL,
    balance     VARCHAR(255) NOT NULL,
    created_at TIMESTAMP    DEFAULT now(),
    updated_at TIMESTAMP    DEFAULT now()
);

CREATE INDEX balances_user_id_index ON balances (user_id);
