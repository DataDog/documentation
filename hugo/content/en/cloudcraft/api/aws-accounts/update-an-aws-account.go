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
	if len(os.Args) != 4 {
		log.Fatalf("usage: %s <account-id> <account-name> <role-arn>", os.Args[0])
	}

	// Create new Config to initialize a Client.
	cfg := cloudcraft.NewConfig(key)

	// Create a new Client instance with the given Config.
	client, err := cloudcraft.NewClient(cfg)
	if err != nil {
		log.Fatal(err)
	}

	// Update the AWS Account with the ID, name and role ARN coming from command
	// line arguments.
	_, err = client.AWS.Update(
		context.Background(),
		&cloudcraft.AWSAccount{
			ID:      os.Args[1],
			Name:    os.Args[2],
			RoleARN: os.Args[3],
		})
	if err != nil {
		log.Fatal(err)
	}
}
