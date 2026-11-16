// NOTE: Frozen test fixture from tests/fixtures/api/examples/, not live SDK output.
// Create an incident returns "CREATED" response

package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"

	"github.com/DataDog/datadog-api-client-go/v2/api/datadog"
	"github.com/DataDog/datadog-api-client-go/v2/api/datadogV2"
)

func main() {
	// there is a valid "user" in the system
	UserDataID := os.Getenv("USER_DATA_ID")

	body := datadogV2.IncidentCreateRequest{
		Data: datadogV2.IncidentCreateData{
			Type: datadogV2.INCIDENTTYPE_INCIDENTS,
			Attributes: datadogV2.IncidentCreateAttributes{
				Title:            "Example-Incident",
				CustomerImpacted: false,
				Fields: map[string]datadogV2.IncidentFieldAttributes{
					"state": datadogV2.IncidentFieldAttributes{
						IncidentFieldAttributesSingleValue: &datadogV2.IncidentFieldAttributesSingleValue{
							Type:  datadogV2.INCIDENTFIELDATTRIBUTESSINGLEVALUETYPE_DROPDOWN.Ptr(),
							Value: *datadog.NewNullableString(datadog.PtrString("resolved")),
						}},
				},
			},
			Relationships: &datadogV2.IncidentCreateRelationships{
				CommanderUser: *datadogV2.NewNullableNullableRelationshipToUser(&datadogV2.NullableRelationshipToUser{
					Data: *datadogV2.NewNullableNullableRelationshipToUserData(&datadogV2.NullableRelationshipToUserData{
						Type: datadogV2.USERSTYPE_USERS,
						Id:   UserDataID,
					}),
				}),
			},
		},
	}
	ctx := datadog.NewDefaultContext(context.Background())
	configuration := datadog.NewConfiguration()
	configuration.SetUnstableOperationEnabled("v2.CreateIncident", true)
	apiClient := datadog.NewAPIClient(configuration)
	api := datadogV2.NewIncidentsApi(apiClient)
	resp, r, err := api.CreateIncident(ctx, body)

	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `IncidentsApi.CreateIncident`: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}

	responseContent, _ := json.MarshalIndent(resp, "", "  ")
	fmt.Fprintf(os.Stdout, "Response from `IncidentsApi.CreateIncident`:\n%s\n", responseContent)
}
