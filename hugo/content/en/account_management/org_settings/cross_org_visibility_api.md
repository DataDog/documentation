---
title: Cross-Organization Connections API
description: Configure cross-organization data sharing connections using the API to enable insights across multiple organizations in your account.
---

{{< callout url="#" btn_hidden="true">}}
  Cross-organization visibility is in beta.
{{< /callout >}}

[Cross-organization visibility][1] allows customers to share data between different organizations in the same account, and show insights from multiple organizations in one place.

This document describes how to configure cross-organization connections through the API. To configure connections through the UI, see [cross-organization visibility][1].

## API endpoint

Configure connections through the public API `/api/v2/org_connections` endpoint. The application key you use to authenticate to the endpoint must have the [`org_connections_write`][2] and [`org_connections_read`][2] permissions.

## List connections

List all the connections this organization participates in, either as a source organization or as a destination organization. Listing connections requires the _Org Connections Read_ permission.

<span style="padding:3px" class="font-semibold text-api-get bg-bg-api-get">GET</span>
https://{datadog_site}/api/v2/org_connections

### Example
{{< code-block lang="json" collapsible="true" >}}
curl -X get "https://{datadog_site}/api/v2/org_connections/" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
  -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
{{< /code-block >}}

## Create a connection

Creates a connection from this organization to the destination organization. You must perform this operation in the to-be-source organization. Creating connections requires the _Org Connections Write_ permission.

<span style="padding:3px" class="font-semibold text-api-post bg-bg-api-post">POST</span> https://{datadog_site}/api/v2/org_connections

**Note:** The payload of this call requires the destination organization UUID. Get the destination organization's UUID from the "List your managed organizations" [endpoint][3].

### Example
{{< code-block lang="json" collapsible="true" >}}
curl -X POST "https://{datadog_site}/api/v2/org_connections" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
  -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
   -d '{
        "data": {
          "type": "org_connection",
          "relationships": {
              "sink_org": {
                  "data": {
                      "type": "orgs",
                      "id": "{{the destination organization UUID}}"
                  }
              }
          }
      }
  }'
{{< /code-block >}}

### Failure scenarios

- The connection already exists
- The connection refers to a destination organization ID outside of the account

## Update a connection

Updates the connection type of an existing connection. You must perform this operation from the source organization. Updating connections requires the _Org Connections Write_ permission.

<span style="padding:3px" class="font-semibold text-api-delete bg-bg-api-delete">PATCH</span> https://{datadog_site}/api/v2/org_connections/{connection_id}

**Note:** The payload of this call requires the connection UUID. Get the connection UUID from the "List your managed organizations" [endpoint][3].

### Example
{{< code-block lang="json" collapsible="true" >}}
curl -X PATCH "https://{datadog_site}/api/v2/org_connections" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
  -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
   -d '{
        "data": {
          "type": "org_connection",
          "id": "{{the connection UUID}}",
          "attributes": {
              "connection_types": [
                  "logs",
                  "metrics"
              ]
        }
      },
  }'
{{< /code-block >}}

### Failure scenarios

- The organization does not participate as a source to the connection
- The connection does not exist

## Delete a connection

Deletes a connection. Perform this operation either from the source organization or the destination organization. Reference the connection to delete with its ID, which you can get from the [List connections](#list-connections) request. Deleting connections requires the _Org Connections Write_ permission.

<span style="padding:3px" class="font-semibold text-api-delete bg-bg-api-delete">DELETE</span> https://{datadog_site}/api/v2/org_connections/{connection_id}

### Example
{{< code-block lang="json" collapsible="true" >}}
curl -X DELETE "https://{datadog_site}/api/v2/org_connections/{connection_id}" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: <YOUR_DATADOG_API_KEY>" \
  -H "DD-APPLICATION-KEY: <YOUR_DATADOG_APPLICATION_KEY>" \
{{< /code-block >}}



### Failure scenarios

- The organization does not participate as a source or a destination to the connection
- The connection does not exist

[1]: /account_management/org_settings/cross_org_visibility
[2]: /account_management/rbac/permissions/#access-management
[3]: /api/latest/organizations/#list-your-managed-organizations
