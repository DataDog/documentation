package example

import (
	"context"
	"os"

	. "github.com/DataDog/datadog-api-client-go/api/v1/datadog"
)

ctx := context.WithValue(
	context.Background(),
	ContextAPIKeys,
	map[string]APIKey{
		"apiKeyAuth": {
			Key: os.Getenv("DD_CLIENT_API_KEY"),
		},
		"appKeyAuth": {
			Key: os.Getenv("DD_CLIENT_APP_KEY"),
		},
	},
)
config := NewConfiguration()
api := NewAPIClient(config)

model, httpresp, err := api.DowntimesApi.updateDowntime(ctx).Execute()
if err != nil {
	log.Fatalf("API Error %s: %v", err.(GenericOpenAPIError).Body(), err)
}
log.Printf("Response %v", model)
