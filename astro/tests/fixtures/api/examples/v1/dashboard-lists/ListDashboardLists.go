// NOTE: Frozen test fixture from tests/fixtures/api/examples/, not live SDK output.
// Get all dashboard lists returns "OK" response

package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"

	"github.com/DataDog/datadog-api-client-go/v2/api/datadog"
	"github.com/DataDog/datadog-api-client-go/v2/api/datadogV1"
)

func main() {
	ctx := datadog.NewDefaultContext(context.Background())
	configuration := datadog.NewConfiguration()
	apiClient := datadog.NewAPIClient(configuration)
	api := datadogV1.NewDashboardListsApi(apiClient)
	resp, r, err := api.ListDashboardLists(ctx)

	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `DashboardListsApi.ListDashboardLists`: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}

	responseContent, _ := json.MarshalIndent(resp, "", "  ")
	fmt.Fprintf(os.Stdout, "Response from `DashboardListsApi.ListDashboardLists`:\n%s\n", responseContent)
}
