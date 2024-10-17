package server

import (
	"backend/internal/api/handlers"
	"net/http"
)

type Server struct {
	Addr string
}

func NewServer(addr string) *Server {
	return &Server{
		Addr: addr,
	}
}

func (s *Server) Start() error {
	mux := http.NewServeMux()

	mux.HandleFunc("/api/v1/embalses/{latitud}/{longitud}/{radio}/", handlers.HandlerGetEmbalses)

	server := http.Server{
		Addr:    s.Addr,
		Handler: mux,
	}
	return server.ListenAndServe()
}
