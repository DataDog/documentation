---
title: Cross-Organization Visibility
kind: documentation
private: true
is_beta: true
---

{{< callout url="#" header="false" btn_hidden="true">}}
  Cross-organization visibility is in <strong>private beta</strong> for customers with Enterprise plans. If you're interested in the feature, reach out to your Technical Account Manager or Customer Success Manager.
{{< /callout >}} 


## Overview

Some companies rely on multiple Datadog [organizations][1]  to isolate data for compliance or other reasons.

Cross-organization visibility allows customers to share data between different organizations in the same account, and show insights from multiple organizations in one place.

This document explains: 
- What cross-organization visibility [enables](#capabilities) 
- How to [expose](#create-a-connection) data across organizations
- How to create a [Dashboard and Notebook widget](#create-a-widget-with-cross-organization-data) with data from other organizations

## Capabilities

### Organization connection

A _source_ organization exposes data to a _destination_ organization through an _organization connection_. The source and destination Datadog organizations must be in the same [account][1]. A source organization can have multiple destinations, and a destination organization can have multiple sources.

After you set up an organization connection, the exposed data still lives in the source organization and does not move to the destination. Instead, the destination organization queries the data from the source. Connections do not duplicate the data, and do not incur extra charges. The destination organization can query source data from any time range supported by the source data, including prior to the date of the creation of the connection. If you remove the connection, the destination can no longer access any data from the source.

### Scope

Cross-organization visibility supports Metrics telemetry in private [Dashboard and Notebook widgets][2].

All types of metrics are supported, including [custom metrics][3], [trace metrics][4], and [metrics generated from logs][5].

## Configure connections

Configure connections through the public API `/api/v2/org_connections` endpoint. The application key you use to authenticate to the endpoint must have the [`org_management`][6] permission.

### List connections

List all the connections this organization participates in, either as a source organization or as a destination organization.

<span style="padding:3px" class="font-semibold text-api-get bg-bg-api-get">GET</span>
https://{datadog_site}/api/v2/org_connections?api_key={datadog_api_key}&application_key={datadog_application_key}

### Create a connection

Creates a connection from this organization to the destination organization. You must perform this operation in the to-be-source organization.

<span style="padding:3px" class="font-semibold text-api-post bg-bg-api-post">POST</span> https://{datadog_site}/api/v2/org_connections?api_key={datadog_api_key}&application_key={datadog_application_key}

**Note:** The payload of this call requires the destination organization UUID. Get the destination organization's UUID from the "List your managed organizations" [endpoint][7].

#### Header

Content-Type: application/json

#### Payload

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

#### Failure scenarios

- The connection already exists
- The connection refers to a destination organization ID outside of the account

### Delete a connection

Deletes a connection. Perform this operation either from the source organization or the destination organization. Reference the connection to delete with its ID, which you can get from the [List connections](#list-connections) request.

<span style="padding:3px" class="font-semibold text-api-delete bg-bg-api-delete">DELETE</span> https://{datadog_site}/api/v2/org_connections/{connection_id}?api_key={datadog_api_key}&application_key={datadog_application_key}

#### Failure scenarios

- The organization does not participate as a source or a destination to the connection
- The connection does not exist

## Create a widget with cross-organization data

Cross-organization [Dashboard and Notebook widgets][2] are available for Datadog organizations that exist as a _destination_ organization for at least one [connection](#configure-connections).

Each query in a widget can display data from a single organization. You can combine queries into a cross-organization formula query.

### In the UI

Dashboard and Notebook widgets allow you to create cross-organization queries when the following conditions are met:

- You have cross-organization visibility enabled in your organization
- At least one connection exists where the current organization is the destination

If the previous conditions are true, an organization drop-down selector appears between the drop-down menus for data type and metric name. Use the organization drop-down selector to chose a source organization for your query.

The following screenshot shows an example of a cross-organization formula query. The widget graphs the number of ingested events per service. To get the total number of events, the cross-organization formula query sums the data from organization A (in the query **a**) and organization B (in the query **b**).

{{< img src="account_management/org_settings/cross_org_visibility/cross_org_query.png" alt="Screenshot showing configuration of a Dashboard widget with a cross-organization query" >}}

### In the API

<div class="alert alert-info">
The <a href="https://registry.terraform.io/providers/DataDog/datadog/latest/docs">Datadog Terraform Provider</a> does not support cross-organization queries.
</div>

You can define cross-organization queries in the following endpoint:
- [Timeseries][8]

When you define a widget in the Dashboard API, use the `cross_org_uuids` parameter in the JSON widget definition payload to identify the source organization in a cross-organization query.

The `cross_org_uuids` parameter is optional. If you omit `cross_org_uuids`, the query runs on the same organization in which you defined the widget.

### Example JSON widget definition

{{< highlight json "hl_lines=21 27" >}}
{
    "viz": "timeseries",
    "requests": [
        {
            "style": {
                "palette": "dog_classic",
                "type": "solid",
                "width": "normal"
            },
            "type": "line",
            "formulas": [
                {
                    "formula": "query2 + query1"
                }
            ],
            "queries": [
                {
                    "name": "query2",
                    "data_source": "metrics",
                    "query": "sum:datadog.estimated_usage.events.ingested_events{env:prod} by {service}.as_count()",
                    "cross_org_uuids": ["6434abde-xxxx-yyyy-zzzz-da7ad0900001"]
                },
                {
                    "name": "query1",
                    "data_source": "metrics",
                    "query": "sum:datadog.estimated_usage.events.ingested_events{env:prod} by {service}.as_count()",
                    "cross_org_uuids": ["74edde28-xxxx-yyyy-zzzz-da7ad0900001"]
                }
            ],
            "response_format": "timeseries"
        }
    ]
}
{{< /highlight >}}

Note the `cross_org_uuids` parameter in the JSON widget definition payload. 
- This parameter is optional. If omitted, the query runs on the organization on which the widget is defined.
- Use the organization identifier, which you can recover from the [Organizations endpoint][7], to identify the organization on which the query runs.
- Though this parameter accepts an array, the array must contain only one element. Adding multiple elements to the `cross_org_uuids` array results in a 400 error.

[1]: /account_management/multi_organization/
[2]: /dashboards/widgets
[3]: /metrics/custom_metrics/#overview
[4]: /tracing/metrics/metrics_namespace/
[5]: /logs/log_configuration/logs_to_metrics/
[6]: /account_management/rbac/permissions/#access-management
[7]: /api/latest/organizations/#list-your-managed-organizations
[8]: /api/latest/metrics/#query-timeseries-data-across-multiple-products
