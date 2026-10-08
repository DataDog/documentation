---
title: Create an incident
description: Create an incident.
breadcrumbs: Docs > API > Create an incident
---

> For the complete documentation index, see [llms.txt](https://docs.datadoghq.com/llms.txt).

# Create an incident

## v2 (latest)

{% alert level="warning" %}
**Note**: This endpoint is in public beta.
If you have any feedback, contact [Datadog support](https://docs.datadoghq.com/help/).
{% /alert %}

Create an incident.

| Datadog site      | API endpoint                                            |
| ----------------- | ------------------------------------------------------- |
| app.datadoghq.com | **POST** https://api.datadoghq.com/api/v2/incidents     |
| us3.datadoghq.com | **POST** https://api.us3.datadoghq.com/api/v2/incidents |
| us5.datadoghq.com | **POST** https://api.us5.datadoghq.com/api/v2/incidents |
| app.datadoghq.eu  | **POST** https://api.datadoghq.eu/api/v2/incidents      |
| ap1.datadoghq.com | **POST** https://api.ap1.datadoghq.com/api/v2/incidents |
| ap2.datadoghq.com | **POST** https://api.ap2.datadoghq.com/api/v2/incidents |
| app.ddog-gov.com  | **POST** https://api.ddog-gov.com/api/v2/incidents      |

This endpoint requires the `incident_write` permission.

OAuth apps require the `incident_write` authorization scope to access this endpoint.

### Request Body (required)

Incident payload.

{% tabs %}
{% tab label="Model" %}
| Parent field         | Field                          | Type      | Description                                                                                                                    |
| -------------------- | ------------------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------ |
|                      | data [*required*]              | object    | Incident data for a create request.                                                                                            |
| data                 | attributes [*required*]        | object    | The incident's attributes for a create request.                                                                                |
| attributes           | customer_impact_scope          | string    | Required if `customer_impacted:"true"`. A summary of the impact customers experienced during the incident.                     |
| attributes           | customer_impacted [*required*] | boolean   | A flag indicating whether the incident caused customer impact.                                                                 |
| attributes           | fields                         | object    | A condensed view of the user-defined fields for which to create initial selections.                                            |
| attributes           | incident_type_uuid             | string    | A unique identifier that represents an incident type. The default incident type will be used if this property is not provided. |
| attributes           | initial_cells                  | [<oneOf>] | An array of initial timeline cells to be placed at the beginning of the incident timeline.                                     |
| initial_cells        | <cell_type=markdown>           | object    | Timeline cell data for Markdown timeline cells for a create request.                                                           |
| <cell_type=markdown> | cell_type [*required*]         | enum      | Type of the Markdown timeline cell. Allowed values: `markdown`. Default: `markdown`.                                           |
| <cell_type=markdown> | content [*required*]           | object    | The Markdown timeline cell contents.                                                                                           |
| content              | content                        | string    | The Markdown content of the cell.                                                                                              |
| <cell_type=markdown> | important                      | boolean   | A flag indicating whether the timeline cell is important and should be highlighted. Default: `false`.                          |
| attributes           | is_test                        | boolean   | A flag indicating whether the incident is a test incident.                                                                     |
| attributes           | notification_handles           | [object]  | Notification handles that will be notified of the incident at creation.                                                        |
| notification_handles | display_name                   | string    | The name of the notified handle.                                                                                               |
| notification_handles | handle                         | string    | The handle used for the notification. This includes an email address, Slack channel, or workflow.                              |
| attributes           | title [*required*]             | string    | The title of the incident, which summarizes what happened.                                                                     |
| data                 | relationships                  | object    | The relationships the incident will have with other resources once created.                                                    |
| relationships        | commander_user [*required*]    | object    | Relationship to user.                                                                                                          |
| commander_user       | data [*required*]              | object    | Relationship to user object.                                                                                                   |
| data                 | id [*required*]                | string    | A unique identifier that represents the user.                                                                                  |
| data                 | type [*required*]              | enum      | Users resource type. Allowed values: `users`. Default: `users`.                                                                |
| data                 | type [*required*]              | enum      | Incident resource type. Allowed values: `incidents`. Default: `incidents`.                                                     |
{% /tab %}

{% tab label="Example" %}
```json
{
  "data": {
    "attributes": {
      "customer_impact_scope": "Example customer impact scope",
      "customer_impacted": false,
      "fields": {
        "severity": {
          "type": "dropdown",
          "value": "SEV-5"
        }
      },
      "incident_type_uuid": "00000000-0000-0000-0000-000000000000",
      "initial_cells": [
        {
          "cell_type": "markdown",
          "content": {
            "content": "An example timeline cell message."
          },
          "important": false
        }
      ],
      "is_test": false,
      "notification_handles": [
        {
          "display_name": "Jane Doe",
          "handle": "@user@email.com"
        },
        {
          "display_name": "Slack Channel",
          "handle": "@slack-channel"
        },
        {
          "display_name": "Incident Workflow",
          "handle": "@workflow-from-incident"
        }
      ],
      "title": "A test incident title"
    },
    "relationships": {
      "commander_user": {
        "data": {
          "id": "00000000-0000-0000-0000-000000000000",
          "type": "users"
        }
      }
    },
    "type": "incidents"
  }
}
```
{% /tab %}
{% /tabs %}

### Response

{% tabs %}
{% tab label="201" %}
CREATED

{% tabs %}
{% tab label="Model" %}
Response with an incident.

| Parent field                | Field                       | Type      | Description                                                                                                                                                        |
| --------------------------- | --------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|                             | data [*required*]           | object    | Incident data from a response.                                                                                                                                     |
| data                        | attributes                  | object    | The incident's attributes from a response.                                                                                                                         |
| attributes                  | archived                    | date-time | Timestamp of when the incident was archived. Read-only.                                                                                                            |
| attributes                  | case_id                     | int64     | The incident case id.                                                                                                                                              |
| attributes                  | created                     | date-time | Timestamp when the incident was created. Read-only.                                                                                                                |
| attributes                  | customer_impact_duration    | int64     | Length of the incident's customer impact in seconds.
  Equals the difference between `customer_impact_start` and `customer_impact_end`. Read-only.                 |
| attributes                  | customer_impact_end         | date-time | Timestamp when customers were no longer impacted by the incident.                                                                                                  |
| attributes                  | customer_impact_scope       | string    | A summary of the impact customers experienced during the incident.                                                                                                 |
| attributes                  | customer_impact_start       | date-time | Timestamp when customers began being impacted by the incident.                                                                                                     |
| attributes                  | customer_impacted           | boolean   | A flag indicating whether the incident caused customer impact.                                                                                                     |
| attributes                  | declared                    | date-time | Timestamp when the incident was declared. Read-only.                                                                                                               |
| attributes                  | declared_by                 | object    | Incident's non Datadog creator.                                                                                                                                    |
| declared_by                 | image_48_px                 | string    | Non Datadog creator `48px` image.                                                                                                                                  |
| declared_by                 | name                        | string    | Non Datadog creator name.                                                                                                                                          |
| attributes                  | declared_by_uuid            | string    | UUID of the user who declared the incident.                                                                                                                        |
| attributes                  | detected                    | date-time | Timestamp when the incident was detected.                                                                                                                          |
| attributes                  | fields                      | object    | A condensed view of the user-defined fields attached to incidents.                                                                                                 |
| attributes                  | incident_type_uuid          | string    | A unique identifier that represents an incident type.                                                                                                              |
| attributes                  | is_test                     | boolean   | A flag indicating whether the incident is a test incident.                                                                                                         |
| attributes                  | modified                    | date-time | Timestamp when the incident was last modified. Read-only.                                                                                                          |
| attributes                  | non_datadog_creator         | object    | Incident's non Datadog creator.                                                                                                                                    |
| non_datadog_creator         | image_48_px                 | string    | Non Datadog creator `48px` image.                                                                                                                                  |
| non_datadog_creator         | name                        | string    | Non Datadog creator name.                                                                                                                                          |
| attributes                  | notification_handles        | [object]  | Notification handles that will be notified of the incident during update.                                                                                          |
| notification_handles        | display_name                | string    | The name of the notified handle.                                                                                                                                   |
| notification_handles        | handle                      | string    | The handle used for the notification. This includes an email address, Slack channel, or workflow.                                                                  |
| attributes                  | public_id                   | int64     | The monotonically increasing integer ID for the incident.                                                                                                          |
| attributes                  | resolved                    | date-time | Timestamp when the incident's state was last changed from active or stable to resolved or completed.                                                               |
| attributes                  | severity                    | enum      | The incident severity. Allowed values: `UNKNOWN`, `SEV-0`, `SEV-1`, `SEV-2`, `SEV-3`, `SEV-4`, `SEV-5`.                                                            |
| attributes                  | state                       | string    | The state incident.                                                                                                                                                |
| attributes                  | time_to_detect              | int64     | The amount of time in seconds to detect the incident.
  Equals the difference between `customer_impact_start` and `detected`. Read-only.                           |
| attributes                  | time_to_internal_response   | int64     | The amount of time in seconds to call incident after detection. Equals the difference of `detected` and `created`. Read-only.                                      |
| attributes                  | time_to_repair              | int64     | The amount of time in seconds to resolve customer impact after detecting the issue. Equals the difference between `customer_impact_end` and `detected`. Read-only. |
| attributes                  | time_to_resolve             | int64     | The amount of time in seconds to resolve the incident after it was created. Equals the difference between `created` and `resolved`. Read-only.                     |
| attributes                  | title [*required*]          | string    | The title of the incident, which summarizes what happened.                                                                                                         |
| attributes                  | visibility                  | string    | The incident visibility status.                                                                                                                                    |
| data                        | id [*required*]             | string    | The incident's ID.                                                                                                                                                 |
| data                        | relationships               | object    | The incident's relationships from a response.                                                                                                                      |
| relationships               | attachments                 | object    | A relationship reference for attachments.                                                                                                                          |
| attachments                 | data [*required*]           | [object]  | An array of incident attachments.                                                                                                                                  |
| data                        | id [*required*]             | string    | A unique identifier that represents the attachment.                                                                                                                |
| data                        | type [*required*]           | enum      | The incident attachment resource type. Allowed values: `incident_attachments`. Default: `incident_attachments`.                                                    |
| relationships               | commander_user              | object    | Relationship to user.                                                                                                                                              |
| commander_user              | data [*required*]           | object    | Relationship to user object.                                                                                                                                       |
| data                        | id [*required*]             | string    | A unique identifier that represents the user.                                                                                                                      |
| data                        | type [*required*]           | enum      | Users resource type. Allowed values: `users`. Default: `users`.                                                                                                    |
| relationships               | created_by_user             | object    | Relationship to user.                                                                                                                                              |
| created_by_user             | data [*required*]           | object    | Relationship to user object.                                                                                                                                       |
| data                        | id [*required*]             | string    | A unique identifier that represents the user.                                                                                                                      |
| data                        | type [*required*]           | enum      | Users resource type. Allowed values: `users`. Default: `users`.                                                                                                    |
| relationships               | declared_by_user            | object    | Relationship to user.                                                                                                                                              |
| declared_by_user            | data [*required*]           | object    | Relationship to user object.                                                                                                                                       |
| data                        | id [*required*]             | string    | A unique identifier that represents the user.                                                                                                                      |
| data                        | type [*required*]           | enum      | Users resource type. Allowed values: `users`. Default: `users`.                                                                                                    |
| relationships               | impacts                     | object    | Relationship to impacts.                                                                                                                                           |
| impacts                     | data [*required*]           | [object]  | An array of incident impacts.                                                                                                                                      |
| data                        | id [*required*]             | string    | A unique identifier that represents the impact.                                                                                                                    |
| data                        | type [*required*]           | enum      | The incident impacts type. Allowed values: `incident_impacts`.                                                                                                     |
| relationships               | integrations                | object    | A relationship reference for multiple integration metadata objects.                                                                                                |
| integrations                | data [*required*]           | [object]  | Integration metadata relationship array                                                                                                                            |
| data                        | id [*required*]             | string    | A unique identifier that represents the integration metadata.                                                                                                      |
| data                        | type [*required*]           | enum      | Integration metadata resource type. Allowed values: `incident_integrations`. Default: `incident_integrations`.                                                     |
| relationships               | last_modified_by_user       | object    | Relationship to user.                                                                                                                                              |
| last_modified_by_user       | data [*required*]           | object    | Relationship to user object.                                                                                                                                       |
| data                        | id [*required*]             | string    | A unique identifier that represents the user.                                                                                                                      |
| data                        | type [*required*]           | enum      | Users resource type. Allowed values: `users`. Default: `users`.                                                                                                    |
| relationships               | responders                  | object    | Relationship to incident responders.                                                                                                                               |
| responders                  | data [*required*]           | [object]  | An array of incident responders.                                                                                                                                   |
| data                        | id [*required*]             | string    | A unique identifier that represents the responder.                                                                                                                 |
| data                        | type [*required*]           | enum      | The incident responders type. Allowed values: `incident_responders`.                                                                                               |
| relationships               | user_defined_fields         | object    | Relationship to incident user defined fields.                                                                                                                      |
| user_defined_fields         | data [*required*]           | [object]  | An array of user defined fields.                                                                                                                                   |
| data                        | id [*required*]             | string    | A unique identifier that represents the responder.                                                                                                                 |
| data                        | type [*required*]           | enum      | The incident user defined fields type. Allowed values: `user_defined_field`.                                                                                       |
| data                        | type [*required*]           | enum      | Incident resource type. Allowed values: `incidents`. Default: `incidents`.                                                                                         |
|                             | included                    | [<oneOf>] | Included related resources that the user requested. Read-only.                                                                                                     |
| included                    | <type=users>                | object    | User object returned by the API.                                                                                                                                   |
| <type=users>                | attributes                  | object    | Attributes of user object returned by the API.                                                                                                                     |
| attributes                  | email                       | string    | Email of the user.                                                                                                                                                 |
| attributes                  | handle                      | string    | Handle of the user.                                                                                                                                                |
| attributes                  | icon                        | string    | URL of the user's icon.                                                                                                                                            |
| attributes                  | name                        | string    | Name of the user.                                                                                                                                                  |
| attributes                  | uuid                        | string    | UUID of the user.                                                                                                                                                  |
| <type=users>                | id                          | string    | ID of the user.                                                                                                                                                    |
| <type=users>                | type                        | enum      | Users resource type. Allowed values: `users`. Default: `users`.                                                                                                    |
| included                    | <type=incident_attachments> | object    | Attachment data from a response.                                                                                                                                   |
| <type=incident_attachments> | attributes [*required*]     | object    | The attachment's attributes.                                                                                                                                       |
| attributes                  | attachment                  | object    | The attachment object.                                                                                                                                             |
| attachment                  | documentUrl                 | string    | The URL of the attachment.                                                                                                                                         |
| attachment                  | title                       | string    | The title of the attachment.                                                                                                                                       |
| attributes                  | attachment_type             | enum      | The type of the attachment. Allowed values: `postmortem`, `link`.                                                                                                  |
| attributes                  | modified                    | date-time | Timestamp when the attachment was last modified.                                                                                                                   |
| <type=incident_attachments> | id [*required*]             | string    | The unique identifier of the attachment.                                                                                                                           |
| <type=incident_attachments> | relationships [*required*]  | object    | The attachment's resource relationships.                                                                                                                           |
| relationships               | incident                    | object    | Relationship to incident.                                                                                                                                          |
| incident                    | data [*required*]           | object    | Relationship to incident object.                                                                                                                                   |
| data                        | id [*required*]             | string    | A unique identifier that represents the incident.                                                                                                                  |
| data                        | type [*required*]           | enum      | Incident resource type. Allowed values: `incidents`. Default: `incidents`.                                                                                         |
| relationships               | last_modified_by_user       | object    | Relationship to user.                                                                                                                                              |
| last_modified_by_user       | data [*required*]           | object    | Relationship to user object.                                                                                                                                       |
| data                        | id [*required*]             | string    | A unique identifier that represents the user.                                                                                                                      |
| data                        | type [*required*]           | enum      | Users resource type. Allowed values: `users`. Default: `users`.                                                                                                    |
| <type=incident_attachments> | type [*required*]           | enum      | The incident attachment resource type. Allowed values: `incident_attachments`. Default: `incident_attachments`.                                                    |
{% /tab %}

{% tab label="Example" %}
```json
{
  "data": {
    "attributes": {
      "customer_impact_scope": "An example customer impact scope",
      "customer_impacted": false,
      "fields": {
        "severity": {
          "type": "dropdown",
          "value": "SEV-5"
        }
      },
      "incident_type_uuid": "00000000-0000-0000-0000-000000000000",
      "is_test": false,
      "notification_handles": [
        {
          "display_name": "Jane Doe",
          "handle": "@user@email.com"
        },
        {
          "display_name": "Slack Channel",
          "handle": "@slack-channel"
        },
        {
          "display_name": "Incident Workflow",
          "handle": "@workflow-from-incident"
        }
      ],
      "public_id": 1,
      "severity": "UNKNOWN",
      "title": "A test incident title"
    },
    "id": "00000000-0000-0000-1234-000000000000",
    "relationships": {
      "attachments": {
        "data": [
          {
            "id": "00000000-0000-abcd-1000-000000000000",
            "type": "incident_attachments"
          }
        ]
      },
      "commander_user": {
        "data": {
          "id": "00000000-0000-0000-0000-000000000000",
          "type": "users"
        }
      },
      "created_by_user": {
        "data": {
          "id": "00000000-0000-0000-2345-000000000000"
        }
      },
      "impacts": {
        "data": [
          {
            "id": "00000000-0000-0000-2345-000000000000",
            "type": "incident_impacts"
          }
        ]
      },
      "integrations": {
        "data": [
          {
            "id": "00000000-abcd-0005-0000-000000000000",
            "type": "incident_integrations"
          },
          {
            "id": "00000000-abcd-0006-0000-000000000000",
            "type": "incident_integrations"
          }
        ]
      },
      "responders": {
        "data": [
          {
            "id": "00000000-0000-0000-2345-000000000000",
            "type": "incident_responders"
          }
        ]
      },
      "user_defined_fields": {
        "data": [
          {
            "id": "00000000-0000-0000-2345-000000000000",
            "type": "user_defined_field"
          }
        ]
      }
    },
    "type": "incidents"
  }
}
```
{% /tab %}
{% /tabs %}
{% /tab %}

{% tab label="400" %}
Bad Request

{% tabs %}
{% tab label="Model" %}
API error response.

| Parent field | Field               | Type     | Description       |
| ------------ | ------------------- | -------- | ----------------- |
|              | errors [*required*] | [string] | A list of errors. |
{% /tab %}

{% tab label="Example" %}
```json
{
  "errors": [
    "Bad Request"
  ]
}
```
{% /tab %}
{% /tabs %}
{% /tab %}

{% tab label="401" %}
Unauthorized

{% tabs %}
{% tab label="Model" %}
API error response.

| Parent field | Field               | Type     | Description       |
| ------------ | ------------------- | -------- | ----------------- |
|              | errors [*required*] | [string] | A list of errors. |
{% /tab %}

{% tab label="Example" %}
```json
{
  "errors": [
    "Bad Request"
  ]
}
```
{% /tab %}
{% /tabs %}
{% /tab %}

{% tab label="403" %}
Forbidden

{% tabs %}
{% tab label="Model" %}
API error response.

| Parent field | Field               | Type     | Description       |
| ------------ | ------------------- | -------- | ----------------- |
|              | errors [*required*] | [string] | A list of errors. |
{% /tab %}

{% tab label="Example" %}
```json
{
  "errors": [
    "Bad Request"
  ]
}
```
{% /tab %}
{% /tabs %}
{% /tab %}

{% tab label="404" %}
Not Found

{% tabs %}
{% tab label="Model" %}
API error response.

| Parent field | Field               | Type     | Description       |
| ------------ | ------------------- | -------- | ----------------- |
|              | errors [*required*] | [string] | A list of errors. |
{% /tab %}

{% tab label="Example" %}
```json
{
  "errors": [
    "Bad Request"
  ]
}
```
{% /tab %}
{% /tabs %}
{% /tab %}

{% tab label="429" %}
Too many requests

{% tabs %}
{% tab label="Model" %}
API error response.

| Parent field | Field               | Type     | Description       |
| ------------ | ------------------- | -------- | ----------------- |
|              | errors [*required*] | [string] | A list of errors. |
{% /tab %}

{% tab label="Example" %}
```json
{
  "errors": [
    "Bad Request"
  ]
}
```
{% /tab %}
{% /tabs %}
{% /tab %}
{% /tabs %}

### Code Example

{% tabs %}
{% tab label="Curl" %}
```bash
# Set your Datadog site and credentials
export DD_SITE="datadoghq.com"
# Use a Personal Access Token or Service Access Token
export DD_BEARER_TOKEN="<PERSONAL_ACCESS_TOKEN OR SERVICE_ACCESS_TOKEN>"

curl -X POST "https://api.datadoghq.com/api/v2/incidents" \
-H "Authorization: Bearer ${DD_BEARER_TOKEN}" \
-H "Content-Type: application/json" \
-H "Accept: application/json" \
-d @- << EOF
{
  "data": {
    "attributes": {
      "customer_impact_scope": "Example customer impact scope",
      "customer_impacted": false,
      "fields": {
        "severity": {
          "type": "dropdown",
          "value": "SEV-5"
        }
      },
      "incident_type_uuid": "00000000-0000-0000-0000-000000000000",
      "initial_cells": [
        {
          "cell_type": "markdown",
          "content": {
            "content": "An example timeline cell message."
          },
          "important": false
        }
      ],
      "is_test": false,
      "notification_handles": [
        {
          "display_name": "Jane Doe",
          "handle": "@user@email.com"
        },
        {
          "display_name": "Slack Channel",
          "handle": "@slack-channel"
        },
        {
          "display_name": "Incident Workflow",
          "handle": "@workflow-from-incident"
        }
      ],
      "title": "A test incident title"
    },
    "relationships": {
      "commander_user": {
        "data": {
          "id": "00000000-0000-0000-0000-000000000000",
          "type": "users"
        }
      }
    },
    "type": "incidents"
  }
}
EOF
```
{% /tab %}

{% tab label="Go" %}
```go
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
```

**Instructions**

First [install the library and its dependencies](/api/latest/?code-lang=go) and then save the example to `main.go` and run following commands:

```bash
DD_SITE="datadoghq.com" DD_BEARER_TOKEN="<PERSONAL_ACCESS_TOKEN OR SERVICE_ACCESS_TOKEN>" go run "main.go"
```
{% /tab %}

{% tab label="Python" %}
```python
# NOTE: Frozen test fixture from tests/fixtures/api/examples/, not live SDK output.
"""
Create an incident returns "CREATED" response
"""

from os import environ
from datadog_api_client import ApiClient, Configuration
from datadog_api_client.v2.api.incidents_api import IncidentsApi
from datadog_api_client.v2.model.incident_create_attributes import IncidentCreateAttributes
from datadog_api_client.v2.model.incident_create_data import IncidentCreateData
from datadog_api_client.v2.model.incident_create_relationships import IncidentCreateRelationships
from datadog_api_client.v2.model.incident_create_request import IncidentCreateRequest
from datadog_api_client.v2.model.incident_field_attributes_single_value import IncidentFieldAttributesSingleValue
from datadog_api_client.v2.model.incident_field_attributes_single_value_type import (
    IncidentFieldAttributesSingleValueType,
)
from datadog_api_client.v2.model.incident_type import IncidentType
from datadog_api_client.v2.model.nullable_relationship_to_user import NullableRelationshipToUser
from datadog_api_client.v2.model.nullable_relationship_to_user_data import NullableRelationshipToUserData
from datadog_api_client.v2.model.users_type import UsersType

# there is a valid "user" in the system
USER_DATA_ID = environ["USER_DATA_ID"]

body = IncidentCreateRequest(
    data=IncidentCreateData(
        type=IncidentType.INCIDENTS,
        attributes=IncidentCreateAttributes(
            title="Example-Incident",
            customer_impacted=False,
            fields=dict(
                state=IncidentFieldAttributesSingleValue(
                    type=IncidentFieldAttributesSingleValueType.DROPDOWN,
                    value="resolved",
                ),
            ),
        ),
        relationships=IncidentCreateRelationships(
            commander_user=NullableRelationshipToUser(
                data=NullableRelationshipToUserData(
                    type=UsersType.USERS,
                    id=USER_DATA_ID,
                ),
            ),
        ),
    ),
)

configuration = Configuration()
configuration.unstable_operations["create_incident"] = True
with ApiClient(configuration) as api_client:
    api_instance = IncidentsApi(api_client)
    response = api_instance.create_incident(body=body)

    print(response)
```

**Instructions**

First [install the library and its dependencies](/api/latest/?code-lang=python) and then save the example to `example.py` and run following commands:

```bash
DD_SITE="datadoghq.com" DD_BEARER_TOKEN="<PERSONAL_ACCESS_TOKEN OR SERVICE_ACCESS_TOKEN>" python3 "example.py"
```
{% /tab %}
{% /tabs %}
