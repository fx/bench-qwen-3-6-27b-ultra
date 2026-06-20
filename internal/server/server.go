package server

import (
	"embed"
	"fmt"
	"log"
	"net"
	"net/http"
	"strings"
	"time"
)

// Server handles HTTP requests for the Slop Simulator application.
type Server struct {
	port    string
	fs      *embed.FS
	devMode bool
	srv     *http.Server
}

// New creates a new Server instance.
func New(port string, embeddedFS embed.FS, devMode bool) *Server {
	return &Server{
		port:    port,
		fs:      &embeddedFS,
		devMode: devMode,
	}
}

// NewWithoutFS creates a Server without an embedded filesystem (for dev mode or testing).
func NewWithoutFS(port string, devMode bool) *Server {
	return &Server{
		port:    port,
		fs:      nil,
		devMode: devMode,
	}
}

// Serve starts the HTTP server.
func (s *Server) Serve() error {
	lis, err := net.Listen("tcp", ":"+s.port)
	if err != nil {
		return err
	}
	return s.ServeListener(lis)
}

// ServeListener starts the HTTP server on the given listener.
// This is useful for testing.
func (s *Server) ServeListener(lis net.Listener) error {
	mux := s.setupRoutes()

	s.srv = &http.Server{
		Handler:      mux,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	return s.srv.Serve(lis)
}

// Close gracefully shuts down the server.
func (s *Server) Close() error {
	if s.srv != nil {
		return s.srv.Close()
	}
	return nil
}

func (s *Server) setupRoutes() http.Handler {
	mux := http.NewServeMux()

	// Health check
	mux.HandleFunc("GET /healthz", s.healthHandler)

	// API reservation (future use)
	mux.HandleFunc("/api/", s.apiReservedHandler)

	// Catch-all: dev proxy or prod SPA
	if s.devMode {
		mux.HandleFunc("/", s.proxyHandler)
	} else {
		mux.HandleFunc("/", s.spaHandler)
	}

	return mux
}

func (s *Server) healthHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, "ok")
}

func (s *Server) apiReservedHandler(w http.ResponseWriter, r *http.Request) {
	// Strip /api/ prefix for logging
	path := strings.TrimPrefix(r.URL.Path, "/api/")
	log.Printf("API endpoint not implemented: %s %s", r.Method, path)
	http.Error(w, "not implemented", http.StatusNotImplemented)
}

// hasFS checks if an embedded filesystem was provided.
func (s *Server) hasFS() bool {
	return s.fs != nil
}
