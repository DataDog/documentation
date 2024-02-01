package main

import (
	"context"
	"log"
	"os"

	"github.com/DataDog/cloudcraft-go"
)

func main() {
	key, ok := os.LookupEnv("CLOUDCRAFT_API_KEY")
	if !ok {
		log.Fatal("missing env var: CLOUDCRAFT_API_KEY")
	}

	// Create new Config to be initialize a Client.
	cfg := cloudcraft.NewConfig(key)

	// Create a new Client instance with the given Config.
	client, err := cloudcraft.NewClient(cfg)
	if err != nil {
		log.Fatal(err)
	}

	account, _, err := client.Azure.Delete(
		context.Background(),
		"4349ccdb-a2fd-4a89-a07b-48e3e330670b"
	)
	if err != nil {
		log.Fatal(err)
	}
}
