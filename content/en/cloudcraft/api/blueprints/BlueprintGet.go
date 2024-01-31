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

	// get blueprint in an account.
  blueprint, _, err := client.Blueprint.Get(context.Background(), "0f1a4e20-a887-4467-a37b-1bc7a3deb9a9")
	if err != nil {
		log.Fatal(err)
	}

	// Print the name of the blueprint.
  log.Println(blueprint.Name)
}
