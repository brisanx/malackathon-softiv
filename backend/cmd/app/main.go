package main

import (
	"backend/internal/api/server"
	"backend/internal/utils/env"
	"log"

	"github.com/joho/godotenv"
	_ "github.com/godror/godror"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	listenAddr := env.GetEnvString("PORT", ":8080")
	server := server.NewServer(listenAddr)

	log.Printf("Starting server on port: %s", listenAddr)
	log.Fatal(server.Start())
	log.Printf("Server is running on port: %s", listenAddr)
}
