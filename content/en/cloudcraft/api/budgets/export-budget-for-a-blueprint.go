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
		log.Fatalf("usage: %s <blueprint-id>", os.Args[0])
	}

	// Create new Config to initialize a Client.
	cfg := cloudcraft.NewConfig(key)

	// Create a new Client instance with the given Config.
	client, err := cloudcraft.NewClient(cfg)
	if err != nil {
		log.Fatal(err)
	}

	// Export the blueprint's budget with the given blueprint-id coming from a
	// command line argument.
	budget, _, err := client.Blueprint.ExportBudget(
		context.Background(),
		os.Args[1],
		"csv",
		&cloudcraft.BudgetExportParams{
			Currency: "USD",
			Period:   "month",
			Rate:     "monthly",
		},
	)
	if err != nil {
		log.Fatal(err)
	}

	// Save the budget to a file.
	if err := os.WriteFile("blueprint.csv", budget, 0o600); err != nil {
		log.Fatal(err)
	}
}
