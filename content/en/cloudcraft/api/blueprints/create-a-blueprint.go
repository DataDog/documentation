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

	// Check if the command line arguments are correct.
	if len(os.Args) != 2 {
		log.Fatalf("usage: %s <blueprint-name>", os.Args[0])
	}

	// Create new Config to initialize a Client.
	cfg := cloudcraft.NewConfig(key)

	// Create a new Client instance with the given Config.
	client, err := cloudcraft.NewClient(cfg)
	if err != nil {
		log.Fatal(err)
	}

	// Create a simple blueprint with the name coming from a command line argument.
	blueprint, _, err := client.Blueprint.Create(
		context.Background(),
		&cloudcraft.Blueprint{
			Data: &cloudcraft.BlueprintData{
				Name: os.Args[1],
			},
		},
	)
	if err != nil {
		log.Fatal(err)
	}

	// Print the blueprint ID.
	log.Println(blueprint.ID)
}
