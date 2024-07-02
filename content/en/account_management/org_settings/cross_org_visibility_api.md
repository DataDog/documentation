---
title: Cross-Organization Connections API
kind: documentation
is_beta: true
---

{{< callout url="#" header="false" btn_hidden="true">}}
  Note: Cross-organization visibility is in <strong>public beta</strong>. If you have any feedback, contact [Datadog support](https://docs.datadoghq.com/help/).
{{< /callout >}} 

[Cross-organization visibility][1] allows customers to share data between different organizations in the same account, and show insights from multiple organizations in one place.

This document describes how to configure cross-organization connections through the API. To configure connections through the UI, see [cross-organization visibility][1].

## API endpoint

Configure connections through the public API `/api/v2/org_connections` endpoint. The application key you use to authenticate to the endpoint must have the [`org_management`][2] permission.

## List connections

List all the connections this organization participates in, either as a source organization or as a destination organization. Listing connections requires the _Org Connections Read_ permission.

<span style="padding:3px" class="font-semibold text-api-get bg-bg-api-get">GET</span>
https://{datadog_site}/api/v2/org_connections?api_key={datadog_api_key}&application_key={datadog_application_key}

## Create a connection

Creates a connection from this organization to the destination organization. You must perform this operation in the to-be-source organization. Creating connections requires the _Org Connections Write_ permission.

<span style="padding:3px" class="font-semibold text-api-post bg-bg-api-post">POST</span> https://{datadog_site}/api/v2/org_connections?api_key={datadog_api_key}&application_key={datadog_application_key}

**Note:** The payload of this call requires the destination organization UUID. Get the destination organization's UUID from the "List your managed organizations" [endpoint][3].

### Header

Content-Type: application/json

### Payload

{{< code-block lang="json" collapsible="true" >}}
{
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
}
{{< /code-block >}}

### Failure scenarios

- The connection already exists
- The connection refers to a destination organization ID outside of the account

## Delete a connection

Deletes a connection. Perform this operation either from the source organization or the destination organization. Reference the connection to delete with its ID, which you can get from the [List connections](#list-connections) request. Deleting connections requires the _Org Connections Write_ permission.

<span style="padding:3px" class="font-semibold text-api-delete bg-bg-api-delete">DELETE</span> https://{datadog_site}/api/v2/org_connections/{connection_id}?api_key={datadog_api_key}&application_key={datadog_application_key}

### Failure scenarios

- The organization does not participate as a source or a destination to the connection
- The connection does not exist

[1]: /account_management/org_settings/cross_org_visibility
[2]: /account_management/rbac/permissions/#access-management
[3]: /api/latest/organizations/#list-your-managed-organizations
