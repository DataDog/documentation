package main

import (
	"context"
	"encoding/json"
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

	// Get the IAM parameters required for registering a new IAM Role in AWS for
	// use with Cloudcraft.
	params, _, err := client.AWS.IAMParameters(context.Background())
	if err != nil {
		log.Fatal(err)
	}

	// Pretty print all IAM parameters returned by the API.
	pretty, _ := json.MarshalIndent(params, "", "  ")

	log.Println(string(pretty))
}
