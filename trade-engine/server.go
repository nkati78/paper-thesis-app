package main

import (
	"log"
	"net/http"
	"os"
	"os/signal"

	"github.com/gin-gonic/gin"
)

func StartServer() error {
	// Start the server
	router := gin.Default()
	router.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	router.POST("/orders", func(c *gin.Context) {
		c.JSON(http.StatusCreated, gin.H{
			"message": "order created",
		})
	})

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
