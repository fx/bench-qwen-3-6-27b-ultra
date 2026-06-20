package server

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestHealthHandler(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/healthz", nil)
	w := httptest.NewRecorder()

	s := NewWithoutFS("8080", false)
	s.setupRoutes().ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("expected status 200, got %d", w.Code)
	}
	if w.Body.String() != "ok" {
		t.Errorf("expected body 'ok', got %q", w.Body.String())
	}
}

func TestAPIReserved(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/api/test", nil)
	w := httptest.NewRecorder()

	s := NewWithoutFS("8080", false)
	s.setupRoutes().ServeHTTP(w, req)

	if w.Code != http.StatusNotImplemented {
		t.Errorf("expected status 501, got %d", w.Code)
	}
}

func TestNewServer(t *testing.T) {
	s := NewWithoutFS("3000", true)
	if s.port != "3000" {
		t.Errorf("expected port 3000, got %s", s.port)
	}
	if !s.devMode {
		t.Error("expected devMode to be true")
	}
}

func TestServerClose(t *testing.T) {
	s := NewWithoutFS("8080", false)
	if err := s.Close(); err != nil {
		t.Errorf("expected no error closing unset server, got %v", err)
	}
}
