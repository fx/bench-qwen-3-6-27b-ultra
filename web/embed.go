package web

import "embed"

// DistFS embeds the built frontend dist directory.
//
//go:embed all:dist
var DistFS embed.FS
