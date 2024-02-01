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

	// List all blueprints in an account.
	account, _, err := client.AWS.Create(
		context.Background(),
		&cloudcraft.AWSAccount{
			Name:       "New AWS",
			RoleARN:    "",
			ExternalID: "8a8a745a-d01f-4541-8ab0-e3558e7c6b1c",
	})
	if err != nil {
		log.Fatal(err)
	}
}
