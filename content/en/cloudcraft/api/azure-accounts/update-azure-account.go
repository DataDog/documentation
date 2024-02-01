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

	account, _, err := client.Azure.Update(
		context.Background(),
		&cloudcraft.AzureAccount{
			ID:             "4349ccdb-a2fd-4a89-a07b-48e3e330670b",
			Name:           "Azure Update",
			ApplicationID:  "3a64bc23-5dd6-4624-8ce8-fe3e61b41579",
			DirectoryID:    "5d7ef62e-c8bb-41fc-9a55-9a2c30701027",
			SubscriptionID: "db0297eb-ad6c-4e63-86b0-c1acb6a16570",
			ClientSecret:   "",
		}
	)
	if err != nil {
		log.Fatal(err)
	}
}
