package main

import "testing"

func TestModeLabel(t *testing.T) {
	tests := []struct {
		dev      bool
		expected string
	}{
		{true, "dev"},
		{false, "prod"},
	}

	for _, tt := range tests {
		result := modeLabel(tt.dev)
		if result != tt.expected {
			t.Errorf("modeLabel(%v) = %q, want %q", tt.dev, result, tt.expected)
		}
	}
}
