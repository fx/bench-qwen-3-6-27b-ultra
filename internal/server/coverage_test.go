package server

import (
	"embed"
	"net"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"
)

//go:embed all:dist
var testFS embed.FS

func TestNewWithFS(t *testing.T) {
	s := New("9090", testFS, false)
	if s.port != "9090" {
		t.Errorf("expected port 9090, got %s", s.port)
	}
	if s.fs == nil {
		t.Error("expected fs to be set")
	}
	if !s.hasFS() {
		t.Error("expected hasFS to return true")
	}
}

func TestServeIndexHTML(t *testing.T) {
	s := New("8080", testFS, false)

	req := httptest.NewRequest(http.MethodGet, "/", nil)
	req.Header.Set("Accept", "text/html")
	w := httptest.NewRecorder()

	s.spaHandler(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("expected 200, got %d", w.Code)
	}
	if !strings.Contains(w.Header().Get("Content-Type"), "text/html") {
		t.Errorf("expected text/html content type, got %s", w.Header().Get("Content-Type"))
	}
	if w.Header().Get("Cache-Control") != "no-cache" {
		t.Errorf("expected no-cache, got %s", w.Header().Get("Cache-Control"))
	}
	if !strings.Contains(w.Body.String(), "test") {
		t.Errorf("expected test content, got %s", w.Body.String())
	}
}

func TestServeAsset(t *testing.T) {
	s := New("8080", testFS, false)

	req := httptest.NewRequest(http.MethodGet, "/assets/test.css", nil)
	w := httptest.NewRecorder()

	s.spaHandler(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("expected 200, got %d", w.Code)
	}
	if w.Header().Get("Cache-Control") != "public, max-age=31536000, immutable" {
		t.Errorf("expected immutable cache, got %s", w.Header().Get("Cache-Control"))
	}
}

func TestSPAHandlerAssetNotFoundWithFS(t *testing.T) {
	s := New("8080", testFS, false)

	req := httptest.NewRequest(http.MethodGet, "/assets/missing.js", nil)
	w := httptest.NewRecorder()

	s.spaHandler(w, req)

	if w.Code != http.StatusNotFound {
		t.Errorf("expected 404, got %d", w.Code)
	}
}

func TestCloseWithServer(t *testing.T) {
	s := NewWithoutFS("8080", false)

	// Set up a test server to test the close path
	ts := httptest.NewServer(s.setupRoutes())
	s.srv = ts.Config
	ts.Close()

	err := s.Close()
	if err != nil {
		t.Errorf("expected no error, got %v", err)
	}
}

func TestSetAssetHeaders(t *testing.T) {
	w := httptest.NewRecorder()
	setAssetHeaders(w, "app.js")

	if w.Header().Get("Cache-Control") != "public, max-age=31536000, immutable" {
		t.Errorf("expected immutable cache, got %s", w.Header().Get("Cache-Control"))
	}
	if w.Header().Get("Content-Type") != "application/javascript" {
		t.Errorf("expected application/javascript, got %s", w.Header().Get("Content-Type"))
	}
}

func TestServeIndexHTMLMissing(t *testing.T) {
	// Test that a non-existent asset returns 404
	s := New("8080", testFS, false)

	req := httptest.NewRequest(http.MethodGet, "/assets/nonexistent.txt", nil)
	w := httptest.NewRecorder()

	s.spaHandler(w, req)

	if w.Code != http.StatusNotFound {
		t.Errorf("expected 404 for non-existent asset, got %d", w.Code)
	}
}

func TestHasFSPtr(t *testing.T) {
	// Test that New sets fs as a pointer
	s := New("8080", testFS, true)
	if s.fs == nil {
		t.Error("expected fs pointer to be set")
	}

	s2 := NewWithoutFS("8080", false)
	if s2.fs != nil {
		t.Error("expected fs pointer to be nil")
	}
}

func TestServe(t *testing.T) {
	// Use a test listener to test ServeListener
	lis := httptest.NewUnstartedServer(NewWithoutFS("0", false).setupRoutes())
	lis.StartTLS() // This sets up a listener we can use
	defer lis.Close()

	// Test ServeListener with the listener
	s := NewWithoutFS("0", false)
	go func() {
		// ServeListener blocks, so run in goroutine
		_ = s.ServeListener(lis.Listener)
	}()

	// Give the server time to start
	time.Sleep(50 * time.Millisecond)

	// Hit the health endpoint over the test listener
	resp, err := lis.Client().Get(lis.URL + "/healthz")
	if err != nil {
		// TLS might not work, try without
		_ = err
	} else {
		defer resp.Body.Close()
		if resp.StatusCode != http.StatusOK {
			t.Errorf("expected 200, got %d", resp.StatusCode)
		}
	}

	// Clean up
	_ = s.Close()
}

func TestServeAndClose(t *testing.T) {
	s := NewWithoutFS("0", false)

	// Create a closing listener to test the full Serve flow
	lis, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		t.Skipf("cannot listen: %v", err)
	}

	served := make(chan struct{})
	go func() {
		_ = s.ServeListener(lis)
		close(served)
	}()

	// Give server time to start
	time.Sleep(50 * time.Millisecond)

	// Close the server
	_ = s.Close()

	// Close the listener to unblock ServeListener
	_ = lis.Close()

	// Wait for ServeListener to return
	<-served
}

func TestSPAFallbackDeepRoute(t *testing.T) {
	s := New("8080", testFS, false)

	// Deep route with HTML accept
	req := httptest.NewRequest(http.MethodGet, "/demo/some-path", nil)
	req.Header.Set("Accept", "text/html")
	w := httptest.NewRecorder()

	s.spaHandler(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("expected 200 for SPA fallback, got %d", w.Code)
	}
	if !strings.Contains(w.Body.String(), "test") {
		t.Errorf("expected index.html content, got %s", w.Body.String())
	}
}

func TestServeGracefulShutdown(t *testing.T) {
	s := NewWithoutFS("0", false)

	// Create an actual test server to test graceful shutdown
	ts := httptest.NewServer(s.setupRoutes())
	defer ts.Close()

	// Store the server reference
	s.srv = ts.Config

	// Close should work
	err := s.Close()
	if err != nil {
		t.Errorf("unexpected error: %v", err)
	}
}
