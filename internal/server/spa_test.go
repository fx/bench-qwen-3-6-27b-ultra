package server

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestIsAssetPath(t *testing.T) {
	tests := []struct {
		path     string
		expected bool
	}{
		{"/assets/app.js", true},
		{"/style.css", true},
		{"/logo.png", true},
		{"/", false},
		{"/demo", false},
		{"/about", false},
		{"", false},
		{"/path/to/file.json", true},
	}

	for _, tt := range tests {
		result := isAssetPath(tt.path)
		if result != tt.expected {
			t.Errorf("isAssetPath(%q) = %v, want %v", tt.path, result, tt.expected)
		}
	}
}

func TestContentType(t *testing.T) {
	tests := []struct {
		path     string
		expected string
	}{
		{"app.js", "application/javascript"},
		{"style.css", "text/css"},
		{"page.html", "text/html"},
		{"data.json", "application/json"},
		{"image.png", "image/png"},
		{"image.jpg", "image/jpeg"},
		{"image.jpeg", "image/jpeg"},
		{"icon.svg", "image/svg+xml"},
		{"font.woff2", "font/woff2"},
		{"favicon.ico", "image/x-icon"},
		{"unknown.xyz", "application/octet-stream"},
	}

	for _, tt := range tests {
		result := contentType(tt.path)
		if result != tt.expected {
			t.Errorf("contentType(%q) = %q, want %q", tt.path, result, tt.expected)
		}
	}
}

func TestSPAHandlerNoFS(t *testing.T) {
	// Server with no embedded FS should return 404 for SPA routes
	s := NewWithoutFS("8080", false)

	req := httptest.NewRequest(http.MethodGet, "/demo", nil)
	req.Header.Set("Accept", "text/html")
	w := httptest.NewRecorder()

	s.setupRoutes().ServeHTTP(w, req)

	if w.Code != http.StatusNotFound {
		t.Errorf("expected 404 with no FS, got %d", w.Code)
	}
}

func TestSPAHandlerAssetNotFound(t *testing.T) {
	s := NewWithoutFS("8080", false)

	req := httptest.NewRequest(http.MethodGet, "/assets/missing.js", nil)
	w := httptest.NewRecorder()

	s.setupRoutes().ServeHTTP(w, req)

	if w.Code != http.StatusNotFound {
		t.Errorf("expected 404 for missing asset, got %d", w.Code)
	}
}

func TestHasFS(t *testing.T) {
	s := NewWithoutFS("8080", false)
	if s.hasFS() {
		t.Error("expected hasFS to be false when no FS provided")
	}
}
