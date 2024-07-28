package main

import (
	"github.com/google/uuid"
	"github.com/paper-thesis/trade-engine/handlers"
	"github.com/paper-thesis/trade-engine/orders"
	"github.com/paper-thesis/trade-engine/security"
	"github.com/paper-thesis/trade-engine/users"
	"log"
	"net/http"
	"os"
	"os/signal"

	"github.com/gin-gonic/gin"
)

func StartServer(orderService orders.OrderService, userService users.UserService) error {
	auth := security.NewAuth([]byte("1337-secret"))

	orderHandler := handlers.NewOrderHandler(orderService)
	userHandler := handlers.NewUserHandler(userService, auth)

	// Start the server
	router := gin.Default()
	router.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	router.Use(RequestIdMiddleware())

	ordersRouter := router.Group("/orders", auth.TokenMiddleware())
	ordersRouter.POST("", orderHandler.HandleCreateOrder)
	ordersRouter.GET("", orderHandler.HandleGetOrders)

	router.POST("/register", handlers.ToHandler(userHandler.CreateUser))
	router.POST("/login", handlers.ToHandler(userHandler.Login))

	server := &http.Server{
		Addr:    ":8080",
		Handler: router,
	}

	quit := make(chan os.Signal)
	signal.Notify(quit, os.Interrupt)

	go func() {
		<-quit
		log.Println("receive interrupt signal")
		if err := server.Close(); err != nil {
			log.Fatal("Server Close:", err)
		}
	}()

	return server.ListenAndServe()
}

func RequestIdMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("X-Request-Id", uuid.New().String())
		c.Next()
	}
}
