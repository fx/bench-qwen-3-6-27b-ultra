package server

import (
	"errors"
	"io/fs"
	"net/http"
	"strings"
)

// spaHandler serves the SPA in production mode.
// For routes that accept text/html, it serves index.html.
// For static assets, it serves from the embedded filesystem.
func (s *Server) spaHandler(w http.ResponseWriter, r *http.Request) {
	// Check if the request wants HTML (SPA fallback)
	accept := r.Header.Get("Accept")
	wantsHTML := strings.Contains(accept, "text/html") || accept == ""

	path := r.URL.Path

	// Serve index.html for SPA routes
	if wantsHTML && !isAssetPath(path) {
		s.serveIndexHTML(w, r)
		return
	}

	// Try to serve static asset
	if err := s.serveAsset(w, r, path); err != nil {
		if errors.Is(err, fs.ErrNotExist) {
			http.NotFound(w, r)
			return
		}
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}
}

// serveIndexHTML serves the embedded index.html.
func (s *Server) serveIndexHTML(w http.ResponseWriter, _ *http.Request) {
	if !s.hasFS() {
		http.NotFound(w, nil)
		return
	}

	// Open index.html from embedded FS
	distFS, err := fs.Sub(s.fs, "dist")
	if err != nil {
		http.Error(w, "embedded fs error", http.StatusInternalServerError)
		return
	}

	data, err := fs.ReadFile(distFS, "index.html")
	if err != nil {
		http.NotFound(w, nil)
		return
	}

	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Header().Set("Cache-Control", "no-cache")
	w.WriteHeader(http.StatusOK)
	_, _ = w.Write(data)
}

// serveAsset serves a static file from the embedded FS.
func (s *Server) serveAsset(w http.ResponseWriter, r *http.Request, path string) error {
	if !s.hasFS() {
		return fs.ErrNotExist
	}

	distFS, err := fs.Sub(s.fs, "dist")
	if err != nil {
		return err
	}

	// Strip leading / to get path relative to dist/
	cleanPath := strings.TrimPrefix(path, "/")

	data, err := fs.ReadFile(distFS, cleanPath)
	if err != nil {
		return err
	}

	// Set cache headers for assets
	setAssetHeaders(w, cleanPath)

	_, _ = w.Write(data)
	return nil
}

// setAssetHeaders sets appropriate cache and content-type headers for static assets.
func setAssetHeaders(w http.ResponseWriter, path string) {
	w.Header().Set("Cache-Control", "public, max-age=31536000, immutable")
	w.Header().Set("Content-Type", contentType(path))
}

// contentType returns the MIME type based on file extension.
func contentType(path string) string {
	switch {
	case strings.HasSuffix(path, ".js"):
		return "application/javascript"
	case strings.HasSuffix(path, ".css"):
		return "text/css"
	case strings.HasSuffix(path, ".html"):
		return "text/html"
	case strings.HasSuffix(path, ".json"):
		return "application/json"
	case strings.HasSuffix(path, ".png"):
		return "image/png"
	case strings.HasSuffix(path, ".jpg") || strings.HasSuffix(path, ".jpeg"):
		return "image/jpeg"
	case strings.HasSuffix(path, ".svg"):
		return "image/svg+xml"
	case strings.HasSuffix(path, ".woff2"):
		return "font/woff2"
	case strings.HasSuffix(path, ".ico"):
		return "image/x-icon"
	default:
		return "application/octet-stream"
	}
}

// isAssetPath checks if a path looks like a static asset.
func isAssetPath(path string) bool {
	return len(path) > 1 && (path[0] == '/' && strings.Contains(path, "."))
}
