package server

import (
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
)

const viteDefaultPort = "5173"

// proxyHandler reverse-proxies requests to the Vite dev server.
func (s *Server) proxyHandler(w http.ResponseWriter, r *http.Request) {
	vitePort := os.Getenv("VITE_PORT")
	if vitePort == "" {
		vitePort = viteDefaultPort
	}

	target := &url.URL{
		Scheme: "http",
		Host:   "localhost:" + vitePort,
	}

	proxy := httputil.NewSingleHostReverseProxy(target)

	// Preserve the original Host header for Vite
	proxy.ServeHTTP(w, r)
}
