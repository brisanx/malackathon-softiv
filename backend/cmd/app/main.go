package main

import (
	"backend/internal/api/server"
	"backend/internal/utils/env"
	"log"
	_ "github.com/godror/godror"
)

func main() {
	listenAddr := env.GetEnvString("PORT", ":8081")
	server := server.NewServer(listenAddr)

	log.Printf("Starting server on port: %s", listenAddr)
	log.Fatal(server.Start())
	log.Printf("Server is running on port: %s", listenAddr)
}
