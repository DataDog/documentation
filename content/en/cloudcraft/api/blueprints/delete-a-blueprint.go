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

	// Show usage if the number of command line arguments is not correct.
	if len(os.Args) != 2 {
		log.Fatalf("usage: %s <blueprint-id>", os.Args[0])
	}

	// Create new Config to initialize a Client.
	cfg := cloudcraft.NewConfig(key)

	// Create a new Client instance with the given Config.
	client, err := cloudcraft.NewClient(cfg)
	if err != nil {
		log.Fatal(err)
	}

	// Delete the blueprint with the ID taken from a command line argument.
	_, err = client.Blueprint.Delete(
		context.Background(),
		os.Args[1],
	)
	if err != nil {
		log.Fatal(err)
	}
}
