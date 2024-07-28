package main

import (
	"errors"
	"fmt"
	"github.com/golang-migrate/migrate/v4"
	"github.com/paper-thesis/trade-engine/db"
	"github.com/paper-thesis/trade-engine/orders"
	"github.com/paper-thesis/trade-engine/orders/data"
	"github.com/paper-thesis/trade-engine/users"
	userData "github.com/paper-thesis/trade-engine/users/data"
	"log"
	"net/http"
	"os"

	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
)

func run() int {
	dsn := os.Getenv("DATABASE_URL")

	if dsn == "" {
		dsn = "postgres://postgres:@localhost:5432/test?sslmode=disable"
	}

	database := db.NewDatabaseConnection(dsn)

	m, err := migrate.New(
		"file://db/migrations",
		dsn)
	if err != nil {
		log.Fatal(err)
	}

	if err := m.Up(); err != nil {
		fmt.Print(err)
	}

	orderProvider := data.NewDataProvider(database)
	userProvider := userData.NewDataProvider(database)

	orderService := orders.NewOrderService(orderProvider)
	userService := users.NewUserService(userProvider)

	/*
		go func() {
			StartDataFeed()
		}()
	*/

	if err := StartServer(orderService, userService); err != nil {
		if errors.Is(err, http.ErrServerClosed) {
			log.Println("Server closed under request")
			return 0
		} else {
			return 1
		}
	}

	log.Println("Server exiting")

	return 0
}

func main() {
	os.Exit(run())
}
