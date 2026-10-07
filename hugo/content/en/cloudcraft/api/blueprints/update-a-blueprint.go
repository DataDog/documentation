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
	if len(os.Args) != 3 {
		log.Fatalf("usage: %s <blueprint-id> <blueprint-name>", os.Args[0])
	}

	// Create new Config to initialize a Client.
	cfg := cloudcraft.NewConfig(key)

	// Create a new Client instance with the given Config.
	client, err := cloudcraft.NewClient(cfg)
	if err != nil {
		log.Fatal(err)
	}

	// Update the blueprint with the ID and name coming from command line
	// arguments. Add a new EC2 node to the blueprint.
	_, err = client.Blueprint.Update(
		context.Background(),
		&cloudcraft.Blueprint{
			ID:   os.Args[1],
			Name: os.Args[2],
			Data: &cloudcraft.BlueprintData{
				Name: os.Args[2],
				Nodes: []map[string]any{
					{
						"id":           "98172baa-a059-4b04-832d-8a7f5d14b595",
						"type":         "ec2",
						"region":       "us-east-1",
						"platform":     "linux",
						"instanceType": "m5",
						"instanceSize": "large",
					},
				},
			},
		},
		"",
	)
	if err != nil {
		log.Fatal(err)
	}
}
