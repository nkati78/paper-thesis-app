CREATE table orders
(
    id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    price      int          NOT NULL,
    quantity   int          NOT NULL,
    side       VARCHAR(255) NOT NULL,
    type       VARCHAR(255) NOT NULL,
    symbol     VARCHAR(255) NOT NULL,
    user_id    UUID         NOT NULL,
    status     VARCHAR(255) NOT NULL,

    created_at TIMESTAMP        DEFAULT now(),
    updated_at TIMESTAMP        DEFAULT now(),

    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX orders_user_id_index ON orders (user_id);
CREATE INDEX orders_symbol_index ON orders (symbol);