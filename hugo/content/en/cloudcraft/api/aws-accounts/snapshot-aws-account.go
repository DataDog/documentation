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
		log.Fatalf("usage: %s <account-id>", os.Args[0])
	}

	// Create new Config to initialize a Client.
	cfg := cloudcraft.NewConfig(key)

	// Create a new Client instance with the given Config.
	client, err := cloudcraft.NewClient(cfg)
	if err != nil {
		log.Fatal(err)
	}

	// Create a new snapshot of the us-east-1 region with the given account-id
	// coming from a command line argument.
	snapshot, _, err := client.AWS.Snapshot(
		context.Background(),
		os.Args[1],
		"us-east-1",
		"png",
		&cloudcraft.SnapshotParams{
			Width:  1920,
			Height: 1080,
		},
	)
	if err != nil {
		log.Fatal(err)
	}

	// Save the snapshot to a file.
	if err := os.WriteFile("snapshot.png", snapshot, 0o600); err != nil {
		log.Fatal(err)
	}
}
