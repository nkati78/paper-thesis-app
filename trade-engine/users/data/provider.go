package data

import "context"

type UserProvider interface {
	GetUser(ctx context.Context, userID string) (*UserDB, error)
	CreateUser(ctx context.Context, user UserDB) (*UserDB, error)
	UpdateUser(ctx context.Context, user UserDB) (*UserDB, error)
	GetUserByUsername(ctx context.Context, username string) (*UserDB, error)
	GetUserByEmail(ctx context.Context, email string) (*UserDB, error)
}
