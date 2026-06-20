package main

import (
	"log"
	"os"

	"github.com/fx/slop-sim/internal/server"
	"github.com/fx/slop-sim/web"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	env := os.Getenv("APP_ENV")
	devMode := env == "dev"

	var srv *server.Server
	if devMode {
		srv = server.NewWithoutFS(port, true)
	} else {
		srv = server.New(port, web.DistFS, false)
	}

	log.Printf("starting server on :%s (mode: %s)", port, modeLabel(devMode))
	if err := srv.Serve(); err != nil {
		log.Fatal(err)
	}
}

func modeLabel(dev bool) string {
	if dev {
		return "dev"
	}
	return "prod"
}
