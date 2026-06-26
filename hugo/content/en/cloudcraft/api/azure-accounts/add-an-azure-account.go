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
	if len(os.Args) != 6 {
		log.Fatalf("usage: %s <account-name> <app-id> <dir-id> <sub-id> <secret>", os.Args[0])
	}

	// Create new Config to initialize a Client.
	cfg := cloudcraft.NewConfig(key)

	// Create a new Client instance with the given Config.
	client, err := cloudcraft.NewClient(cfg)
	if err != nil {
		log.Fatal(err)
	}

	// Create a new Azure Account with the details coming from command line
	// arguments.
	account, _, err := client.Azure.Create(
		context.Background(),
		&cloudcraft.AzureAccount{
			Name:           os.Args[1],
			ApplicationID:  os.Args[2],
			DirectoryID:    os.Args[3],
			SubscriptionID: os.Args[4],
			ClientSecret:   os.Args[5],
		})
	if err != nil {
		log.Fatal(err)
	}

	// Print the account ID.
	log.Println(account.ID)
}
