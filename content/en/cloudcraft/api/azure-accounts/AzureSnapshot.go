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

	snapshot, _, err := client.Azure.Snapshot(context.Background(), "fe3e5b29-a0e8-41ca-91e2-02a0441b1d33", "centralus", "png", &cloudcraft.SnapshotParams{
    Width:  1920,
    Height: 1080,
  })
	if err != nil {
		log.Fatal(err)
	}
}
