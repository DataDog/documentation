---
title: Datadog Logs Destination
disable_toc: false
products:
- name: Logs
  icon: logs
---

{{< product-availability >}}

Use Observability Pipelines' Datadog Logs destination to send logs to Datadog Log Management. You can also use [AWS PrivateLink](#aws-privatelink) to send logs from Observability Pipelines to Datadog.

## Setup

Set up the Datadog Logs destination and its environment variables when you [set up a pipeline][1]. The information below is configured in the pipelines UI.

### Set up the destination

There are no required setup steps.

#### Optional settings

##### Route logs to multiple Datadog organizations

You can route logs to multiple Datadog organizations. After you set up routing to multiple organizations, you can [view metrics for the component or specific organizations](#view-metrics-for-the-component-or-specific-organizations) to which you are routing logs.

{{< img src="observability_pipelines/destinations/multi_dd_orgs.png" alt="The Datadog Logs destination showing us1 and us3 org" style="width:45%;" >}}

Click **Route to Multiple Organizations** to set up routing to multiple Datadog organizations.

- If you haven't added any organizations yet, enter organization details as described in the [Add a Datadog organization](#add-an-organization) section.
- If you have already added organizations, you can:
  - Click on an organization in the table to edit or delete it.
  - Use the search bar to find a specific organization by name, filter query, or Datadog site, and then select the organization to edit or delete it.
  - [View metrics](#view-metrics-for-the-component-or-specific-organizations) for an organization.

**Note**: If you don't set up routing to multiple Datadog organizations, logs are routed to the default Datadog organization, which is the organization that is tied to the API key when you install the Worker.

##### Add an organization

<div class="alert alert-warning">Logs that do not match any of the organizations' filters are dropped. The <a href="#component-level-metrics">component metric</a> <code>Data dropped (intentional)</code> shows the number logs that do not match the filters and are dropped.</div>

1. Enter a name for the organization.
	- **Note**: The name does not have to correspond to the actual name of the Datadog organization.
1. Define a filter query. Only logs that match the specified filter query are sent to the organization. See [Observability Pipelines Search Syntax][3] for more information on writing filter queries.
1. Select the Datadog organization's site.
1. Enter the identifier for the API key for that Datadog organization.
	- **Note**: Only enter the identifier for the API key. Do **not** enter the actual API key.
1. Click **Save**.

##### Buffering options

Toggle the switch to enable **Buffering Options**.<br>**Note**: Buffering options is in Preview. Contact your account manager to request access.
- If left disabled, the maximum size for buffering is 500 events.
- If enabled:
	1. Select the buffer type you want to set (**Memory** or **Disk**).
	1. Enter the buffer size and select the unit.

### Set secrets

**Note**: If you entered identifiers for yours secrets and then choose to use environment variables, the environment variable is the identifier entered prepended with `DD_OP`. For example, if you entered `PASSWORD_1` for the a password identifier, the environment variable for the password is `DD_OP_PASSWORD_1`.

{{< tabs >}}
{{% tab "Secrets Management" %}}

There are no secret identifiers for this destination.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog %}}

{{% /tab %}}
{{< /tabs >}}

## View metrics for the component or specific organizations

You can view metrics at the component level or organization level.

### Component-level metrics

To view metrics for the overall Datadog Logs destination:

1. Navigate to [Observability Pipelines][1].
1. Select your pipeline.
1. Click the cog on the **Datadog Logs** destination and select **View details**.

**Note**: The **Data dropped (intentional)** metric shows logs that didn't match any of the organizations' filters.

### Organization-level metrics

To view metrics for a specific Datadog organization:

1. Navigate to [Observability Pipelines][1].
1. Select your pipeline.
1. Click the **Datadog Logs** destination so the organizations show up.
  {{< img src="observability_pipelines/destinations/multi_dd_orgs_highlighted.png" alt="The Datadog Logs destination showing us1 and us3 org highlighted" style="width:45%;" >}}
1. Click the organization you want to see metrics for.
1. Click **View Health Metrics**.

Alternatively, you can click on **Review Configured Organizations** in the Datadog Logs destination, and click the graph icon in the **Metrics** column for the organization you are interested in.

## How the destination works

### Event batching

A batch of events is flushed when one of these parameters is met. See [event batching][2] for more information.

| Max Events     | Max Bytes       | Timeout (seconds)   |
|----------------|-----------------|---------------------|
| 1,000          | 4,250,000       | 5                   |

{{< site-region region="us,ap1,ap2" >}}

## AWS PrivateLink

To send logs from Observability Pipelines to Datadog using AWS PrivateLink, see [Connect to Datadog over AWS PrivateLink][1] for setup instructions. The two endpoints you need to set up are:

- Logs (User HTTP intake): {{< region-param key=http_endpoint_private_link code="true" >}}
- Remote Configuration: {{< region-param key=remote_config_endpoint_private_link code="true" >}}

**Note**: The `obpipeline-intake.datadoghq.com` endpoint is used for Live Capture and is not available as a PrivateLink endpoint.

[1]: /agent/guide/private-link/?tab=crossregionprivatelinkendpoints

{{< /site-region >}}
{{< site-region region="us3" >}}

## Azure Private Link

To send logs from Observability Pipelines to Datadog using Azure Private Link, see [Connect to Datadog over Azure Private Link][1] for setup instructions. The two endpoints you need to set up are:

- Logs (User HTTP intake): `http-intake.logs.us3.datadoghq.com`
- Remote Configuration: `config.us3.datadoghq.com`

**Note**: The `obpipeline-intake.datadoghq.com` endpoint is used for Live Capture and is not available as a Private Link endpoint.

[1]: /agent/guide/azure-private-link/?site=us3

{{< /site-region >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/destinations/#event-batching
[3]: /observability_pipelines/search_syntax/logs/