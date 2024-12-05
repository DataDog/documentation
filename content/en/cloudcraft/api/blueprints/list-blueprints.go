package main

import (
	"context"
	"log"
	"os"

	"github.com/DataDog/cloudcraft-go"
)

func main() {
	// Get the API key from the environment.
	key, ok := os.LookupEnv("CLOUDCRAFT_API_KEY")
	if !ok {
		log.Fatal("missing env var: CLOUDCRAFT_API_KEY")
	}

	// Create new Config to initialize a Client.
	cfg := cloudcraft.NewConfig(key)

	// Create a new Client instance with the given Config.
	client, err := cloudcraft.NewClient(cfg)
	if err != nil {
		log.Fatal(err)
	}

	// List all blueprints in the Cloudcraft account.
	blueprints, _, err := client.Blueprint.List(context.Background())
	if err != nil {
		log.Fatal(err)
	}

	// Print the name of each blueprint.
	for _, blueprint := range blueprints {
		log.Println(blueprint.Name)
	}
}
