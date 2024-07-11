package main

import (
	"log"
	"net/http"
	"os"
)

func run() int {
	go func() {
		StartDataFeed()
	}()

	if err := StartServer(); err != nil {
		if err == http.ErrServerClosed {
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
